import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA as data } from "../../utils/data.js";
import UserContext from "../../context/user-context.jsx";
import CharAvatar from "../Cards/CharAvatar.jsx";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-3">
        {user?.profileImageUrl && !imageError ? (
          <img
            src={user.profileImageUrl || ""}
            alt="Profile image"
            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="text-gray-500 font-medium leading-6">
          {user.fullName || ""}
        </h5>
      </div>
      {data.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-white bg-primary" : ""} py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
