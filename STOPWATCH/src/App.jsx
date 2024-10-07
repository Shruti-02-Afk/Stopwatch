import React from 'react'
import "./App.css";
import { useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const App = () => {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeRef = useRef(null);

  const formateTime = (time) => {

    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  }

  const handleToggle = () => {
    if (isRunning) {
      console.log(timeRef.current);
      clearInterval(timeRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timeRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 200);
      }, 200)
    }
  }

  const handleReset = () => {
    clearInterval(timeRef.current);
    setIsRunning(false);
    setTime(0);
  }

  return (
    <div className="app">
      <div className="container" >
        <div className="reset">
          <RefreshIcon onClick={handleReset} />
        </div>
        <div className="circle" style={{ backgroundImage: "linear-gradient(to right bottom, #d27f7f, #d78d82, #dc9b87, #dfa98f, #e2b799, #e5c1a1, #e9caa9, #ecd4b2, #f1ddb9, #f6e5c1, #faeec9, #fff7d1)" }}>

          <div className="text_card">
            <h1 className="time">{formateTime(time)}</h1>
          </div>
        </div>
        <form>
          <div className="btn">
            <Stack className="center_btn" spacing={2} direction="row">
              <Button onClick={handleToggle} className='start_btn' variant="contained">
                {
                  isRunning ? <PauseIcon sx={{ fontSize: 35 }} /> : <PlayArrowIcon sx={{ fontSize: 35 }} />
                }

              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
