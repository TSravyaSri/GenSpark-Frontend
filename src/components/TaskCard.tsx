import React from 'react';
import { Calendar, Flag, User } from 'lucide-react';
import { Task, User as UserType } from '../types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  user: UserType;
  onClick: () => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  'done': 'bg-green-100 text-green-800'
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, user, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{format(new Date(task.dueDate), 'MMM d')}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-6 h-6 rounded-full"
          />
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
    </div>
  );
};