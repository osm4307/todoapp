import { useState, useCallback } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { TodoInput } from '../types/todo';

export function useTodoForm() {
  const { dispatch, state } = useTodo();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (state.todos.length >= 20) {
        alert('최대 20개의 할 일만 등록할 수 있습니다.');
        return;
      }
      if (title.trim()) {
        const newTodo: TodoInput = {
          title: title.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          dueDate: dueDate || undefined,
        };
        dispatch({
          type: 'ADD_TODO',
          payload: newTodo,
        });
        setTitle('');
        setDueDate('');
      }
    },
    [dispatch, title, dueDate, state.todos.length]
  );

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleDueDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  }, []);

  return {
    title,
    dueDate,
    handleSubmit,
    handleTitleChange,
    handleDueDateChange,
  };
} 