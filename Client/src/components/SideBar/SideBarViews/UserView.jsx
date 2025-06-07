import toast from "react-hot-toast";
import useappstore from "../../../store/appstore";
import { usesocketstore } from "../../../store/useSocketstore";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go"
import { IoShareOutline } from "react-icons/io5"
import { LuCopy } from "react-icons/lu"
import Users from "../../Users/Users";

function UserView() {
  const { setstatus } = useappstore();
  const { socket } = usesocketstore();
  const navigate = useNavigate();

  const copyUrl = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to ClipBoard");
    } catch (error) {
      toast.error("Unable to copy URL to clipboard");
      console.log(error);
    }
  };

  const leaveRoom = () => {
    socket.disconnect();
    setstatus("DISCONNECTED");
    window.location.href = "/"
  };

  const shareUrl = async () => {
    const url = window.location.href;
    try {
      navigator.share({ url });
    } catch (error) {
      toast.error("Unable to share URL");
      console.log(error);
    }
    y;
  };

  return (
  <div className="flex flex-col p-6 bg-zinc-900 text-white rounded-2xl shadow-md max-w-md mx-auto">
    <h1 className="text-2xl font-semibold text-center mb-4 border-b border-zinc-700 pb-2">Users</h1>
    
    {/* List of connected users */}
    <Users />

    <div className="flex flex-col items-center gap-6 pt-6">
      <div className="flex w-full gap-4">
        {/* Share URL button */}
        <button
          className="flex flex-grow items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors p-3 text-white shadow-sm"
          onClick={shareUrl}
          title="Share Link"
        >
          <IoShareOutline size={24} />
        </button>

        {/* Copy URL button */}
        <button
          className="flex flex-grow items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors p-3 text-white shadow-sm"
          onClick={copyUrl}
          title="Copy Link"
        >
          <LuCopy size={22} />
        </button>

        {/* Leave room button */}
        <button
          className="flex flex-grow items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 transition-colors p-3 text-white shadow-sm"
          onClick={leaveRoom}
          title="Leave room"
        >
          <GoSignOut size={22} />
        </button>
      </div>
    </div>
  </div>
);

}

export default UserView;
