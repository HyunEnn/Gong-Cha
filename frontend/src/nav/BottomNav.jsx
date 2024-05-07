import { Outlet, Link, useLocation } from 'react-router-dom';

import homeIcon from '@/assets/icons/home.svg';
import clubIcon from '@/assets/icons/club.svg';
import myIcon from '@/assets/icons/my.svg';

function BottomNav() {
    const location = useLocation();
    const isActive = (path) => (location.pathname === path ? 'bg-neutral-100 rounded-3xl' : '');

    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <div className="mx-4 overflow-x-hidden overflow-y-auto h-[calc(100vh-96px)] min-w-[calc(360px)]">
                <Outlet />
            </div>
            <footer className="fixed bottom-0 flex items-center justify-center w-full bg-white border-black shadow-inner shadow-brand-400/10 min-h-24">
                <div className="flex flex-row items-center w-full justify-evenly">
                    <Link to="/main">
                        <img className={`p-3 ${isActive('/main')}`} src={homeIcon} alt="홈 아이콘" />
                    </Link>
                    <Link to={`/club`}>
                        <img className={`p-3 ${isActive('/club')}`} src={clubIcon} alt="클럽 아이콘" />
                    </Link>
                    <Link to="/mypage">
                        <img className={`p-3 ${isActive('/mypage')}`} src={myIcon} alt="마이페이지 아이콘" />
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default BottomNav;
