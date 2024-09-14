import {useState} from "react";
import GameBoard from "./components/GameBoard";
import AuthForm from "./components/AuthForm";
import MenuBoard from "./components/MenuBoard";
import Leaderboard from "./components/LeaderBoard";
import {useUser} from "./context/UserContext";

const App = () => {
    const {user, clearUser} = useUser();
    const [stage, setStage] = useState(0);

    const renderStageComponent = () => {
        switch (stage) {
            case 0:
                return <MenuBoard user={user} setStage={setStage} onLogout={clearUser}/>
            case 1:
                return <GameBoard/>
            case 2:
                return <Leaderboard/>
            default:
                return null;
        }
    }

    if(!user) return <AuthForm/>;

    return (
        <div className="app-container">
            <h1 className="page-title">Memory Game</h1>
            {
                stage > 0 ? (
                    <button className="home-button" onClick={() => setStage(0)}>
                        Back
                    </button>
                ) : ''
            }
            {renderStageComponent()}
        </div>
    )
};

export default App;
