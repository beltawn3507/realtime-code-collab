import React from "react";
import useappstore from "../../store/appstore";
import Avatar from "boring-avatars";

function Users() {
  const { users } = useappstore();

  return (
    <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto py-4 px-2">
      <div className="flex h-full w-full flex-wrap items-start justify-center gap-4">
        {users.map((user) => {
          return <User key={user.socketId} user={user} />;
        })}
      </div>
    </div>
  );
}

const User = ({ user }) => {
  const { username, status } = user;
  const title = `${username} - ${status === "ONLINE" ? "online" : "offline"}`;

  return (
    <div
      className="relative flex w-[110px] flex-col items-center gap-2 rounded-xl bg-zinc-800 px-3 py-4 shadow-md transition hover:bg-zinc-700"
      title={title}
    >
      <Avatar name={username} size="48" variant="beam" round="10px" />
      <p className="text-sm text-center font-medium text-white break-words line-clamp-2">
        {username}
      </p>
      <div
        className={`absolute top-2 right-2 h-3 w-3 rounded-full border border-zinc-900 ${
          status === "ONLINE" ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
    </div>
  );
};

export default Users;
