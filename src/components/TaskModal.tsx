import React from 'react';
import { X, Calendar, Flag, User } from 'lucide-react';
import { Task, User as UserType } from '../types';
import { format } from 'date-fns';

interface TaskModalProps {
  task: Task;
  user: UserType;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">{task.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-gray-500" />
                <span className="text-gray-600">
                  Due: {format(new Date(task.dueDate), 'MMMM d, yyyy')}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Flag size={20} className="text-gray-500" />
                <span className="capitalize text-gray-600">{task.priority} Priority</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-500" />
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-600">{user.name}</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};