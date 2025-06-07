//this will consist of all the component of the sidebar which will be displayed in the
import { IoSettingsOutline } from "react-icons/io5";
import { LuFiles, LuSparkles } from "react-icons/lu";
import { PiChats, PiPlay, PiUsers } from "react-icons/pi";
import { create } from "zustand";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import FIleView from "../components/SideBar/SideBarViews/FIleView";
import ChatView from "../components/SideBar/SideBarViews/ChatView";
import AiHelpView from "../components/AiHelp/AiHelp";
import UserView from "../components/SideBar/SideBarViews/UserView";

const isMobileInit = typeof window !== "undefined" && window.innerWidth <= 768;

export const useviewstore = create((set, get) => ({
  activeView: "FILE",
  isSideBarOpen: !isMobileInit,

  //consists components of different view shown in sidebar
  viewComponents: {
    FILE: <FIleView />,
    CHAT:<ChatView/>,
    ByteBot:<AiHelpView/>,
    Users:<UserView/>
  },
  //consists of different icons of different view shown in didebar
  viewIcons: {
    FILE: <LuFiles size={28} />,
    CHAT: <PiChats size={30}/>,
    ByteBot:<LuSparkles size={32}/>,
    USERS:<PiUsers size={32}/>
  },

  setActiveView: (view) => set({ activeView: view }),
  setIsSidebarOpen: (open) => set({ isSideBarOpen: open }),
}));
