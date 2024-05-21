import React, { useContext, useEffect } from "react";
import classes from "./SideBar.module.css";
import logo from "@/assets/logo.jpeg";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { PiUserRectangle } from "react-icons/pi";
import { MdHistory } from "react-icons/md";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { signOutUserQuery } from "@/lib/react-query/queriesAndMutation";
import { initialUser, userContext } from "@/context/Context";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";

function SideBar() {
  const {
    mutateAsync: signOut,
    data,
    isPending,
    isError,
    error,
  } = signOutUserQuery();
  const { isAuthenticated, setUser, setIsAuthenticated } =
    useContext(userContext);

  useEffect(() => {
    if (data) {
      setUser(initialUser);
      setIsAuthenticated(false);
    }
  }, [data]);

  return (
    <section className={classes.main}>
      <div className={classes.icon}>
        {/* <GiHamburgerMenu  size={30} color="rgb(74, 74, 74)"/> */}
        <Link to="/">
        <img src={logo}></img>
        <p>Videos</p>
        </Link>
      </div>
      <nav className={classes.nav}>
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.sideContent_active : classes.sideContent
            }
          >
            <MdOutlineHome size={25} />
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              isActive ? classes.sideContent_active : classes.sideContent
            }
          >
            <MdOutlineSubscriptions size={25} />
            <p>Subscriptions</p>
          </NavLink>
          <NavLink
            to="/userChannel"
            className={({ isActive }) =>
              isActive ? classes.sideContent_active : classes.sideContent
            }
          >
            <PiUserRectangle size={25} />
            <p>Your Channel</p>
          </NavLink>
          {/* <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? classes.sideContent_active : classes.sideContent
            }
          >
            <MdHistory size={25} />
            <p>History</p>
          </NavLink> */}
          {/* {isAuthenticated && (
            <NavLink
              to="/playlists"
              className={({ isActive }) =>
                isActive ? classes.sideContent_active : classes.sideContent
              }
            >
              <MdOutlinePlaylistPlay size={25} />
              <p>Playlists</p>
            </NavLink>
          )} */}
          {isAuthenticated && (
            <NavLink
              to="/likedVideos"
              className={({ isActive }) =>
                isActive ? classes.sideContent_active : classes.sideContent
              }
            >
              <BiLike size={25} />
              <p>Liked videos</p>
            </NavLink>
          )}
          <button
            onClick={() => signOut()}
            className="absolute bottom-5 left-5 p-2 rounded-full"
          >
            <GoSignOut size={25} />
          </button>
        </ul>
      </nav>
    </section>
  );
}

export default SideBar;
