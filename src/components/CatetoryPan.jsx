import AvatarGroup from "react-avatar-group";
// import icon from "../assets/icons/play.png";

export default function CategoryPan() {
  return (
    <div className="w-[140rem] sm:w-[72rem] lg:w-[30rem] bg-[#262626] flex flex-col shrink-0 items-start gap-[8rem]">
      <div className="flex flex-col items-start gap-[2rem]">
        <span className="text-white text-left text-[3rem] leading-[3.2rem]">
          #American History and Geography
        </span>
        <AvatarGroup
          avatars={[
            "James",
            "Amy",
            "Will",
            "Haming",
            "Alexander" /* or IAvatar objects */,
          ]}
          initialCharacters={1}
          max={3}
          size={60}
          displayAllOnHover
          shadow={2}
          className="text-[2rem]"
        />
        <span className="text-white text-left text-[2rem] focus:outline-none">
          Followed by {} people
        </span>
        <button className="bg-white hover:bg-gray-200 text-[2rem] text-black focus:outline-none">
          Follow
        </button>
      </div>

      <div className="flex flex-col items-start gap-[2rem]">
        <span className="text-white text-left text-[3rem] leading-[3.2rem]">
          #Psychology
        </span>
        <span className="text-white text-left text-[2rem] focus:outline-none">
          Followed by {} people
        </span>
        <button className="bg-white hover:bg-gray-200 text-[2rem] text-black focus:outline-none">
          Follow
        </button>
      </div>
    </div>
  );
}
