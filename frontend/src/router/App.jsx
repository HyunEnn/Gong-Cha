import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import Test from '@/pages/Test';
import OnBoardPage from '@/pages/OnBoardPage';
import LoginPage from '@/pages/LoginPage';
import BottomNav from '@/nav/BottomNav';
import MainPage from '@/pages/MainPage';
import ChatPage from '@/pages/ChatPage';
import MyPage from '@/pages/MyPage';
import FindPlayerBoardPage from '@/pages/FindPlayerBoardPage';
import FindPlayerInputPage from '@/pages/FindPlayerInputPage';
import FindPlayerDetailPage from '@/pages/FindPlayerDetailPage';
import FindTeamBoardPage from '@/pages/FindTeamBoardPage';
import FindMatchBoardPage from '@/pages/FindMatchBoardPage';

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
            {
                path: '/findplayer/board',
                element: <FindPlayerBoardPage />,
            },
            {
                path: '/findplayer/input',
                element: <FindPlayerInputPage />,
            },
            {
                path: '/findplayer/detail',
                element: <FindPlayerDetailPage />,
            },
            {
                path: '/findteam/board',
                element: <FindTeamBoardPage />,
            },
            {
                path: '/findmatch/board',
                element: <FindMatchBoardPage />,
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
