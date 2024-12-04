import { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import './RenderTester.css';

const ParentComponent = ({name}: { name: string }) => {

  // Initialize to 1, because updating value in useRef doesn't trigger a re-render. Thus
  // it's count is actually always 1 behind (because you don't see the value until the following
  // render).
  const renderCount = useRef(1);
  const [stateTrigger, setStateTrigger] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    const currentToggle = boxRef.current?.getAttribute('animation-trigger');
    boxRef.current?.setAttribute('animation-trigger', currentToggle === 'true' ? 'false' : 'true');
  });

  const onUpdateStateClick = () => {
    setStateTrigger(!stateTrigger);
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
      <div className='children-container'>
        <ChildComponent name="Child 1" parentStateTrigger={stateTrigger}/>
      </div>
    </>
  );

};

const ChildComponent = ({name, parentStateTrigger}: { name: string, parentStateTrigger: boolean}) => {

  // Initialize to 1, because updating value in useRef doesn't trigger a re-render. Thus
  // it's count is actually always 1 behind (because you don't see the value until the following
  // render).
  const renderCount = useRef(1);
  const [stateTrigger, setStateTrigger] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    const currentToggle = boxRef.current?.getAttribute('animation-trigger');
    boxRef.current?.setAttribute('animation-trigger', currentToggle === 'true' ? 'false' : 'true');
  });

  const onUpdateStateClick = () => {
    setStateTrigger(!stateTrigger);
  };

  return(
    <div className='child-wrapper'>
      <Paper elevation={3} className='display-box' sx={{borderRadius: '10px'}} ref={boxRef}>
        <div>
          <div className='header'>{name}</div>
          <div>render count: { renderCount.current }</div>
          <div style={{fontFamily: 'monospace'}}>props: { `{ parentStateTrigger: ${parentStateTrigger} }` }</div>
          <Button variant="contained" style={{marginTop: 20, marginBottom: 10}} onClick={onUpdateStateClick}>
            Update State
          </Button>
        </div>
      </Paper>
      {/* <div className='children-container'>
        {children}
      </div> */}
    </div>
  );

};

function RenderTester() {

  return(
    <div className='render-tester'>
      <ParentComponent name='Parent' />
    </div>
  );

}

export default RenderTester;