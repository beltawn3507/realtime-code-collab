import { doesfileexist, findparentdirectory, getfilebyid, initialFileStructure } from "../utils/file.js"
import { create } from "zustand"


const usefilestore = create((set, get) => {
  const initialOpenFiles = initialFileStructure.children ? structuredClone(initialFileStructure.children) : []
  const initialActiveFile = initialOpenFiles.length > 0 ? initialOpenFiles[0] : null;

  return {
    fileStructure: initialFileStructure,
    openFiles: initialOpenFiles,
    activeFile: initialActiveFile,

    setFileStructure: (fileStructure) => {
      const initialOpenFiles = fileStructure.children ? structuredClone(fileStructure.children) : []
      set({
        fileStructure,
        // openFiles: initialOpenFiles,
        activeFile: initialOpenFiles[0] || null
      })
    },
    
    // TODO Multiple Coding Workspace
    // setOpenFiles: (openFiles) => {
    //   set({ openFiles })
    // },

    setactiveFile: (file) => {
      set({ activeFile: file })
    },

    handleFileUpdate:(code)=>{
      const activefile=get().activeFile;
      const updatefile={...activefile,content:code}
      get().setactiveFile(updatefile)
    },

    handlereqCodeSync:(socket)=>{
      const activefile=get().activeFile;
      const code=activefile.content;
      socket.emit("file_sync",code);
    },

    setSocketListeners:(socket)=>{
      socket.on("file_sync",get().handleFileUpdate);
      socket.on("req_code_sync",()=>get().handlereqCodeSync(socket))

      return()=>{
        socket.off("file_sync");
      }
    }

  }
})

export default usefilestore
