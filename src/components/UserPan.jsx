import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function UserPan({ all, saved, showAll }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      setUserData(jwtDecode(accessToken));
    }
  }, []);

  return (
    <div className="w-[140rem] sm:w-[72rem] lg:w-[30rem] bg-[#262626] flex flex-col items-start gap-[8rem] lg:gap-[2rem]">
      {userData && (
        <img
          src={userData.photoURL}
          alt="User avatar"
          className=" rounded-full object-cover"
        />
      )}
      {userData && (
        <span className="text-white text-left text-[2.5rem] font-bold">
          {userData.displayName}
        </span>
      )}
      <p className="text-white text-left text-[1.5rem]">
        The Indian economy has shown accelerated economic growth of ver 8% in
        the final months of the year, driven by strong private investments and a
        pickup in the services sector.
      </p>
      <button className="bg-white text-black text-[2rem] font-semibold focus:outline-none">
        Settings
      </button>
      <span
        onClick={() => showAll(false)}
        className="w-full text-white hover:text-gray-300 text-left text-[2rem] font-bold border-b border-white cursor-pointer"
      >
        Saved Lurnies ({saved})
      </span>
      <span
        onClick={() => showAll(true)}
        className="w-full text-white hover:text-gray-300 text-left text-[2rem] font-bold border-b border-white cursor-pointer"
      >
        My Lurnies ({all})
      </span>
    </div>
  );
}

UserPan.propTypes = {
  showAll: PropTypes.func.isRequired,
  all: PropTypes.number,
  saved: PropTypes.number,
};

export default UserPan;
