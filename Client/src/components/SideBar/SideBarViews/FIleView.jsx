import React from "react";
import usefilestore from "../../../store/usefilestore";
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdDelete, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { usesocketstore } from "../../../store/useSocketstore";

function FileView() {
  const files = usefilestore((state) => state.fileStructure);
  const openFiles = usefilestore((state) => state.openFiles);
  const activeFile = usefilestore((state) => state.activeFile);
  const openFile = usefilestore((state) => state.openFile);
  const createFile = usefilestore((state) => state.createFile);
  const renameFile = usefilestore((state) => state.renameFile);
  const deleteFile=usefilestore((state)=>state.deleteFile);
  const socket=usesocketstore((state)=>state.socket);

  const handleClick = (file) => {
    openFile(file.id);
  };

  const handleCreateFile = () => {
    const FileName = prompt("Please enter the file name");
    if (FileName === null || FileName.trim() === "") {
      alert("Invalid file name!");
      return;
    }
    createFile(FileName,socket);
  };

  const handlerename = (file) => {
    const newName = prompt("Enter new name");
    if (newName === null || newName.trim() === "") {
      alert("Invalid file name!");
      return;
    }
    renameFile(file.id, newName,socket);
  };

  const handleDelete=(file)=>{
    deleteFile(file.id,socket);
  }

  return (
    <div className="flex flex-col w-full bg-[#1e1e1e] text-white h-full overflow-y-auto select-none border-r border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Explorer</span>
        <AiOutlineFileAdd
          size={20}
          onClick={handleCreateFile}
          className="text-gray-400 hover:text-white cursor-pointer transition-colors"
        />
      </div>

      {/* File List */}
      <div className="flex flex-col mt-1 px-1 space-y-1">
        {files.map((file) => {
          const isActive = activeFile?.id === file.id;

          return (
            <div key={file.id}>
              <button
                onClick={() => handleClick(file)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-all duration-150 group
                ${isActive ? "bg-[#2e2e2e] text-white font-medium" : "text-gray-300 hover:bg-[#2a2d2e] hover:text-white"}`}
              >
                <span className="truncate">{file.name}</span>
                <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <MdOutlineDriveFileRenameOutline
                    size={18}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlerename(file);
                    }}
                    className="hover:text-blue-400"
                  />
                  <MdDelete
                    size={18}
                    className="hover:text-red-400 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file);
                    }}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileView;
