import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Task, User } from './types';
import { tasks, users } from './data';
import { Header } from './components/Header';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { Login } from './components/Login';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  
  const tasksPerPage = 6;

  useEffect(() => {
    let result = [...tasks];

    // Search
    if (searchQuery) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { low: 0, medium: 1, high: 2 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    setFilteredTasks(result);
  }, [searchQuery, statusFilter, sortBy]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    toast.success(`Welcome back, ${loggedInUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header 
        user={user}
        onLogout={handleLogout}
        onSearch={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                user={users.find(u => u.id === task.assignedTo)!}
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          user={users.find(u => u.id === selectedTask.assignedTo)!}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default App;