import React, { useState, useEffect, useRef } from 'react';
import WorkTime from './WorkTime';
import Break from './Break';
import soundfile from '../alarm.wav';

const Timer = () => {
    const [worktimeLength, setWorkTimeLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [timerLabel, setTimerLabel] = useState('WorkTime');
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [timerRunning, setTimerRunning] = useState(false);
    const myAudio = useRef();
    const context = new AudioContext();
    
    const incrementWorkTime = () => {
      if (!timerRunning && worktimeLength < 60){
        setWorkTimeLength(worktimeLength + 5)
        setSecondsLeft((worktimeLength + 5) * 60);
      }
    }
    const decrementWorkTime = () => {
      if (!timerRunning && worktimeLength > 5) {
        setWorkTimeLength(worktimeLength - 5)
        setSecondsLeft((worktimeLength - 5) * 60);
      }
    }
    const incrementBreak = () => {
      if (!timerRunning && breakLength < 60){
        setBreakLength(breakLength + 1)
      }
    }
    const decrementBreak = () => {
      if (!timerRunning && breakLength > 1) {
        setBreakLength(breakLength - 1)
      }
    }
  
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;

    useEffect(() => {
        const handleSwitch = () => {
            if (timerLabel === 'WorkTime') {
                setTimerLabel('Break');
                setSecondsLeft(breakLength * 60);
            } else if (timerLabel === 'Break') {
                setTimerLabel('WorkTime');
                setSecondsLeft(worktimeLength * 60);
            }
        }

        let countdown = null;
        if (timerRunning && secondsLeft > 0) {
            countdown = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        } else if (timerRunning && secondsLeft === 0) {
            countdown = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            myAudio.current.play();
            handleSwitch();
        } else {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    },
    [timerRunning, secondsLeft, timerLabel, breakLength, worktimeLength, myAudio]);
    
    const handleStart = () => {
        context.resume();
        setTimerRunning(true);
    }
    
    const handleStop = () => {
        setTimerRunning(false);
    }
    
    const handleReset = () => {
        setWorkTimeLength(25);
        setBreakLength(5);
        setSecondsLeft(25 * 60);
        setTimerLabel('WorkTime');
        setTimerRunning(false);
        myAudio.current.pause();
        myAudio.current.currentTime = 0;
    }

    return (
        <div className='timer-component' >
            <div className="label-container">
                <WorkTime
                worktimeLength={worktimeLength}
                incrementWorkTime={incrementWorkTime}
                decrementWorkTime={decrementWorkTime}
                />

            <div className='timer-container'   
                style = {{
                backgroundImage: "url(/tomato.jpg)",
                backgroundPosition: "center"
                }}>
                <h2 id='timer-label'>Pomodoro</h2>
                <h3 id='time-left'>
                    {minutes < 10 ? ("0" + minutes).slice(-2) : minutes}:{seconds < 10 ? ("0" + seconds).slice(-2) : seconds}
                </h3>
                <div className="pomodoro-button-container">
                <button
                    id='start_stop'
                    onClick={timerRunning ? handleStop : handleStart}
                    >
                Start/Stop
                </button>
                <button
                    onClick={handleReset}
                    id='reset'
                    >
                Reset
                </button>
                </div>
            </div>

                <Break
                breakLength={breakLength}
                incrementBreak={incrementBreak}
                decrementBreak={decrementBreak}
                />
            </div>
            
            
            <audio
                id='beep'
                ref={myAudio}
                src={soundfile}
                type='audio'
            ></audio>
        </div>
    )
}

export default Timer;