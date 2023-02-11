import {
    createBrowserRouter,
} from 'react-router-dom';
import App from './App';
import SignUp from './User/SignUp';
import LC from 'leancloud-storage'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: '/signup',
        element: <SignUp/>,
    },
])