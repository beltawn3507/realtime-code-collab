import React from 'react'
import usefilestore from '../../../store/usefilestore'
import { AiOutlineFileAdd } from "react-icons/ai";

function FileView() {
  const files = usefilestore((state) => state.fileStructure);
  const openFiles = usefilestore((state) => state.openFiles);
  const activeFile = usefilestore((state) => state.activeFile);
  const openFile = usefilestore((state) => state.openFile);
  const createFile=usefilestore((state)=>state.createFile)

  const handleClick = (file) => {
    openFile(file.id);
  };

  const handleCreateFile=()=>{
    const FileName = prompt("Please enter the file name");
    createFile(FileName);
    console.log(FileName); 
  }

  return (
    <div className="flex flex-col w-full bg-[#1e1e1e] text-white h-full overflow-y-auto select-none">
      <div className="px-3 py-2 text-xs uppercase tracking-widest text-gray-400 font-semibold border-b border-gray-700">
        Explorer
      </div>
      <AiOutlineFileAdd size={32} onClick={handleCreateFile}/>
      <div className="flex flex-col mt-1">
        {files.map((file) => {
          const isActive = activeFile?.id === file.id;

          return (
            <button
              key={file.id}
              onClick={() => handleClick(file)}
              className={`flex items-center w-full px-3 py-1.5 text-left text-sm truncate transition-colors duration-150 ${
                isActive
                  ? 'bg-[#373737] text-white font-medium'
                  : 'text-gray-300 hover:bg-[#2a2d2e] hover:text-white'
              }`}
            >
              <span className="truncate">{file.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FileView;
