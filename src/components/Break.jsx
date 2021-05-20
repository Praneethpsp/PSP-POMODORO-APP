import React from 'react';

const Break = props => {
    return (
        <div className='break-container'>
            <h2 id='break-label'>Break Time</h2>
            
            <div className='button-container'>
                <button
                    id='break-increment'
                    onClick={props.incrementBreak}
                    >
                &#8593;
                </button>

                <h2 id='break-length' style={{margin: 0}}>
                {props.breakLength} min
                </h2>
                
                <button
                    id='break-decrement'
                    onClick={props.decrementBreak}
                    >
                &#8595;
                </button>
            </div>
        </div>
    )
}

export default Break;