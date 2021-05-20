import React from 'react';
import Timer from './components/Timer';

const App = () => {

  return (
    <div className = "app-container">
      <h1 style={{color: '#676767', fontSize: '3rem'}}>PSP Pomodoro Timer</h1>
      <h4 style = {
        {
          color: '#676767',
          fontSize: '1.5rem'
        }
      }> Work efficiently without distractions💻😎 </h4>
      <Timer />
      <p className="copyright">©PSP POMODORO APP {new Date().getFullYear()}</p>
    </div>
  );
}

export default App;
