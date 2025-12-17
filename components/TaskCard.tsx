import React from 'react';
import { Task, Theme } from '../types';
import { AbstractIcon } from './AbstractIcons';

interface TaskCardProps {
  task: Task;
  theme: Theme;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onClick: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, theme, onDragStart, onClick }) => {
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const totalSubtasks = task.subtasks.length;
  

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const isDueSoon = task.dueDate && new Date(task.dueDate).getTime() - Date.now() < 86400000 * 2;


  const cardStyles = {
    void: 'bg-[#161618] text-[#E4E4E7] hover:bg-[#27272A] border-[#27272A]',
    paper: 'bg-[#FFFFFF] text-[#27272A] hover:bg-[#F4F4F5] border-[#E4E4E7]',
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onClick(task)}
      className={`
        group relative w-full
        ${cardStyles[theme]}
        border-b
        cursor-pointer
        transition-colors duration-150
        select-none
        min-h-[100px]
        flex flex-col justify-between
        p-4
      `}
    >

      {task.accentColor && (
          <div 
            className="absolute left-0 top-0 bottom-0 w-1" 
            style={{ backgroundColor: task.accentColor }} 
          />
      )}


      <div className="flex justify-between items-start gap-3 mb-2 pl-2">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
             <h3 className={`text-sm font-display font-bold uppercase tracking-tight truncate leading-tight`}>
               {task.title}
             </h3>
        </div>
        

        <div className="flex items-center gap-2">
            {task.timeSpent > 0 && (
                <div className="flex items-center gap-1.5 text-[10px] opacity-70 font-mono tabular-nums tracking-wider font-medium">
                    <AbstractIcon variant="clock" size={10} />
                    <span>{Math.round(task.timeSpent / 60)}m</span>
                </div>
            )}

            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500">
                <AbstractIcon variant="drag" size={12} />
            </div>
        </div>
      </div>


      {task.description && (
        <p className={`text-[10px] font-mono mb-3 line-clamp-2 opacity-60 leading-relaxed pl-2`}>
          {task.description}
        </p>
      )}


      <div className="flex items-end justify-between mt-auto pl-2">
        

        <div className="flex flex-col gap-2">

            {task.assignees && task.assignees.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                    {task.assignees.map((person, idx) => (
                        <div 
                            key={idx}
                            className={`
                                w-5 h-5 rounded-none flex items-center justify-center text-[8px] font-bold font-mono border
                                ${theme === 'void' ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'}
                            `}
                        >
                            {person}
                        </div>
                    ))}
                </div>
            )}


            <div className="flex flex-wrap gap-2 max-w-[150px]">
            {task.tags && task.tags.map((tag, idx) => (
                <span 
                key={idx} 
                className={`
                    text-[8px] font-mono uppercase px-1.5 py-0.5 border
                    ${theme === 'void' ? 'border-zinc-700 text-zinc-400' : 'border-zinc-300 text-zinc-600'}
                `}
                >
                {tag}
                </span>
            ))}
            </div>
        </div>


        <div className="flex flex-col items-end gap-1">
            {task.dueDate && (
                <div className={`
                    text-[9px] font-mono flex items-center gap-1 px-1.5 py-0.5
                    ${isOverdue ? 'bg-red-500/20 text-red-500' : isDueSoon ? 'bg-amber-500/20 text-amber-500' : 'opacity-40'}
                `}>
                    {isOverdue && '! '}
                    {new Date(task.dueDate).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' })}
                </div>
            )}
            
            {totalSubtasks > 0 && (
              <div className="text-[9px] font-mono opacity-40">
                {completedSubtasks}/{totalSubtasks}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};