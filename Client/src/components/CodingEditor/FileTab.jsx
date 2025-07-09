import React from 'react'
import cn from "classnames"
import usefilestore from './../../store/usefilestore';
import { IoClose } from "react-icons/io5"

function FileTab() {
  const openFiles=usefilestore((state)=>state.openFiles);
  const activeFile=usefilestore((state)=>state.activeFile);
  const openFile=usefilestore((state)=>state.openFile);
  const closeFile=usefilestore((state)=>state.closeFile);

  return (
    <div className="flex h-[50px] min-h-[35px] w-full select-none gap-2 overflow-x-auto p-2 pb-0">
      {
        openFiles.map((file)=>(
           <span
                    key={file.id}
                    className={cn(
                        "flex w-fit cursor-pointer items-center rounded-t-md px-2 py-1 text-white",
                        { "bg-slate-700": file.id === activeFile?.id },
                    )}

                    onClick={() => {openFile(file.id)}}
                >
                    {/* <Icon
                        icon={getIconClassName(file.name)}
                        fontSize={22}
                        className="mr-2 min-w-fit"
                    /> */}
                    <p
                        className="flex-grow cursor-pointer overflow-hidden truncate"
                        title={file.name}
                    >
                        {file.name}
                    </p>
                    <IoClose
                        className="ml-3 inline rounded-md hover:bg-darkHover"
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation()
                          closeFile(file.id)
                        }}
                    />
                </span>
        ))
      }
    </div>
  )
}

export default FileTab