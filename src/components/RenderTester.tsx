// Third part imports
import React from 'react';

// Component imports
import RenderHighlighter from './RenderHighlighter';

function RenderTester() {

  return(
    <div className='render-tester'>
      <RenderHighlighter name='Parent'>
      {() => (
        <React.Fragment>
          <RenderHighlighter name='Child 1'/>
          <RenderHighlighter name='Child 2'/>
        </React.Fragment>
      )}
      </RenderHighlighter>
    </div>
  );

}

export default RenderTester;