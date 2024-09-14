import React from 'react';

const ScoreBoard = ({ score, highScore }) => (
    <div className="game-info-container">
        <div className="game-info">Score: {score}</div>
        <div className="game-info">High Score: {highScore}</div>
    </div>
);

export default ScoreBoard;