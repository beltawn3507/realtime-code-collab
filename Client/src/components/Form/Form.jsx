import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useAppStore from "../../store/appstore";
import logo from "../../assets/images/logo.png";

function Form() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createNewRoomId = () => {
    const id = uuidv4();
    setRoomId(id);
    toast.success("New Room ID generated");
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !roomId.trim()) {
      toast.error("Both Room ID and Username are required!");
      return;
    }

    // Example: Save to Zustand (uncomment if needed)
    // useAppStore.getState().setCurrentUser({ username, roomId });

    navigate(`/editor/${roomId}`);
  };

  return (
    <div className="flex w-full max-w-[500px] flex-col items-center justify-center p-4 sm:w-[500px] sm:p-8">
            <img src={logo} alt="Logo" className="w-full"/>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                <input
                    type="text"
                    name="roomId"
                    placeholder="Room Id"
                    value={roomId}
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={(e)=>setRoomId(e.target.value)}
                    // value={currentUser.roomId}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-2 w-full rounded-md bg-primary px-8 py-3 text-lg font-semibold text-black"
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
