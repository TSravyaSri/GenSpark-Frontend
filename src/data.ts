import { Task, User } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'user'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design New Dashboard',
    description: 'Create wireframes and mockups for the new admin dashboard',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-25',
    assignedTo: '1'
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Add user authentication and authorization features',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-03-28',
    assignedTo: '2'
  },
  {
    id: '3',
    title: 'Write Documentation',
    description: 'Document the API endpoints and usage guidelines',
    status: 'done',
    priority: 'medium',
    dueDate: '2024-03-20',
    assignedTo: '1'
  }
];