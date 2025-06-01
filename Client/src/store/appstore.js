import {create} from "zustand"

const useappstore=create ((set)=>({
    //user array it will conatain all the user data
    users:[],
    setUsers:(users)=>set({users:users}),
    
    // INITIAL = "initial",
    // CONNECTING = "connecting",
    // ATTEMPTING_JOIN = "attempting-join",
    // JOINED = "joined",
    // CONNECTION_FAILED = "connection-failed",
    // DISCONNECTED = "disconnected",
    status:"initial",
    setstatus:(status)=>set({status:status}),

    currentuser:{username:"",roomId:""},
    setcurrentuser:(user)=>set({currentuser:user}),
    
    //coding or drawing
    activitystate:"coding",
    setactivitystate:(state)=>set({activitystate:state}),

    drawingdata:null,
    setDrawingdata:(data)=>set({drawingdata:data})

}))

export default useappstore