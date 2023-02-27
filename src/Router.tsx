import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./User/SignUp";
import LC from "leancloud-storage";
import { SignIn } from "./User/SignIn";
import Admin from "./Admin/Admin";
import Website from "./Website/Website";
import Create from "./Website/Create";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/website",
        element: <Website />,
    },
    {
        path: "/website/create",
        element: <Create />,
    },
]);
