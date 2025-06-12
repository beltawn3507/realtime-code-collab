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


// todo
// themes font size and language we have to take from settings context not done
// on useffect socket logic implementation left



function Editor() {
  const { users, currentuser } = useappstore();
  const { setactiveFile } = usefilestore();
  const language = "javascript";
  const activeFile = usefilestore((state) => state.activeFile);
  const { socket } = usesocketstore();
  const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0));
  const filteredUsers = useMemo(
    () => users.filter((u) => u.username !== currentuser.username),
    [users, currentuser]
  );
  const [extensions, setExtensions] = useState([]);

  //function oncodechange
  const handleChange = (code, view) => {
    // console.log(code);
    if (!activeFile) return;
    const file = { activeFile, content: code };
    setactiveFile(file);

    //socket logic to send data of the activefile code

    //scoket logic to send typing start and end
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
  }, []);

  return (
    <CodeMirror
      theme={editorThemes["Sublime"]}
      value={activeFile?.content}
      extensions={extensions}
      onChange={handleChange}
      minHeight="100%"
      maxWidth="100vw"
      style={{
        fontSize: 14 + "px",
        height: "100vh",
        position: "relative",
      }}
    />
  );
}

export default Editor;
