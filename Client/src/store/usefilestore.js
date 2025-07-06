import { doesfileexist, files } from "../utils/file.js"
import { create } from "zustand"
import {v4 as uuidv4 } from "uuid"


const usefilestore = create((set, get) => {
  const initialOpenFiles = files.length>0 ? files : null;
  const initialActiveFile = files.length>0 ? files[0] : null;

  return {
    fileStructure: files,
    openFiles: initialOpenFiles,
    activeFile: initialActiveFile,

    setFileStructure: (fileStructure) => {
      set({
        fileStructure
      })
    },
    
    setOpenFiles: (openFiles) => {
      set({ openFiles })
    },

    setactiveFile: (file) => {
      set({ activeFile: file })
    },

    
    openFile:(fileId)=>{
      const requiredFile = get().fileStructure.find(file=>file.id===fileId);
      if(!requiredFile) return;
      const openfilesList = get().openFiles || [];
      const alreadyOpen=openfilesList.some(file=>file.id===fileId);
      if(!alreadyOpen){
        set({openFiles:[...openfilesList,requiredFile]})
      }
      set({activeFile:requiredFile});
    },

    closeFile:(id)=>{
      const requiredFile=get().fileStructure.find((file)=>file.id===id);
      if(!requiredFile) return;
      const openFileList=get().openFiles;
      const updatedFile=openFileList.filter((file)=>file.id !== id);
      set({openFiles:updatedFile});
     
      if(updatedFile.length > 0){
        const index=updatedFile.length-1;
        const lastFile = updatedFile[index];
        set({activeFile:lastFile});
      }
    },

    createFile:(fileName)=>{
      const id=uuidv4();
      const newFile={
        id,
        name:fileName,
        content:``
      }
      const fileStructure=get().fileStructure;
      const openFileList=get().openFiles;
      
      set({fileStructure:[...fileStructure,newFile]});
      set({openFiles:[...openFileList,newFile]});
      set({activeFile:newFile});
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
