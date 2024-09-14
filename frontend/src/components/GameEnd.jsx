import React, {useEffect, useRef, useState} from 'react';
import { useUser } from "../context/UserContext";
import { getScore } from "../utils";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const GameEnd = ({ victory, flips, matchedCards, onPlayAgain }) => {
    const [newHighScore, setNewHighScore] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const [showFinalScore, setShowFinalScore] = useState(false);
    const { user, updateUser } = useUser();
    const currentScore = getScore(flips, matchedCards);
    const hasUpdatedScore = useRef(false);

    useEffect(() => {
        const updateUserData = async (newScore) => {
            try{
                await updateUser({ newScore });
            } catch(err){
                console.log(err.message)
            }
        }

        if (!hasUpdatedScore.current) {
            updateUserData(currentScore);
            hasUpdatedScore.current = true;
        }

        if (currentScore > user.highScore) {
            setNewHighScore(true);
            setShowFireworks(true);

            setTimeout(() => {
                setShowFireworks(false);
            }, 3000);
        }

        setTimeout(() => {
            setShowFinalScore(true);
        }, 1000);
    }, []);


    return (
        <div className="game-end-container">

            {showFireworks && (
                <Fireworks autorun={{ speed: 2, duration: 2000 }} />
            )}

            <div className="game-end-content">
                <h2>{victory ? "Congratulations!" : "Time's Up!"}</h2>

                {newHighScore ? (
                    <p className="high-score-message">
                        🎉 New High Score! Well Done! 🎉
                    </p>
                ) : (
                    <p>Great effort! Keep playing to beat your high score!</p>
                )}

                {showFinalScore && (
                    <>
                        <p>Your score: <strong>{currentScore}</strong></p>
                        <p>Your high score: <strong>{newHighScore ? currentScore : user.highScore}</strong></p>
                    </>
                )}

                <button onClick={onPlayAgain}>
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default GameEnd;
