import Split from "react-split";
import useLocalStorage from "../Hooks/useLocalStorage";
import useWindowDimensions from "./../Hooks/useWindowDimensions";
import {useviewstore} from "../store/useviewstore"
//import zustand store which tells me if how the screen should look

//children will be passed in the splitter
const Splitter = ({ children }) => {
  const isSideBarOpen = useviewstore((state) => state.isSideBarOpen)
  const { isMobile, width } = useWindowDimensions();
  const { setItem, getItem } = useLocalStorage();

  const getGutter = () => {
    const gutter = document.createElement("div");
    gutter.className = "h-full cursor-e-resizer hidden md:block";
    gutter.style.backgroundColor = "#e1e1ffb3";
    return gutter;
  };

  const getSizes = () => {
    if (isMobile) return [0, width];
    const savedSizes = getItem("editorSizes");
    let sizes = [35, 65];
    if (savedSizes) {
      sizes = JSON.parse(savedSizes);
    }
    return isSideBarOpen ? sizes : [0, width];
  };

  const getMinSizes = () => {
    if (isMobile) return [0, width];
    return isSideBarOpen ? [350, 350] : [50, 0];
  };

  const getMaxSizes = () => {
    if (isMobile) return [0, Infinity];
    return isSideBarOpen ? [Infinity, Infinity] : [0, Infinity];
  };

  const handleGutterDrag = (sizes) => {
    setItem("editorSizes", JSON.stringify(sizes));
  };

  const getGutterStyle = () => ({
    width: "7px",
    display: isSideBarOpen && !isMobile ? "block" : "none",
  });

  return (
    <Split
      sizes={getSizes()}
      minSize={getMinSizes()}
      gutter={getGutter}
      maxSize={getMaxSizes()}
      dragInterval={1}
      direction="horizontal"
      gutterAlign="center"
      cursor="e-resize"
      snapOffset={30}
      gutterStyle={getGutterStyle}
      onDrag={handleGutterDrag}
      className="flex h-screen min-h-screen max-w-full items-center justify-center overflow-hidden"
    >
      {children}
    </Split>
  );
};


export default Splitter;
