import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';
import * as TodoContextModule from '../../contexts/TodoContext';
import { Todo } from '../../types/todo';

const mockDispatch = vi.fn();
const mockUseTodo = (initialTodos: Todo[] = []) => {
  return {
    state: { todos: initialTodos },
    dispatch: mockDispatch,
  };
};

vi.mock('../../contexts/TodoContext', () => ({
  useTodo: vi.fn(),
  TodoProvider: vi.fn(({ children }) => children),
}));

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: undefined,
  };

  beforeEach(() => {
    vi.mocked(TodoContextModule.useTodo).mockReturnValue({
      state: { todos: [] },
      dispatch: mockDispatch,
    });
    mockDispatch.mockClear();
  });

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Edit todo')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete todo')).toBeInTheDocument();
  });

  it('toggles todo completion when checkbox is clicked', () => {
    const { rerender } = render(<TodoItem todo={mockTodo} />);
    const toggleButton = screen.getByLabelText('Toggle todo');
    fireEvent.click(toggleButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TODO',
      payload: { id: mockTodo.id, completed: true },
    });

    rerender(<TodoItem todo={{ ...mockTodo, completed: true }} />);
    expect(screen.getByText('Test Todo')).toHaveClass('line-through');
    expect(screen.getByText('Test Todo')).toHaveClass('text-muted-foreground');
  });

  it('enters edit mode when edit button is clicked', () => {
    render(<TodoItem todo={mockTodo} />);
    const editButton = screen.getByLabelText('Edit todo');
    fireEvent.click(editButton);

    const input = screen.getByLabelText('Edit todo title');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Test Todo');
  });

  it('saves edited title when save button is clicked', () => {
    render(<TodoItem todo={mockTodo} />);
    const editButton = screen.getByLabelText('Edit todo');
    fireEvent.click(editButton);

    const input = screen.getByLabelText('Edit todo title');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });

    const saveButton = screen.getByLabelText('Save todo');
    fireEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TODO',
      payload: {
        id: mockTodo.id,
        title: 'Updated Todo',
        dueDate: undefined,
      },
    });
    expect(screen.queryByLabelText('Edit todo title')).not.toBeInTheDocument();
  });

  it('deletes todo when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} />);
    const deleteButton = screen.getByLabelText('Delete todo');
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DELETE_TODO',
      payload: mockTodo.id,
    });
  });
}); 