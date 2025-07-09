import CodeMirror, { scrollPastEnd } from "@uiw/react-codemirror";
import { color } from "@uiw/codemirror-extensions-color";
import usefilestore from "../../store/usefilestore";
import { usesocketstore } from "../../store/useSocketstore";
import useappstore from "./../../store/appstore";
import { editorThemes } from "../../resources/theme";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import usesettingstore from "../../store/settingstore";


// todo
// themes font size and language we have to take from settings context not done
// on useffect socket logic implementation left



function Editor() {
  const fontSize = usesettingstore((state) => state.fontSize);
  const language = usesettingstore((state) => state.language);
  const theme = usesettingstore((state) => state.theme);
  const { users, currentuser } = useappstore();
  const { setactiveFile } = usefilestore();
  const activeFile = usefilestore((state) => state.activeFile);
  const  socket  = usesocketstore((state)=>state.socket);
  const setupSocketListeners=usefilestore((state)=>state.setSocketListeners)
  const fileStructure = usefilestore((state)=>state.fileStructure);
  const setFileStructure = usefilestore((state)=>state.setFileStructure)

  const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0));

  const filteredUsers = useMemo(
    () => users.filter((u) => u.username !== currentuser.username),
    [users, currentuser]
  );
  const [extensions, setExtensions] = useState([]);

  //function oncodechange
  const handleChange = (code) => {
    if (!activeFile) return;
    const file = { ...activeFile, content: code };
    const fileId=file.id;
    
    
    const updatedFileStructre=fileStructure.map((currfile)=>{
      return currfile.id===fileId ? {...currfile,content:code} : currfile;
    });
    // console.log(fileStructure)
    setFileStructure(updatedFileStructre);
    // console.log(code);
    setactiveFile(file);
    // console.log("socket file sync initiated",socket);
    socket.emit("file_sync",code);
  };

  useEffect(() => {
    const extensions = [color, scrollPastEnd(), hyperLink];
    const langExt = loadLanguage(language.toLowerCase());
    if (langExt) {
      extensions.push(langExt);
    } else {
      toast.error(
        "Syntax highlighting is unavailable for this language. Please adjust the editor settings; it may be listed under a different name.",
        {
          duration: 5000,
        }
      );
    }

    setExtensions(extensions);
  }, [language]);

  useEffect(() => {
    if(!socket) return ;
    const cleanup = setupSocketListeners(socket)
    return cleanup // Automatically cleans up listeners
  }, [socket, setupSocketListeners])

  return (
    <CodeMirror
      theme={editorThemes[theme]}
      value={activeFile?.content}
      extensions={extensions}
      onChange={handleChange}
      minHeight="100%"
      maxWidth="100vw"
      style={{
        fontSize: fontSize + "px",
        height: "100vh",
        position: "relative",
      }}
    />
  );
}

export default Editor;
