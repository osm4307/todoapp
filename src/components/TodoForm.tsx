// Component for adding a new todo (새 할 일을 추가하는 컴포넌트)
// Provides input fields for title and due date (제목과 마감일 입력 필드 제공)

import React from 'react';
import { Plus } from 'lucide-react';
import { useTodoForm } from '../hooks/useTodoForm';

// Memoized component for performance (성능을 위한 React.memo 사용)
export const TodoForm = React.memo(() => {
  const { title, dueDate, handleSubmit, handleTitleChange, handleDueDateChange } = useTodoForm();

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="새로운 할 일을 입력하세요"
          className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="New todo title"
        />
        <input
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          className="px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Due date"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          aria-label="Add todo"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
});
