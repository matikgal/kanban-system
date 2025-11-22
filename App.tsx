
import React, { useState, useEffect } from 'react';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { AbstractIcon } from './components/AbstractIcons';
import { BoardData, Task, Theme } from './types';
import { getBoardData, saveBoardData, getTheme, saveTheme } from './services/storageService';

const App: React.FC = () => {
  // State
  const [boardData, setBoardData] = useState<BoardData>({ columns: [], tasks: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string>('todo');
  const [theme, setTheme] = useState<Theme>('void');
  
  // UX State
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);

  // Load data
  useEffect(() => {
    setBoardData(getBoardData());
    setTheme(getTheme());
  }, []);

  // Save data
  useEffect(() => {
    if (boardData.columns.length > 0) {
        saveBoardData(boardData);
    }
  }, [boardData]);

  // Save theme
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'void' ? 'paper' : 'void');
  };

  const toggleColumnCollapse = (e: React.MouseEvent, colId: string) => {
      e.stopPropagation();
      if (collapsedColumns.includes(colId)) {
          setCollapsedColumns(collapsedColumns.filter(id => id !== colId));
      } else {
          setCollapsedColumns([...collapsedColumns, colId]);
      }
  };

  // --- Drag and Drop Logic ---
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    if (!taskId) return;

    setBoardData((prev) => {
      const updatedTasks = prev.tasks.map((t) => {
          if (t.id === taskId) {
              // Add history
              const newHistory = [...(t.history || [])];
              newHistory.push({
                  id: `h-${Date.now()}`,
                  action: `PRZENIESIONO DO: ${targetColumnId.toUpperCase()}`,
                  timestamp: Date.now()
              });
              return { ...t, columnId: targetColumnId, history: newHistory };
          }
          return t;
      });
      return { ...prev, tasks: updatedTasks };
    });
  };

  // --- Task Management ---
  const openNewTaskModal = (e: React.MouseEvent | null, columnId: string) => {
    if (e) e.stopPropagation();
    setEditingTask(null);
    setActiveColumnId(columnId);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    setBoardData((prev) => {
      const exists = prev.tasks.find(t => t.id === task.id);
      let newTasks;
      if (exists) {
        newTasks = prev.tasks.map(t => t.id === task.id ? task : t);
      } else {
        newTasks = [...prev.tasks, task];
      }
      return { ...prev, tasks: newTasks };
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setBoardData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }));
    setIsModalOpen(false);
  };

  // --- Helpers ---
  const getTasksForColumn = (columnId: string) => {
    return boardData.tasks
      .filter(t => t.columnId === columnId)
      .filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
  };

  // Theme Config: Off-Colors
  const isPaper = theme === 'paper';
  // Dark: #121212 (Void) -> Changed to #161618 (Anthracite)
  // Light: #FFFFFF (Paper) -> Changed to #E0E2E5 (Concrete)
  const appBg = isPaper ? 'bg-[#E0E2E5]' : 'bg-[#161618]';
  const textMain = isPaper ? 'text-zinc-800' : 'text-[#E4E4E7]';
  const borderMain = isPaper ? 'border-zinc-300' : 'border-[#27272A]';
  const placeholderColor = isPaper ? 'placeholder-zinc-400' : 'placeholder-zinc-700';
  
  // Specific divider colors based on feedback
  // Dark: divide-zinc-800 to be subtle but visible (not white)
  // Light: divide-zinc-400 to be more visible than before
  const divideColor = isPaper ? 'divide-zinc-400' : 'divide-zinc-800';

  // Grid Calculation
  // Calculate grid template based on collapsed state.
  // Expanded = 1fr, Collapsed = 48px
  const gridTemplate = boardData.columns.map(col => 
      collapsedColumns.includes(col.id) ? '48px' : '1fr'
  ).join(' ');

  return (
    <div className={`h-[100dvh] w-full flex flex-col overflow-hidden transition-colors duration-300 ${appBg} ${textMain}`}>
      
      {/* --- Header --- */}
      <header className={`relative flex-none h-14 px-4 flex items-center justify-between border-b ${borderMain}`}>
        <div className="flex items-center gap-3 select-none group">
            <div className={`w-9 h-9 flex items-center justify-center border ${borderMain} group-hover:bg-zinc-500/10 transition-colors`}>
                 <AbstractIcon variant="logo" size={18} />
            </div>
            <div className="flex flex-col justify-center h-9">
                <div className="font-display font-black text-lg leading-none tracking-tighter uppercase">
                    Flux<span className="opacity-40 font-normal">Board</span>
                </div>
                <div className="font-mono text-[8px] leading-none tracking-[0.25em] opacity-40 uppercase mt-1.5">
                    KANBAN_SYSTEM
                </div>
            </div>
        </div>

        {/* Center Demo Badge - Absolute centering to preserve layout balance */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 pointer-events-none select-none z-20">
            <div className={`w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]`} />
            <div className={`flex items-center justify-center font-mono text-[10px] font-bold tracking-[0.3em] uppercase border pl-3 pr-2 py-1.5 rounded ${isPaper ? 'bg-zinc-100 border-zinc-300 text-zinc-900' : 'bg-[#000] border-zinc-700 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}>
                DEMO
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
                <input
                    type="text"
                    placeholder="SZUKAJ W BAZIE..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`
                        bg-transparent border-b ${borderMain} text-xs font-mono py-1 w-48 focus:outline-none uppercase
                        ${placeholderColor}
                    `}
                />
            </div>

             <button 
                onClick={toggleTheme}
                className="hover:opacity-50 transition-opacity"
             >
                <AbstractIcon variant={isPaper ? 'sun' : 'moon'} size={18} />
             </button>
        </div>
      </header>

      {/* --- Mobile Search --- */}
      <div className={`md:hidden flex-none border-b ${borderMain} p-2`}>
            <input
                type="text"
                placeholder="SZUKAJ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent text-xs font-mono py-2 px-2 focus:outline-none uppercase ${placeholderColor}`}
            />
      </div>

      {/* --- Main Board Area --- */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        
        {/* DESKTOP VIEW: Dynamic Grid */}
        <div 
            className={`hidden md:grid h-full divide-x ${divideColor}`} 
            style={{ 
                gridTemplateColumns: gridTemplate
            }}
        >
             {boardData.columns.map((col) => {
                 const isCollapsed = collapsedColumns.includes(col.id);
                 const tasks = getTasksForColumn(col.id);
                 
                 if (isCollapsed) {
                     return (
                         <div key={col.id} className="h-full flex flex-col items-center py-4 hover:bg-zinc-500/5 cursor-pointer transition-colors" onClick={(e) => toggleColumnCollapse(e, col.id)}>
                             <div className="flex-none mb-4">
                                <AbstractIcon variant="eye_off" size={16} className="opacity-50" />
                             </div>
                             <div className="flex-1 flex items-center justify-center w-full">
                                 <span className="transform -rotate-90 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-widest opacity-60">
                                     {col.title}
                                 </span>
                             </div>
                             <div className="flex-none mt-4 text-[9px] font-mono opacity-50">
                                 {tasks.length}
                             </div>
                         </div>
                     )
                 }

                 return (
                     <div 
                        key={col.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, col.id)}
                        className="h-full flex flex-col relative min-w-0"
                     >
                        {/* Column Header */}
                        <div className={`flex-none p-4 border-b ${borderMain} flex justify-between items-center group`}>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">{col.title}</span>
                                <span className="text-[9px] font-mono opacity-40 bg-zinc-500/10 px-1.5 py-0.5">{tasks.length}</span>
                            </div>
                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => toggleColumnCollapse(e, col.id)} title="Zwiń">
                                    <AbstractIcon variant="eye_on" size={14} />
                                </button>
                                <button onClick={(e) => openNewTaskModal(e, col.id)} title="Dodaj Zadanie">
                                    <AbstractIcon variant="add" size={16} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Drop Zone / List */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                             {tasks.map(task => (
                                 <TaskCard 
                                    key={task.id} 
                                    task={task} 
                                    theme={theme}
                                    onDragStart={handleDragStart}
                                    onClick={openEditTaskModal}
                                 />
                             ))}
                             {/* Fill empty space */}
                             <div className="flex-1 min-h-[50px]" />
                        </div>
                     </div>
                 )
             })}
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden flex-1 flex flex-col relative">
             {boardData.columns.map((col) => {
                 if (col.id !== activeColumnId) return null;
                 const tasks = getTasksForColumn(col.id);
                 
                 return (
                    <div key={col.id} className="absolute inset-0 flex flex-col bg-transparent">
                        <div className={`flex-none p-4 border-b ${borderMain} flex justify-between items-center`}>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono opacity-50 uppercase">SEKTOR</span>
                                <span className="font-display text-xl font-bold uppercase tracking-tight">{col.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={(e) => openNewTaskModal(e, col.id)} className={`border ${borderMain} p-2 hover:bg-zinc-500/20 transition-colors`}>
                                    <AbstractIcon variant="add" size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {tasks.length > 0 ? (
                                tasks.map(task => (
                                    <TaskCard 
                                        key={task.id} 
                                        task={task} 
                                        theme={theme}
                                        onDragStart={() => {}}
                                        onClick={openEditTaskModal}
                                    />
                                ))
                            ) : (
                                <div className="p-10 opacity-30 text-center font-mono text-sm uppercase tracking-widest">
                                    [BRAK_DANYCH]
                                </div>
                            )}
                             <div className="h-12" />
                        </div>
                    </div>
                 );
             })}
        </div>

      </main>

      {/* --- Mobile Bottom Nav --- */}
      <div className={`md:hidden flex-none h-16 border-t ${borderMain} flex`}>
            {boardData.columns.map((col) => {
                 const isActive = activeColumnId === col.id;
                 return (
                     <button
                        key={col.id}
                        onClick={() => setActiveColumnId(col.id)}
                        className={`
                            flex-1 flex flex-col items-center justify-center gap-1
                            ${isActive ? (isPaper ? 'bg-zinc-300 text-black' : 'bg-zinc-800 text-white') : 'bg-transparent'}
                            transition-colors
                        `}
                     >
                        <div className={`w-1 h-1 mb-1 rounded-full ${isActive ? 'bg-current' : 'bg-transparent'}`} />
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isActive ? '' : 'opacity-50'}`}>
                            {col.title.substring(0, 4)}
                        </span>
                     </button>
                 )
            })}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        columnId={activeColumnId}
        columns={boardData.columns}
        theme={theme}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default App;
