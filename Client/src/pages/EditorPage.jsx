import { useNavigate, useLocation, useParams } from "react-router-dom";
import useappstore from "./../store/appstore";
import { usesocketstore } from "./../store/useSocketstore";
import { useEffect } from "react";
//import hooks as well as the components of this page
import useFullScreen from "../Hooks/useFullScreen";
import Splitter  from "../components/Splitter.jsx"
import SideBar from './../components/SideBar/SideBar';
import WorkSpace from './../components/WorkSpace/WorkSpace';


const EditorPage = () => {
  useFullScreen();
  const { currentuser, setcurrentuser, setstatus } = useappstore();
  const navigate = useNavigate();
  const socket = usesocketstore((state) => state.socket);
  const {initializesocket} =usesocketstore()
  const  roomId  = useParams().roomId;
  const location = useLocation();

  //now we use a useeffect that will check wether i have came with a proper login or not
  useEffect(() => {
  if (currentuser.username.length > 0) return;
  const username = location.state?.username;
  
  if (username === undefined) {
    navigate(`/`, {
      state: { roomId },
    });
  } else if (roomId) {
    const user = { username, roomId };
    setcurrentuser(user);
    
    const handleSocketAndJoin = async () => {
      let currentsocket = socket;
      
      if (!currentsocket) {
        await initializesocket();
        currentsocket = usesocketstore.getState().socket;
        console.log("socket details", currentsocket);
      }
      
      if (currentsocket) {
        currentsocket.emit("join_request", user);
      }
    };
    
    handleSocketAndJoin();
  }
}, [
    currentuser.username,
    location.state?.username,
    socket,
    navigate,
    roomId,
    setcurrentuser
  ]);

  if(useappstore.getState().status==="CONNECTION_FAILED"){
    //it will return a normal page
    // return<></>
  }

  return (
    <Splitter>
      <SideBar/>
      <WorkSpace/>
    </Splitter>
  )
};

export default EditorPage;
