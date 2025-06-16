import { create } from "zustand";
import usefilestore from "./usefilestore";
import toast from "react-hot-toast";
import axiosinstance from "../api/pistonapi";

const userunstore = create((set, get) => {

  const initial = {
    availableLanguage: [],
  }

  const setavailableLangauge = async () => {
    try {
      const availableLanguage = await axiosinstance.get("/runtimes");
      set({ availableLanguage });
    } catch (error) {
      toast.error("Failed to fetch supported languages");
      console.log(error);
    }
  };

  setavailableLangauge();

  return {
    input: "",
    setinput: (input) => set({ input }),
    output: "",
    setoutput: (output) => set({ output }),
    ...initial,
    setavailableLangauge,
    isRunning:false,
    setisRunning:(isRunning)=>set({isRunning}),
    selectedLanguage:{
        language:"",
        versions:"",
        aliases:[]
    },
    setselectedLanguage:(selectedLanguage)=>set({selectedLanguage}),
    runCode:async()=>{
        try {
            const activeFile=usefilestore.getState().activeFile
            if(!get().selectedLanguage){
                return toast.error("Please Select a Language")
            }else if(!activeFile){
                return toast.error("No active file is opened")
            }
            else{
                toast.loading("Running Code")
            }

            get().setisRunning(true);
            const {language,version} = get().selectedLanguage

            const response = await axiosinstance.post("/execute", {
                language,
                version,
                files: [{ name: activeFile.name, content: activeFile.content }],
                stdin: get().input,
            });
            //setoutput will be done later
            if (response.data.run.stderr) {
                get().setoutput(response.data.run.stderr)
            } else {
                get().setoutput(response.data.run.stdout)
            }

            console.log(response)
            get().setisRunning(false);
            toast.dismiss();
        } catch (error) {
            console.log(error);
            get().setisRunning(false)
            toast.dismiss()
            toast.error("Failed to run the code")
        }
    },



  };
});

export default userunstore
