import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MyPageWithTransition from '@/components/MyPageWithTransition';
import ErrorPage from '@/pages/ErrorPage';
import TestDiv from '@/pages/TestDiv';
import LoginPage from '@/pages/LoginPage';
import BottomNav from '@/nav/BottomNav';
import MainPage from '@/pages/MainPage';
import ClubPage from '@/pages/ClubPage';
import MyPage from '@/pages/MyPage';
import FindMatchBoardPage from '@/pages/FindMatchBoardPage';
import MarketBoardPage from '@/pages/MarketBoardPage';
import ProfilePage from '@/pages/ProfilePage';
import PlayHistoryPage from '@/pages/PlayHistoryPage';
import FindMatchInputPage from '@/pages/FindMatchInputPage';
import FindMatchDetailPage from '@/pages/FindMatchDetailPage';
import PlaySchedulePage from '@/pages/PlaySchedulePage';
import PlayerCardPage from '@/pages/PlayerCardPage';
import AlarmPage from '@/pages/AlarmPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
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
            path: '/testdiv',
            element: <TestDiv />,
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
                    path: '/club',
                    element: <ClubPage />,
                },
                {
                    path: '/mypage',
                    element: <MyPageWithTransition />,
                    children: [
                        {
                            index: true,
                            element: <MyPage />,
                        },
                        {
                            path: 'profile',
                            element: <ProfilePage />,
                        },
                        {
                            path: 'playschedule',
                            element: <PlaySchedulePage />,
                        },
                        {
                            path: 'playercard',
                            element: <PlayerCardPage />,
                        },
                        {
                            path: 'playhistory',
                            element: <PlayHistoryPage />,
                        },
                    ],
                },
                {
                    path: '/alarm',
                    element: <AlarmPage />,
                },
                // {
                //     path: '/findplayer/board',
                //     element: <FindPlayerBoardPage />,
                // },
                // {
                //     path: '/findplayer/input',
                //     element: <FindPlayerInputPage />,
                // },
                // {
                //     path: '/findplayer/detail',
                //     element: <FindPlayerDetailPage />,
                // },
                {
                    path: '/findmatch/board',
                    element: <FindMatchBoardPage />,
                },
                {
                    path: '/findmatch/input',
                    element: <FindMatchInputPage />,
                },
                {
                    path: '/findmatch/detail/:id',
                    element: <FindMatchDetailPage />,
                },
                {
                    path: '/market/board',
                    element: <MarketBoardPage />,
                },
            ],
        },
    ]);

    return (
        <>
            <Toaster />
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
