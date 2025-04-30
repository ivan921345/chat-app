const GroupCard = ({ group, handleSetSelectedGroup }) => {
  return (
    <button
      onClick={() => handleSetSelectedGroup(group)}
      className="min-h-15 flex justify-center w-[100%] btn btn-xs bg-transparent sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl mb-3 p-0 md:flex md:justify-start"
    >
      <div className="relative flex items-center justify-center w-[50px] h-[50px]">
        <img
          src={group.users[0].profilePic || "/avatar.png"}
          className={`${
            group.users.length !== 1
              ? "size-8 left-0 top-0 absolute"
              : "size-12"
          }  rounded-full`}
          alt=""
        />
        {group.users.length !== 1 && (
          <div className="flex items-center justify-center">
            <img
              src={group.users?.[1]?.profilePic || "/avatar.png"}
              className="size-8 right-0 bottom-0 absolute rounded-full"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="hidden flex-col  items-baseline lg:flex">
        <div className="font-medium truncate">{group.title}</div>
        <div className="text-sm text-zinc-400">
          {group.users[0].fullName}, {group.users?.[1]?.fullName}
        </div>
      </div>
    </button>
  );
};

export default GroupCard;
