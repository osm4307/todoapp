// Component for displaying the list of todos (할 일 목록을 표시하는 컴포넌트)
// Renders each todo using TodoItem (각 할 일을 TodoItem 컴포넌트로 렌더링)

import React, { useCallback } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';
import { ClipboardList } from 'lucide-react';

// Memoized component for performance (성능을 위한 React.memo 사용)
export const TodoList = React.memo(() => {
  const { state } = useTodo();
  const { todos } = state;

  // Render empty state when no todos exist (할 일이 없을 때 표시)
  const renderEmptyState = useCallback(() => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ClipboardList className="w-16 h-16 text-muted-foreground mb-4" />
      <p className="text-lg text-muted-foreground">
        할 일이 없습니다. 새로운 할 일을 추가해보세요!
      </p>
    </div>
  ), []);

  if (todos.length === 0) {
    return renderEmptyState();
  }

  return (
    // List layout (목록 레이아웃)
    <div className="space-y-2">
      {todos.map((todo) => (
        // Render each todo item (각 할 일 항목 렌더링)
        <div
          key={todo.id}
          className="transform transition-all duration-300 hover:scale-[1.02]"
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
});
