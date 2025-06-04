import { useviewstore } from "../../../store/useviewstore"
import { Tooltip } from "react-tooltip"
import { useState } from "react";
import { buttonStyles, tooltipStyles } from "../tooltipstyles";

const SideBarButton=({viewName,icon})=>{
  

    //the logic of the button is if we click on any other other button then the active view then it will
    const {activeView
        ,setActiveView
        ,setIsSidebarOpen} = useviewstore();
    
    const isNewMessage=true;//later will change when chat is implemented
    const [showTooltip, setShowTooltip] = useState(true);
    //click logic 
    const handleViewClick=(viewName)=>{
     if(viewName==useviewstore.getState().activeView){
        setIsSidebarOpen(!useviewstore.getState().isSideBarOpen)
        console.log("sidebarstate opposite",useviewstore.getState().isSideBarOpen);
     }else{
        setActiveView(viewName);
        setIsSidebarOpen(true);
     }
    }

    return (
        <div className="relative flex flex-col items-center">
            <button
             onClick={()=>handleViewClick(viewName)}
             onMouseEnter={() => setShowTooltip(true)}
            className={`${buttonStyles.base} ${buttonStyles.hover}`}
            {...(showTooltip && {
                "data-tooltip-id":`tooltip-${viewName}`,
                "data-tooltip-content": viewName,
            })}
            >
                {/* icon shown here */}
                <div className="flex items-center justify-center">{icon}</div>
                {/* if new message is there then show a dott button */}
                {viewName === "CHAT" && isNewMessage && (
                    <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
                )}
            </button>

            {showTooltip && (
                <Tooltip
                    id={`tooltip-${viewName}`}
                    place="right"
                    offset={25}
                    className="!z-50"
                    style={tooltipStyles} 
                    noArrow={false}
                    positionStrategy="fixed"
                    float={true}
                />
            )}
        </div>
    )
}

export default SideBarButton