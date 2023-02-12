import {
    createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import SignUp from './User/SignUp';
import LC from 'leancloud-storage'
import { SignIn } from './User/SignIn';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: '/signup',
        element: <SignUp/>,
    },
    {
        path: '/signin',
        element: <SignIn/>
    }
])