import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import logo from "../../assets/images/logo.png";
import useappstore from "../../store/appstore";
import { usesocketstore } from "./../../store/useSocketstore";

function Form() {
  const location = useLocation();
  const status = useappstore((state) => state.status);
  const { currentuser, setcurrentuser, setstatus } = useappstore();
  const socket = usesocketstore((state) => state.socket);
  const initializesocket = usesocketstore((state) => state.initializesocket);

  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createNewRoomId = () => {
    const id = uuidv4();
    setRoomId(id);
    toast.success("New Room ID generated");
  };

  const validateForm = () => {
    if (username.trim().length === 0) {
      toast.error("Enter the Username");
      return false;
    }
    if (roomId.trim().length === 0) {
      toast.error("RoomId not provided");
      return false;
    }
    if (username.trim().length < 3) {
      toast.error("Username should be more than 3 characters");
      return false;
    }
    if (roomId.trim().length == 0) {
      toast.error("RoomId should be more than 5 characters");
      return false;
    }
    return true;
  };

  //it will first check if the form is validated or not and then it will emit on the scoket server
  // if scoket is nott initalized it will initialize it first
  // it will also set the zustand currentuser to
  const handleSubmit = async (e) => {
    // console.log("joined button pressed")
    e.preventDefault();
    const user = { username, roomId };
    if (status == "ATTEMPTING_JOIN") return;
    if (!validateForm()) return;
    let currentsocket = socket;
    if (!socket) {
      await initializesocket();
      currentsocket = usesocketstore.getState().socket;
    } //now socket will be defined
    setcurrentuser(user);
    setstatus("ATTEMPTING_JOIN");
    // console.log("join request sent ", currentsocket);
    currentsocket?.emit("join_request", user);
  };

  //Due to this useffect whenever someone is trying to join by a link provided 
  // we will check wether it has gone  through a normal join process or not and if not we will redirect it to this page ie home page
  // but we will use location.state.roomid to store its roomid and it will automatically fill the form
  useEffect(() => {
    if (roomId.length > 0) return;
    if (location.state?.roomId) {
      setRoomId(location.state.roomId);
      if (username.length === 0) {
        toast.success("Enter your username");
      }
    }
  }, [setRoomId,roomId,location.state?.roomId]);

  useEffect(() => {
    if (status === "JOINED") {
      navigate(`/editor/${roomId}`, {
        state: { username },
      });
    }
  }, [status, navigate, roomId, username]);

  return (
    <div className="flex w-full max-w-[500px] flex-col items-center justify-center p-4 sm:w-[500px] sm:p-8">
      <img src={logo} alt="Logo" className="w-full" />
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <input
          type="text"
          name="roomId"
          placeholder="Room Id"
          value={roomId}
          className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
          onChange={(e) => setRoomId(e.target.value)}
          // value={currentUser.roomId}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 w-full rounded-md bg-red-500 px-8 py-3 text-lg font-semibold text-white"
        >
          Join
        </button>
      </form>
      <button
        className="cursor-pointer select-none underline"
        onClick={createNewRoomId}
      >
        Generate Unique Room Id
      </button>
    </div>
  );
}

export default Form;
