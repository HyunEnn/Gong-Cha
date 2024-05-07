import { Link } from 'react-router-dom';

function MainPage() {
    // const navigate = useNavigate();
    return (
        <>
            {/* 토스 UI 참고해서 메인페이지 디자인 */}
            <p>메인페이지</p>
            <div className="flex flex-col">
                <Link to="/findplayer/board">선수 찾기</Link>
                <Link to="/findteam/board">팀 찾기</Link>
                <Link to="/findmatch/board">매칭 찾기</Link>
                <Link to="/market/board">이적 시장</Link>
            </div>
        </>
    );
}

export default MainPage;
