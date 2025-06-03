//this will tell us window dimensions constantly using eventlistener
import { useState,useEffect } from "react";

const useWindowDimensions=()=>{
    const [windowDimensions,setWindowDimensions]=useState({
        width:window.innerWidth,
        height:window.innerHeight,
    });

    const [isMobile,setIsMobile]=useState(window.innerWidth<768);

    useEffect(()=>{
      const updateWindowDimension=()=>{
        setIsMobile(window.innerWidth<768);
        setWindowDimensions({
            width:window.innerWidth,
            height:window.innerHeight
        })
      }
      window.addEventListener('resize',updateWindowDimension);
      return () => {
            window.removeEventListener("resize", updateWindowDimension);
        };
    },[]);
    
    return{...windowDimensions,isMobile}

}

export default useWindowDimensions;