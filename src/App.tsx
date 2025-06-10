import React from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './contexts/TodoContext';

export const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" role="heading" aria-level={1}>
              Todo App
            </h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8" role="main">
          <section aria-labelledby="todo-form-heading">
            <h2 id="todo-form-heading" className="sr-only">
              새로운 할 일 추가
            </h2>
            <TodoForm />
          </section>
          <section aria-labelledby="todo-list-heading" className="mt-8">
            <h2 id="todo-list-heading" className="sr-only">
              할 일 목록
            </h2>
            <TodoList />
          </section>
        </main>
      </div>
    </TodoProvider>
  );
};
