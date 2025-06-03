//this will consist of all the component of the sidebar which will be displayed in the 

import {create} from "zustand";
import useWindowDimensions from "../Hooks/useWindowDimensions";


export const useviewstore=create((set,get)=>{
   
    const {isMobile}=useWindowDimensions();
    //array of all the icons of the view
    const viewIcons={

    }

    const viewComponents={

    }
    


    return({
      activeView:[],
      setActiveView:(activeView)=>set({activeView:activeView}),

    
}))