import React from 'react';

const WorkTime = props => {
    return (
        <div className='worktime-container' >
            <h2 id='worktime-label'>Work Time</h2>
            
            <div className='button-container'>
                <button
                    id='worktime-increment'
                    onClick={props.incrementWorkTime}
                    >
                &#8593;
                </button>

                <h2 id='worktime-length' style={{margin: 0}}>
                {props.worktimeLength} min
                </h2>
                
                <button
                    id='worktime-decrement'
                    onClick={props.decrementWorkTime}
                    >
                &#8595;
                </button>
            </div>
        </div>
    )
}

export default WorkTime;