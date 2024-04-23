import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import Test from '@/pages/Test';
import OnBoardPage from '@/pages/OnBoardPage';
import LoginPage from '@/pages/LoginPage';
import BottomNav from '@/nav/BottomNav';
import MainPage from '@/pages/MainPage';
import ChatPage from '@/pages/ChatPage';
import MyPage from '@/pages/MyPage';

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: user ? <Navigate to="/main" /> : <Navigate to="/login" />,
    // },
    {
        path: '/',
        element: <Navigate to="/main" />,
    },
    {
        path: '/test',
        element: <Test />,
    },
    {
        path: '/onboard',
        element: <OnBoardPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <BottomNav />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/main',
                element: <MainPage />,
            },
            {
                path: '/chat',
                element: <ChatPage />,
            },
            {
                path: '/my',
                element: <MyPage />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
