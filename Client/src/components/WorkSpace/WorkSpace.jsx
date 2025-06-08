import React from 'react'
import useappstore from './../../store/appstore';
import DrawingEditor from '../drawing/DrawingEditor';
import CodingEditor from '../CodingEditor/CodingEditor';

function WorkSpace() {
  const activitystate=useappstore((state)=>state.activitystate);

  return (
    <div className='absolute inset-0 w-full h-full flex flex-col overflow-hidden md:static'>
      {activitystate==="coding"?(
        <CodingEditor/>
      ):(
        <DrawingEditor/>
      )}
    </div>
  )
}

export default WorkSpace