// Third party imports
import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

// Local imports
import './RenderHighlighter.css';

/**
 * Component that highlights when it is rendered to demonstate what triggers re-renders.
 * 
 * @param name - Title of this particular node.
 * @param children - Note that this param is a function. This is to ensure that the children will
 * re-render when this component re-renders. Normally you would want to avoid this, but since the purpose
 * of this component is to illustrate how the parent-child relationship affects renders, this behavior
 * is desirable. 
 */
const RenderHighlighter = ({name, children}: { name: string, children?: () => React.ReactNode }) => {

  // Initialize to 1 to account for the render on mount
  // Need to use `useRef` here to be able to count renders triggered from both this component itself,
  // and its parent
  const renderCount = useRef(1);
  const [, setStateTrigger] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Whenever this component is re-renndered, trigger animation
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    const currentToggle = boxRef.current?.getAttribute('animation-trigger');
    boxRef.current?.setAttribute('animation-trigger', currentToggle === 'true' ? 'false' : 'true');
  });

  // When the button is clicked, change the state to trigger a render
  const onUpdateStateClick = () => {
    setStateTrigger(oldValue => !oldValue);
  };

  return(
    <>
      <Paper elevation={3} className='display-box' sx={{borderRadius: '10px'}} ref={boxRef}>
        <div>
          <div className='header'>{name}</div>
          <div>render count: { renderCount.current }</div>
          <Button variant="contained" style={{marginTop: 20, marginBottom: 10}} onClick={onUpdateStateClick}>
            Update State
          </Button>
        </div>
      </Paper>
      {children && (
        <div className='children-container'>
          {children()}
        </div>
      )}
    </>
  );

};

export default RenderHighlighter;