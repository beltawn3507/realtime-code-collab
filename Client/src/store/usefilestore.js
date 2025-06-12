import { doesfileexist, findparentdirectory, getfilebyid, initialFileStructure } from "../utils/file.js"
import { create } from "zustand"

const usefilestore = create((set, get) => {
  const initialOpenFiles = initialFileStructure.children ? structuredClone(initialFileStructure.children) : []
  const initialActiveFile = initialOpenFiles.length > 0 ? initialOpenFiles[0] : null

  return {
    fileStructure: initialFileStructure,
    openFiles: initialOpenFiles,
    activeFile: initialActiveFile,

    setFileStructure: (fileStructure) => {
      const initialOpenFiles = fileStructure.children ? structuredClone(fileStructure.children) : []
      set({
        fileStructure,
        openFiles: initialOpenFiles,
        activeFile: initialOpenFiles[0] || null
      })
    },

    setOpenFiles: (openFiles) => {
      set({ openFiles })
    },

    setactiveFile: (file) => {
      set({ activeFile: file })
    },
  }
})

export default usefilestore
