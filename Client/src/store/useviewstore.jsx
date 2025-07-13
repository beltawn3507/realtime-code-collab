//this will consist of all the component of the sidebar which will be displayed in the
import { IoSettingsOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { PiChats, PiPlay, PiUsers } from "react-icons/pi";
import { create } from "zustand";
import { RiRobot2Fill } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import FIleView from "../components/SideBar/SideBarViews/FIleView";
import ChatView from "../components/SideBar/SideBarViews/ChatView";
import AiHelpView from "../components/AiHelp/AiHelp";
import UserView from "../components/SideBar/SideBarViews/UserView";
import SettingsView from "../components/SideBar/SideBarViews/SettingsView";
import RunView from "../components/SideBar/SideBarViews/RunView";

const isMobileInit = typeof window !== "undefined" && window.innerWidth <= 768;

export const useviewstore = create((set, get) => ({
  activeView: "RUN",
  isSideBarOpen: false,

  //consists components of different view shown in sidebar
  viewComponents: {
    FILE:<FIleView/>,
    CHAT:<ChatView/>,
    ByteBot:<AiHelpView/>,
    RUN:<RunView/>,
    Users:<UserView/>,
    Settings:<SettingsView/>
  },
  //consists of different icons of different view shown in didebar
  viewIcons: {
    FILE:<GoFileDirectory size={30} />,
    CHAT: <IoChatbubblesOutline size={30}/>,
    ByteBot:<RiRobot2Fill size={32}/>,
    RUN:<PiPlay size={32}/>,
    USERS:<PiUsers size={32}/>,
    SETTINGS:<IoSettingsOutline size={32} />
  },

  setActiveView: (view) => set({ activeView: view }),
  setIsSidebarOpen: (open) => set({ isSideBarOpen: open }),
}));
