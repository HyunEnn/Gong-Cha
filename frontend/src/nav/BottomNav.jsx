import { Outlet, Link, useLocation } from 'react-router-dom';

import homeIcon from '@/assets/icons/home.svg';
import chatIcon from '@/assets/icons/chat.svg';
import myIcon from '@/assets/icons/my.svg';

import homeIconColored from '@/assets/icons/homeColored.svg';
import chatIconColored from '@/assets/icons/chatColored.svg';
import myIconColored from '@/assets/icons/myColored.svg';

function BottomNav() {
    const location = useLocation();
    const isActive = (path) => (location.pathname === path ? 'bg-brand-300/10 rounded-3xl' : '');

    return (
        <div className="flex flex-col items-center justify-between min-h-screen ">
            <div className="mx-4 overflow-x-hidden overflow-y-auto h-[calc(100vh-96px)]">
                <Outlet />
            </div>
            <footer className="fixed bottom-0 flex items-center justify-center w-full bg-white border-black shadow-inner shadow-brand-400/10 min-h-24">
                <div className="flex flex-row items-center w-full justify-evenly">
                    <Link to="/main">
                        <img
                            className={`p-3 ${isActive('/main')}`}
                            src={location.pathname === '/main' ? homeIconColored : homeIcon}
                            alt="홈 아이콘"
                        />
                    </Link>
                    <Link to={`/chat`}>
                        <img
                            className={`p-3 ${isActive('/chat')}`}
                            src={location.pathname === '/chat' ? chatIconColored : chatIcon}
                            alt="채팅 아이콘"
                        />
                    </Link>
                    <Link to="/mypage">
                        <img
                            className={`p-3 ${isActive('/mypage')}`}
                            src={location.pathname === '/mypage' ? myIconColored : myIcon}
                            alt="마이페이지 아이콘"
                        />
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default BottomNav;
