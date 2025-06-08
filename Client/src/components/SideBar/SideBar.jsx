import { useState } from "react";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import useappstore from "../../store/appstore";
import { useviewstore } from "../../store/useviewstore";
import { usesocketstore } from "./../../store/useSocketstore";
import SideBarButton from "../SideBar/SideBarViews/SideBarButton"
import useChatSocketListener from './../chats/usechatSocketListener';
import { tooltipStyles,buttonStyles } from "./tooltipstyles";
import { IoCodeSlash } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { LuPencilLine } from "react-icons/lu";

function SideBar() {
  
  const {
    activeView,
    viewComponents,
    viewIcons,
    setIsSidebarOpen,
  } = useviewstore();
  const isSideBarOpen=useviewstore((state)=>state.isSideBarOpen)

  //coding or drawing mode
  const { setactivitystate } = useappstore();
  const activityState=useappstore((state)=>state.activitystate)
  const { socket } = usesocketstore();
  const { isMobile } = useWindowDimensions();
  const [showTooltip, setShowTooltip] = useState(true);

  //function which will switch up from coding to drawing or vice versa
   const changeState = () => {
        setShowTooltip(false)
        if (activityState === "coding") {
            setactivitystate("drawing")
            socket.emit(
              "request_drawing"
            )
        } else {
            setactivitystate("coding")
        }

        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

  return (
    <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
      <div
        className={
          "fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-4 self-end overflow-hidden border-t border-darkHover bg-dark p-2 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4"
        }
      >
        <SideBarButton viewName="FILE" icon={viewIcons["FILE"]} />
        <SideBarButton viewName="CHAT" icon={viewIcons["CHAT"]} />
        <SideBarButton viewName="ByteBot" icon={viewIcons["ByteBot"]} />
        <SideBarButton viewName="Users" icon={viewIcons["USERS"]} />


        <div className="flex h-fit items-center justify-center">
                    <button
                        className="justify-cente flex items-center  rounded p-1.5 transition-colors duration-200 ease-in-out hover:bg-[#3D404A]"
                        onClick={changeState}
                        onMouseEnter={() => setShowTooltip(true)}
                        data-tooltip-id="activity-state-tooltip"
                        data-tooltip-content={
                            activityState === "coding"
                                ? "Switch to Drawing Mode"
                                : "Switch to Coding Mode"
                        }
                    >
                        {activityState === "coding"? (
                            <IoCodeSlash size={30} />
                        ) : (
                            <LuPencilLine size={30} />
                        )}
                    </button>
                    {showTooltip && (
                        <Tooltip
                            id="activity-state-tooltip"
                            place="right"
                            offset={15}
                            className="!z-50"
                            style={tooltipStyles}
                            noArrow={false}
                            positionStrategy="fixed"
                            float={true}
                        />
                    )}
                </div>
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
