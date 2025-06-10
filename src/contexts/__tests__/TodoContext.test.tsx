import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoProvider, useTodo } from '../TodoContext';
import { Todo } from '../../types/todo';

// 테스트용 컴포넌트: 현재 상태만 렌더링
const DisplayTodosComponent = () => {
  const { state } = useTodo();
  return (
    <div>
      <div data-testid="todo-count">{state.todos.length}</div>
      {state.todos.map((todo) => (
        <div key={todo.id} data-testid="todo-item">
          {todo.title}
        </div>
      ))}
    </div>
  );
};

// 할 일 추가 테스트용 컴포넌트
const AddTodoComponent = () => {
  const { dispatch } = useTodo();
  return (
    <button onClick={() => dispatch({ type: 'ADD_TODO', payload: { title: 'New Todo', completed: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), description: '' } })}>
      Add Todo
    </button>
  );
};

describe('TodoContext', () => {
  let localStorageMock: {
    store: Record<string, string>;
    getItem: vi.Mock;
    setItem: vi.Mock;
    removeItem: vi.Mock;
    clear: vi.Mock;
  };

  beforeEach(() => {
    localStorageMock = {
      store: {},
      getItem: vi.fn((key: string) => localStorageMock.store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock.store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock.store[key];
      }),
      clear: vi.fn(() => {
        localStorageMock.store = {};
      }),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('adds a new todo', async () => {
    render(
      <TodoProvider>
        <AddTodoComponent />
        <DisplayTodosComponent />
      </TodoProvider>
    );

    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId('todo-count')).toHaveTextContent('1');
    });
    expect(screen.getByTestId('todo-item')).toHaveTextContent('New Todo');

    // setItem이 호출되었는지 확인
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('todos', expect.stringContaining('"title":"New Todo"'));
    });
  });

  it('loads todos from localStorage', async () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: 'Saved Todo',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: '',
      },
    ];

    // getItem이 mockTodos를 반환하도록 설정
    localStorageMock.setItem('todos', JSON.stringify(mockTodos)); // setItem을 통해 store에 저장

    render(
      <TodoProvider>
        <DisplayTodosComponent />
      </TodoProvider>
    );

    // 스토리지에서 불러온 할 일이 올바르게 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByTestId('todo-count')).toHaveTextContent('1');
    });
    expect(screen.getByTestId('todo-item')).toHaveTextContent('Saved Todo');
  });
}); 