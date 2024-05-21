import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../root/RootLayout";
import {
  Home,
  History,
  LikedVideos,
  Playlists,
  Subscriptions,
  UserChannel,
  Video,
} from "../root/pages/index";
import AuthLayout from "../auth/AuthLayout";
import SignInForm from "../auth/forms/SignInForm";
import RegisterForm from "../auth/forms/RegisterForm";
import Channel from "@/root/pages/Channel";
import ManageVideos from "@/root/pages/ManageVideos";
import CustomizeChannel from "@/root/pages/CustomizeChannel";
import ErrorPage from "@/root/ErrorPage";
import SearchPage from "@/root/pages/SearchPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "history",
        element: <History></History>,
      },
      {
        path: "userChannel",
        element: <UserChannel></UserChannel>,
      },
      { path: "userChannel/customizeChannel", element: <CustomizeChannel /> },
      { path: "userChannel/manageVideos", element: <ManageVideos /> },
      {
        path: "likedVideos",
        element: <LikedVideos></LikedVideos>,
      },
      {
        path: "playlists",
        element: <Playlists></Playlists>,
      },
      {
        path: "subscriptions",
        element: <Subscriptions></Subscriptions>,
      },
      {
        path: "video/:videoId",
        element: <Video></Video>,
      },
      {
        path: "channel/:channelId",
        element: <Channel></Channel>,
      },
      {
        path:"/search",
        element:<SearchPage></SearchPage>
      }
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignInForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
]);
