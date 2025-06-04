import { useState } from "react";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import useappstore from "../../store/appstore";
import { useviewstore } from "../../store/useviewstore";
import { usesocketstore } from "./../../store/useSocketstore";
import SideBarButton from "../SideBar/SideBarViews/SideBarButton"
import useChatSocketListener from './../chats/usechatSocketListener';

function SideBar() {
  
  const {
    activeView,
    viewComponents,
    viewIcons,
    setIsSidebarOpen,
  } = useviewstore();
  const isSideBarOpen=useviewstore((state)=>state.isSideBarOpen)

  //coding or drawing mode
  const { activitystate, setactivitystate } = useappstore();
  const { socket } = usesocketstore();
  const { isMobile } = useWindowDimensions();
  const [showTooltip, setShowTooltip] = useState(true);

  //function which will switch up from coding to drawing or vice versa

  return (
    <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
      <div
        className={
          "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 self-end overflow-hidden border-t border-darkHover bg-dark p-2 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4"
        }
      >
        <SideBarButton viewName="FILE" icon={viewIcons["FILE"]} />
        <SideBarButton viewName="CHAT" icon={viewIcons["CHAT"]} />
      </div>
      <div
        className="absolute left-0 top-0 z-20 w-full flex-col bg-dark md:static md:min-w-[300px] display:none"
        style={isSideBarOpen ? {} : { display: "none" }}
        
      >
        {/* Render the active view component */}
        {viewComponents[activeView]}
      </div>
    </aside>
  );
}

export default SideBar;
