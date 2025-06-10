import { useState, useCallback } from 'react';
import { Todo } from '../types/todo';
import { useTodo } from '../contexts/TodoContext';

export function useTodoItem(todo: Todo) {
  const { dispatch } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isSettingDueDate, setIsSettingDueDate] = useState(false);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || '');

  const handleToggleComplete = useCallback(() => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { id: todo.id, completed: !todo.completed },
    });
  }, [dispatch, todo.id, todo.completed]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'UPDATE_TODO',
        payload: {
          id: todo.id,
          title: editedTitle.trim(),
          dueDate: editedDueDate || undefined,
        },
      });
      setIsEditing(false);
    }
  }, [dispatch, todo.id, editedTitle, editedDueDate]);

  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  }, [dispatch, todo.id]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave();
      } else if (e.key === 'Escape') {
        setIsEditing(false);
        setEditedTitle(todo.title);
      }
    },
    [handleSave, todo.title]
  );

  const handleDueDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDueDate(e.target.value);
  }, []);

  const handleDueDateSave = useCallback(() => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        ...todo,
        dueDate: editedDueDate || undefined,
      },
    });
    setIsSettingDueDate(false);
  }, [dispatch, todo, editedDueDate]);

  return {
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
  };
} 