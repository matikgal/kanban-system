
import React, { useState, useEffect, useRef } from 'react';
import { Task, Subtask, Theme, Column, HistoryEntry } from '../types';
import { AbstractIcon } from './AbstractIcons';

interface TaskModalProps {
  isOpen: boolean;
  task: Task | null;
  columnId?: string;
  columns: Column[];
  theme: Theme;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const ACCENT_COLORS = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#d946ef',
];

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  task,
  columnId,
  columns,
  theme,
  onClose,
  onSave,
  onDelete,
}) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('low');
  const [dueDate, setDueDate] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('todo');
  

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [accentColor, setAccentColor] = useState<string>('');
  const [assignees, setAssignees] = useState<string[]>([]);
  const [newAssignee, setNewAssignee] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      setSubtasks(task.subtasks);
      setSelectedColumnId(task.columnId);
      setTags(task.tags || []);
      setAccentColor(task.accentColor || '');
      setAssignees(task.assignees || []);
      setTimeSpent(task.timeSpent || 0);
      setHistory(task.history || []);
    } else {
      setTitle('');
      setDescription('');
      setPriority('low');
      setDueDate('');
      setSubtasks([]);
      setSelectedColumnId(columnId || 'todo');
      setTags([]);
      setAccentColor('');
      setAssignees([]);
      setTimeSpent(0);
      setHistory([]);
    }
    setIsTimerRunning(false);
    setShowDeleteConfirm(false);
    if(timerRef.current) clearInterval(timerRef.current);
  }, [task, isOpen, columnId]);


  useEffect(() => {
    if (isTimerRunning) {
        timerRef.current = window.setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);
    } else {
        if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if(timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerRunning]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;


    const newHistory = [...history];
    if (!task) {
        newHistory.push({ id: `h-${Date.now()}`, action: 'UTWORZONO ZADANIE', timestamp: Date.now() });
    } else {
        newHistory.push({ id: `h-${Date.now()}`, action: 'ZAKTUALIZOWANO', timestamp: Date.now() });
    }

    const newTask: Task = {
      id: task?.id || `t-${Date.now()}`,
      columnId: selectedColumnId,
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      subtasks,
      tags,
      accentColor,
      assignees,
      timeSpent,
      history: newHistory,
      createdAt: task?.createdAt || Date.now(),
    };
    onSave(newTask);
    onClose();
  };


  const addSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    setSubtasks([...subtasks, { id: `s-${Date.now()}`, title: newSubtaskTitle, completed: false }]);
    setNewSubtaskTitle('');
  };

  const toggleSubtask = (subId: string) => {
    setSubtasks(subtasks.map(s => s.id === subId ? { ...s, completed: !s.completed } : s));
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    if (!tags.includes(newTag.trim())) setTags([...tags, newTag.trim()]);
    setNewTag('');
  };

  const addAssignee = () => {
      if(!newAssignee.trim()) return;
      if(assignees.length >= 4) return; 
      setAssignees([...assignees, newAssignee.trim().toUpperCase().substring(0, 2)]);
      setNewAssignee('');
  }

  const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatHistoryTime = (ts: number) => {
      return new Date(ts).toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit'});
  }


  const isPaper = theme === 'paper';
  const modalBg = isPaper ? 'bg-[#E0E2E5]' : 'bg-[#161618]'; 
  const textColor = isPaper ? 'text-zinc-800' : 'text-[#E4E4E7]';
  const dimTextColor = isPaper ? 'text-zinc-500' : 'text-zinc-500';
  const borderColor = isPaper ? 'border-zinc-300' : 'border-[#27272A]';
  const inputBg = 'bg-transparent';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 ${isPaper ? 'bg-zinc-200/60' : 'bg-black/80'} backdrop-blur-sm`} onClick={onClose}></div>
      
      <div className={`
        relative w-full h-full md:h-[90vh] md:max-w-4xl ${modalBg} 
        md:border ${borderColor}
        flex flex-col 
        shadow-2xl
      `}>
        

        <div className={`flex justify-between items-stretch border-b ${borderColor} h-14 flex-shrink-0`}>
          <div className={`flex items-center px-6 border-r ${borderColor} flex-1`}>
             <div className={`w-2 h-2 mr-3 rounded-full`} style={{ backgroundColor: accentColor || (isPaper ? '#ccc' : '#333') }}></div>
             <h2 className={`text-sm font-mono font-bold uppercase tracking-widest ${textColor}`}>
               {task ? `ID: ${task.id}` : 'NOWY WPIS'}
             </h2>
          </div>
          <div className="flex items-center px-4 gap-4">

               <div className={`flex items-center gap-3 font-mono text-sm ${textColor}`}>
                   <span>{formatTime(timeSpent)}</span>
                   <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`p-1.5 border ${borderColor} hover:bg-zinc-500/20`}
                   >
                       <AbstractIcon variant={isTimerRunning ? 'pause' : 'play'} size={14} />
                   </button>
               </div>
          </div>
          <button onClick={onClose} className={`px-6 border-l ${borderColor} hover:bg-red-500 hover:text-white transition-colors ${textColor}`}>
            <AbstractIcon variant="close" size={20} />
          </button>
        </div>


        <div className="flex-1 overflow-y-auto md:grid md:grid-cols-12">
            

            <div className={`md:col-span-7 p-6 md:p-8 space-y-8 border-b md:border-b-0 md:border-r ${borderColor}`}>
                <div className="space-y-2">
                    <label className={`block text-[10px] font-mono ${dimTextColor} uppercase tracking-widest`}>// TEMAT</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="WPISZ TYTUŁ..."
                        className={`w-full ${inputBg} text-2xl font-display font-bold uppercase ${textColor} placeholder-zinc-600 focus:outline-none border-b ${borderColor} py-2`}
                    />
                </div>

                <div className="space-y-2">
                    <label className={`block text-[10px] font-mono ${dimTextColor} uppercase tracking-widest`}>// OPIS</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="BRAK DANYCH..."
                        className={`w-full ${inputBg} ${textColor} border ${borderColor} p-4 text-xs font-mono focus:outline-none min-h-[150px] resize-none leading-relaxed`}
                    />
                </div>


                <div className={`pt-4`}>
                    <label className={`block text-[10px] font-mono ${dimTextColor} mb-3 uppercase tracking-widest`}>
                        PODZADANIA ({subtasks.filter(s => s.completed).length}/{subtasks.length})
                    </label>
                    
                    <div className="space-y-1">
                    {subtasks.map(sub => (
                        <div key={sub.id} className="flex items-center group py-1">
                        <button
                            onClick={() => toggleSubtask(sub.id)}
                            className={`w-3 h-3 border mr-3 flex items-center justify-center ${sub.completed ? 'bg-zinc-500 border-zinc-500' : `${borderColor} bg-transparent`}`}
                        />
                        <span className={`flex-1 text-xs font-mono uppercase ${sub.completed ? 'text-zinc-500 line-through' : textColor}`}>
                            {sub.title}
                        </span>
                        </div>
                    ))}
                    <input
                        type="text"
                        value={newSubtaskTitle}
                        onChange={(e) => setNewSubtaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
                        placeholder="+ DODAJ KROK"
                        className={`mt-2 w-full ${inputBg} text-xs font-mono uppercase ${dimTextColor} focus:outline-none border-b ${borderColor} border-dashed py-1`}
                    />
                    </div>
                </div>
            </div>


            <div className={`md:col-span-5 flex flex-col`}>
                

                <div className={`p-6 border-b ${borderColor} space-y-6`}>
                    <div>
                        <label className={`block text-[10px] font-mono ${dimTextColor} mb-2 uppercase tracking-widest`}>KOLUMNA</label>
                        <select 
                            value={selectedColumnId}
                            onChange={(e) => setSelectedColumnId(e.target.value)}
                            className={`w-full ${inputBg} ${textColor} text-xs font-mono border ${borderColor} p-2 uppercase focus:outline-none`}
                        >
                            {columns.map(col => (
                                <option 
                                    key={col.id} 
                                    value={col.id}
                                    className={isPaper ? 'bg-[#E0E2E5] text-zinc-800' : 'bg-[#161618] text-[#E4E4E7]'}
                                >
                                    {col.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                         <label className={`block text-[10px] font-mono ${dimTextColor} mb-2 uppercase tracking-widest`}>KOLOR AKCENTU</label>
                         <div className="flex flex-wrap gap-2">
                             <button 
                                onClick={() => setAccentColor('')}
                                className={`w-5 h-5 border ${borderColor} relative`}
                             >
                                 <div className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-500">/</div>
                             </button>
                             {ACCENT_COLORS.map(color => (
                                 <button
                                    key={color}
                                    onClick={() => setAccentColor(color)}
                                    style={{ backgroundColor: color }}
                                    className={`w-5 h-5 hover:opacity-80 ${accentColor === color ? 'ring-1 ring-white' : ''}`}
                                 />
                             ))}
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className={`block text-[10px] font-mono ${dimTextColor} mb-2 uppercase tracking-widest`}>TERMIN</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className={`w-full ${inputBg} ${textColor} text-xs font-mono py-1 border-b ${borderColor}`}
                            />
                        </div>
                         <div>
                             <label className={`block text-[10px] font-mono ${dimTextColor} mb-2 uppercase tracking-widest`}>PRZYPISANI</label>
                             <div className="flex items-center gap-1 mb-1">
                                 {assignees.map((a, i) => (
                                     <span key={i} onClick={() => setAssignees(assignees.filter(x => x !== a))} className="cursor-pointer hover:bg-red-500 w-5 h-5 flex items-center justify-center bg-zinc-700 text-white text-[8px] font-mono border border-zinc-600">{a}</span>
                                 ))}
                             </div>
                             <input 
                                type="text" 
                                maxLength={2}
                                placeholder="+ INICJAŁY"
                                value={newAssignee}
                                onChange={e => setNewAssignee(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addAssignee()}
                                className={`w-full ${inputBg} ${textColor} text-xs font-mono py-1 border-b ${borderColor}`}
                             />
                         </div>
                    </div>
                </div>


                <div className={`p-6 border-b ${borderColor}`}>
                     <label className={`block text-[10px] font-mono ${dimTextColor} mb-2 uppercase tracking-widest`}>TAGI</label>
                     <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map(tag => (
                            <span key={tag} className={`text-[9px] border ${borderColor} ${textColor} px-1.5 py-0.5 font-mono uppercase cursor-pointer hover:line-through`} onClick={() => setTags(tags.filter(t => t !== tag))}>
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTag()}
                        placeholder="+ TAG"
                        className={`w-full ${inputBg} text-xs font-mono uppercase ${dimTextColor} focus:outline-none border-b ${borderColor} border-dashed`}
                    />
                </div>


                <div className="flex-1 overflow-y-auto p-6 min-h-[150px]">
                     <label className={`block text-[10px] font-mono ${dimTextColor} mb-3 uppercase tracking-widest`}>DZIENNIK AKTYWNOŚCI</label>
                     <div className="space-y-2">
                         {history.slice().reverse().map(h => (
                             <div key={h.id} className={`flex items-start gap-2 text-[9px] font-mono ${dimTextColor}`}>
                                 <span className="opacity-50">[{formatHistoryTime(h.timestamp)}]</span>
                                 <span className={`${textColor}`}>{h.action}</span>
                             </div>
                         ))}
                         {history.length === 0 && <span className="text-[9px] opacity-30 font-mono">BRAK WPISÓW</span>}
                     </div>
                </div>
            </div>
        </div>


        <div className={`p-0 border-t ${borderColor} flex h-12 flex-shrink-0`}>
            {showDeleteConfirm ? (
                <>
                    <button 
                        onClick={() => setShowDeleteConfirm(false)}
                        className={`px-6 border-r ${borderColor} ${textColor} hover:bg-zinc-500/10 transition-colors font-mono uppercase text-[10px] font-bold tracking-widest`}
                    >
                        ANULUJ
                    </button>
                    <div className={`flex-1 flex items-center justify-center bg-red-500/10 text-red-500 font-mono text-[10px]`}>
                        CZY NA PEWNO?
                    </div>
                    <button 
                        onClick={() => {
                            if (task) onDelete(task.id);
                        }}
                        className={`px-6 border-l ${borderColor} bg-red-500 text-white hover:bg-red-600 transition-colors font-mono uppercase text-[10px] font-bold tracking-widest`}
                    >
                        POTWIERDŹ
                    </button>
                </>
            ) : (
                <>
                    {task && (
                        <button 
                            onClick={() => setShowDeleteConfirm(true)}
                            className={`px-6 border-r ${borderColor} text-red-500 hover:bg-red-500 hover:text-white transition-colors font-mono uppercase text-[10px] font-bold tracking-widest`}
                        >
                            USUŃ
                        </button>
                    )}
                    <div className="flex-1"></div>
                    <button 
                        onClick={handleSave}
                        className={`px-8 border-l ${borderColor} ${isPaper ? 'bg-zinc-800 text-white' : 'bg-[#E4E4E7] text-black'} font-mono uppercase text-[10px] font-bold tracking-widest hover:opacity-90`}
                    >
                        ZAPISZ ZMIANY
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
