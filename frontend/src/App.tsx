import React from 'react';
import StudentsPage from './pages/StudentsPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management App</h1>
      </header>
      <main>
        <StudentsPage />
      </main>
    </div>
  );
}

export default App;




