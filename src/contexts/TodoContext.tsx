// State management and Context provider for todos (할 일 상태 관리 및 Context 제공 파일)
// Uses React Context API to provide global todo state and actions (전역에서 할 일 목록을 관리하고, 컴포넌트에서 쉽게 접근할 수 있도록 Context API를 사용합니다.)

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Todo, TodoInput } from '../types/todo';
// import { useTodoStorage } from '../hooks/useTodoStorage'; // useTodoStorage 훅 제거

// Type for todo state (Todo 상태 타입 정의)
interface TodoState {
  todos: Todo[];
}

// 초기 상태를 로컬 스토리지에서 불러오는 함수
const getInitialState = (): TodoState => {
  if (typeof window === 'undefined') {
    return { todos: [] };
  }
  try {
    const savedTodos = localStorage.getItem('todos');
    console.log('GETTING initial todos from localStorage:', savedTodos); // 로깅 추가
    const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
    console.log('PARSED initial todos:', parsedTodos); // 로깅 추가
    return { todos: parsedTodos };
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    return { todos: [] };
  }
};

// Action types for reducer (액션 타입 정의, 부분 업데이트 지원)
type TodoAction =
  | { type: 'ADD_TODO'; payload: TodoInput }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string } & Partial<Todo> }
  | { type: 'LOAD_TODOS'; payload: Todo[] };

// Create Context (Context 생성)
const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
} | null>(null);

// Reducer function: handles state changes based on action (reducer 함수: 액션에 따라 상태를 변경)
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  let newState: TodoState;

  switch (action.type) {
    case 'ADD_TODO': {
      // Add new todo (새 할 일 추가)
      const newTodo: Todo = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      newState = {
        ...state,
        todos: [...state.todos, newTodo],
      };
      break;
    }
    case 'TOGGLE_TODO':
      // Toggle completion (완료/미완료 토글)
      newState = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        ),
      };
      break;
    case 'DELETE_TODO':
      // Delete todo (할 일 삭제)
      newState = {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
      break;
    case 'UPDATE_TODO':
      // Partial update for todo (할 일 부분 업데이트: 제목, 완료, 마감일 등)
      newState = {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload, updatedAt: new Date().toISOString() }
            : todo
        ),
      };
      break;
    case 'LOAD_TODOS':
      // Load todos from localStorage (로컬 스토리지에서 할 일 불러오기)
      // This case is now less critical as initialState handles initial load
      newState = {
        ...state,
        todos: action.payload,
      };
      break;
    default:
      return state;
  }
  return newState;
};

// Context Provider component (Context Provider 컴포넌트)
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, getInitialState());

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    console.log('SAVING todos to localStorage:', state.todos); // 로깅 추가
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

// Custom hook for using todo context (Context를 쉽게 사용하기 위한 커스텀 훅)
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
