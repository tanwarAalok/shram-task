import React from "react";

const MenuBoard = ({ user, setStage, onLogout }) => {
    return (
        <div className="menu-board-container">
            <h1 className="welcome-message">Welcome back, {user.username}</h1>
            <h2>Your highScore - {user.highScore}</h2>

            <div className="menu-buttons">
                <button className="primary" onClick={() => setStage(1)}>Start Game</button>
                <button className="primary" onClick={() => setStage(2)}>Leaderboard</button>
                <button className="primary" onClick={onLogout}>Logout</button>
            </div>

            <div className="recent-scores-table">
                <h2 className="primary">Your Recent Scores:</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.pastScores.length > 0 ? (
                        user.pastScores.slice(0, 3).map((score, index) => (
                            <tr key={index}>
                                <td>{score.score}</td>
                                <td>{new Date(score.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No recent scores</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuBoard;
