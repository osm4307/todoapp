import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from '../TodoForm';
import * as TodoContextModule from '../../contexts/TodoContext';

// useTodo 훅 모의(Mocking)
const mockDispatch = vi.fn();
const mockUseTodo = (initialTodos: any[] = []) => {
  return {
    state: { todos: initialTodos },
    dispatch: mockDispatch,
  };
};

// useTodo 훅을 모의 처리 (실제 구현 대신 이 모의 함수가 사용됨)
vi.mock('../../contexts/TodoContext', () => ({
  useTodo: vi.fn(),
  TodoProvider: vi.fn(({ children }) => children), // Provider는 단순히 children을 렌더링하도록 모의
}));

describe('TodoForm', () => {
  // 각 테스트 전에 useTodo 모의 설정 초기화
  beforeEach(() => {
    // useTodo 모의 구현을 초기 상태로 설정
    vi.mocked(TodoContextModule.useTodo).mockReturnValue(mockUseTodo([]));
    mockDispatch.mockClear(); // dispatch 목 함수 호출 기록 초기화
  });

  it('renders form correctly', () => {
    render(
      <TodoContextModule.TodoProvider>
        <TodoForm />
      </TodoContextModule.TodoProvider>
    );

    expect(screen.getByPlaceholderText('새로운 할 일을 입력하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add todo/i })).toBeInTheDocument();
  });

  it('adds new todo when form is submitted', () => {
    render(
      <TodoContextModule.TodoProvider>
        <TodoForm />
      </TodoContextModule.TodoProvider>
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요');
    const submitButton = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TODO',
      payload: {
        title: 'New Todo',
        completed: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        dueDate: undefined,
      },
    });
    expect(input).toHaveValue('');
  });

  it('does not add empty todo', () => {
    render(
      <TodoContextModule.TodoProvider>
        <TodoForm />
      </TodoContextModule.TodoProvider>
    );

    const submitButton = screen.getByRole('button', { name: /Add todo/i });
    fireEvent.click(submitButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('shows alert if todo limit is reached', () => {
    // 20개 초과 상황 모의
    vi.mocked(TodoContextModule.useTodo).mockReturnValue(mockUseTodo(Array(20).fill({})));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <TodoContextModule.TodoProvider>
        <TodoForm />
      </TodoContextModule.TodoProvider>
    );

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요');
    const submitButton = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: 'Over Limit Todo' } });
    fireEvent.click(submitButton);

    expect(alertSpy).toHaveBeenCalledWith('최대 20개의 할 일만 등록할 수 있습니다.');
    expect(mockDispatch).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });
}); 