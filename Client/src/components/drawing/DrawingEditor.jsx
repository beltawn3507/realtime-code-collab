import React, { useCallback, useEffect } from 'react'
import {Tldraw,useEditor,getSnapshot,loadSnapshot} from "tldraw"
import useWindowDimensions from './../../Hooks/useWindowDimensions';
import useappstore from '../../store/appstore';
import { usesocketstore } from './../../store/useSocketstore';
import 'tldraw/tldraw.css'



function DrawingEditor() {
  const {isMobile}=useWindowDimensions()
  const room = useappstore.getState().currentuser.roomId;

 


 return (
       <div tabIndex={0} style={{ height: '100%', width: '100%' }}>
        <Tldraw
            // survives a reload
            persistenceKey={room}
            inferDarkMode
            forceMobile={isMobile}
            defaultName="Editor"
            className="z-0"
            // overrides={noShortcuts}
        >
            <ReachEditor />
        </Tldraw>
        </div>
    )
}

function ReachEditor(){
  const editor=useEditor();
  const {setDrawingdata}=useappstore();
  const drawingdata=useappstore((state)=>state.drawingdata)
  const {socket} = usesocketstore();

  const handleChangeEvent=useCallback(
    (change)=>{
      const snapshot=change.changes
      const data=getSnapshot(editor.store)
      setDrawingdata(data);
      socket.emit("drawing_update", { snapshot }) 
    },[editor.store, setDrawingdata, socket]
  )
  

  //drawing updates from other client
    const handleRemoteDrawing = useCallback(
        ({ snapshot }) => {
            editor.store.mergeRemoteChanges(() => {
                const { added, updated, removed } = snapshot

                for (const record of Object.values(added)) {
                    editor.store.put([record])
                }
                for (const [, to] of Object.values(updated)) {
                    editor.store.put([to])
                }
                for (const record of Object.values(removed)) {
                    editor.store.remove([record.id])
                }
            })
            const data=getSnapshot(editor.store)
            setDrawingdata(data)
        },
        [editor.store, setDrawingdata],
    )

   useEffect(() => {
        // Load the drawing data from the context
        if (drawingdata && Object.keys(drawingdata).length > 0) {
            loadSnapshot(editor.store,drawingdata);
        }
    }, [])

    useEffect(() => {
        const cleanupFunction = editor.store.listen(handleChangeEvent, {
            source: "user",
            scope: "document",
        })
        //keep socket listener on for drawing update
        socket.on("drawing_update", handleRemoteDrawing)

        // Cleanup
        return () => {
            cleanupFunction()
            socket.off("drawing_update")
        }
    }, [
        handleChangeEvent,
        handleRemoteDrawing,
        socket,
    ])
    return null;
}



export default DrawingEditor