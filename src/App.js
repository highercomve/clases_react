import React from 'react';
// import Todo from './components/Todo/Todo';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        Esto es una application en React
      </header>
      {/* <Todo /> */}
      <AppRouter/>
    </div>
  );
}

export default App;
