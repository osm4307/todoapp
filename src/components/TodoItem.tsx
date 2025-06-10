// Component for displaying a single todo item (단일 할 일 항목을 표시하는 컴포넌트)
// Handles todo completion, editing, and deletion (할 일 완료, 수정, 삭제 기능 처리)

import React from 'react';
import { Todo } from '../types/todo';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { useTodoItem } from '../hooks/useTodoItem';

interface TodoItemProps {
  todo: Todo;
}

// Memoized component for performance (성능을 위한 React.memo 사용)
export const TodoItem = React.memo(({ todo }: TodoItemProps) => {
  const {
    isEditing,
    editedTitle,
    setEditedTitle,
    isSettingDueDate,
    editedDueDate,
    handleToggleComplete,
    handleEdit,
    handleSave,
    handleDelete,
    handleKeyPress,
    handleDueDateChange,
    handleDueDateSave,
  } = useTodoItem(todo);

  return (
    // Layout for todo item (할 일 항목 레이아웃)
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-2 rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-md">
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        {/* Complete/Incomplete button (완료/미완료 버튼) */}
        <button
          onClick={handleToggleComplete}
          aria-label="Toggle todo"
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            todo.completed
              ? 'bg-primary border-primary'
              : 'border-input hover:border-primary'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-primary-foreground" />}
        </button>

        {/* Todo content (할 일 내용) */}
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-2 py-1 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              aria-label="Edit todo title"
            />
          ) : (
            <span
              className={`text-foreground ${
                todo.completed ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {todo.title}
            </span>
          )}

          {/* Due date display and edit (마감일 표시 및 수정) */}
          {isSettingDueDate ? (
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="date"
                value={editedDueDate}
                onChange={handleDueDateChange}
                className="px-2 py-1 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleDueDateSave}
                aria-label="Save due date"
                className="p-1 text-primary hover:bg-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            todo.dueDate && (
              <div className="text-sm text-muted-foreground mt-1">
                마감일: {new Date(todo.dueDate).toLocaleDateString()}
              </div>
            )
          )}
        </div>
      </div>

      {/* Action buttons (작업 버튼들) */}
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            aria-label="Save todo"
            className="p-1 text-primary hover:bg-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          >
            <Check className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            aria-label="Edit todo"
            className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleDelete}
          aria-label="Delete todo"
          className="p-1 text-muted-foreground hover:text-destructive transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
