import { doesfileexist, files } from "../utils/file.js";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { usesocketstore } from "./useSocketstore.js";


const usefilestore = create((set, get) => {
  const initialOpenFiles = files.length > 0 ? files : [];
  const initialActiveFile = files.length > 0 ? files[0] : null;
  

  return {
    fileStructure: files,
    openFiles: initialOpenFiles,
    activeFile: initialActiveFile,

    setFileStructure: (fileStructure) => {
      set({
        fileStructure,
      });
    },

    setOpenFiles: (openFiles) => {
      set({ openFiles });
    },

    setactiveFile: (file) => {
      set({ activeFile: file });
    },

    openFile: (fileId) => {
      const requiredFile = get().fileStructure.find(
        (file) => file.id === fileId
      );
      if (!requiredFile) return;
      const openfilesList = get().openFiles || [];
      const alreadyOpen = openfilesList.some((file) => file.id === fileId);
      if (!alreadyOpen) {
        set({ openFiles: [...openfilesList, requiredFile] });
      }
      set({ activeFile: requiredFile });
    },

    closeFile: (id) => {
      const requiredFile = get().fileStructure.find((file) => file.id === id);
      if (!requiredFile) return;
      const openFileList = get().openFiles;
      const updatedFile = openFileList.filter((file) => file.id !== id);
      set({ openFiles: updatedFile });

      if (updatedFile.length > 0) {
        const index = updatedFile.length - 1;
        const lastFile = updatedFile[index];
        set({ activeFile: lastFile });
      }
    },

    createFile: (fileName) => {
      const id = uuidv4();
      const newFile = {
        id,
        name: fileName,
        content: ``,
      };
      const fileStructure = get().fileStructure;
      const openFileList = get().openFiles;

      set({ fileStructure: [...fileStructure, newFile] });
      set({ openFiles: [...openFileList, newFile] });
      set({ activeFile: newFile });
    },

    renameFile: (fileId, newName,socket) => {
      const fileStruct = get().fileStructure;
      const updatedfile = fileStruct.map((file) => {
        if (file.id === fileId) {
          return { ...file, name: newName };
        }

        return file;
      });
      get().closeFile(fileId);
      set({ fileStructure: updatedfile });
      get().openFile(fileId);
      socket.emit("rename_file",{fileId,newName});
    },

    deleteFile: (fileId,socket) => {
      const fileStruct = get().fileStructure;
      const updatedFile = fileStruct.filter((file) => {
        return file.id !== fileId;
      });
      get().closeFile(fileId);
      set({
        fileStructure: updatedFile,
      });
      socket.emit("delete_file",fileId);
    },

    

    handleFileUpdate: (fileStrucutre) => {
      console.log("handlefilesync" , fileStrucutre)
      const openIds = get().openFiles.map((f) => f.id);
      const newOpens = fileStrucutre.filter((f) => openIds.includes(f.id));
      const activeId = get().activeFile?.id;
      const newActive =
        fileStrucutre.find((f) => f.id === activeId)  || null;
      set({ fileStructure: fileStrucutre, openFiles: newOpens, activeFile: newActive });
    },

    handlereqCodeSync: (socket) => {
      const fileStructure = get().fileStructure;
      console.log("intiated file_sync",fileStructure)
      socket.emit("file_sync", fileStructure);
    },

    handleRename:({fileId,newName})=>{
      const fileStruct = get().fileStructure;
      const updatedfile = fileStruct.map((file) => {
        if (file.id === fileId) {
          return { ...file, name: newName };
        }

        return file;
      });
      get().closeFile(fileId);
      set({ fileStructure: updatedfile });
      get().openFile(fileId);
    },

    handleDelete:(fileId)=>{
      const fileStruct = get().fileStructure;
      const updatedFile = fileStruct.filter((file) => {
        return file.id !== fileId;
      });
      get().closeFile(fileId);
      set({
        fileStructure: updatedFile,
      });
    },



    setSocketListeners: (socket) => {
      socket.on("file_sync", get().handleFileUpdate);
      socket.on("req_file_sync", () => get().handlereqCodeSync(socket));
      socket.on("rename_file",get().handleRename);
      socket.on("delete_file",get().handleDelete)

      return () => {
        socket.off("file_sync",);
        socket.off("req_file_sync");
        socket.off("rename_file");
        socket.off("delete_file");
      };
    },
  };
});

export default usefilestore;
