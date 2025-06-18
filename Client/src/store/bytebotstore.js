import pollinationinstance from "../api/pollinationapi/pollinationAPI";
import {create} from "zustand";
import toast from "react-hot-toast";

//input and output to bytebot
const usebytebot = create((set, get) => ({
  input: "",
  output: "",
  model:"",
  setmodelname:(modelname)=>set({model:modelname}),
  setinput: (input) => set({ input }),
  setoutput: (output) => set({ output }),
  isRunning: false,
  setisRunning: (isRunning) => set({ isRunning }),
  generateCode: async () => {
    try {
      // console.log("generate code triggered")
      toast.loading("Generating Code..");
      get().setisRunning(true);
      // console.log("model being used ",get().model)
      const response =await pollinationinstance.post("/", {
        messages: [
          {
            role: "system",
            content:
              "You are a code generator copilot for project named Byte Bot. Generate code based on the given prompt without any explanation. Return only the code, formatted in Markdown using the appropriate language syntax (e.g., js for JavaScript, py for Python). Do not include any additional text or explanations. If you don't know the answer, respond with 'I don't know'.You can also Provide with time complexity and Space Complexity if user asked fot it in Prompt.",
          },
          {
            role: "user",
            content: get().input,
          },
        ],
        model: get().model,
        private: true,
      });

      if (response.data) {
        toast.success("Code generated successfully");
        // console.log("code genrated successfully")
        // console.log(response.data);
        const code = response.data;
        if (code) get().setoutput(code);
      }else{
        // console.log("code failed to get any response")
      }
      get().setisRunning(false);
      toast.dismiss();
    } catch (error) {
      // console.log(error);
      get().setisRunning(false);
      toast.dismiss();
      toast.error("Failed to generate the code");
    }
  }

}));

export default usebytebot
