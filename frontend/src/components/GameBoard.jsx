import React, {useState, useEffect, useRef} from 'react';
import GameEnd from "./GameEnd";
import {cardsArray, shuffleArray} from "../utils";


const GameBoard = ({setStage}) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [highScore, setHighScore] = useState(0);
    const [isBusy, setIsBusy] = useState(false);
    const [flips, setFlips] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState();
    const [victory, setVictory] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const timerRef = useRef(null);


    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        if (timeRemaining === 0) {
            handleGameEnd(false);
        }
    }, [timeRemaining]);

    const initializeGame = () => {
        setCards(shuffleArray(cardsArray));
        setTimeRemaining(60);
        setFlips(0);
        setMatchedCards([]);
        setFlippedCards([]);
        setGameOver(false);
        setVictory(false);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);
    };

    const handleCardClick = (card) => {
        if (isBusy || flippedCards.length === 2 || flippedCards.includes(card)) return;

        setFlippedCards([...flippedCards, card]);
        setFlips(flips + 1);

        if (flippedCards.length === 1) {
            const [firstCard] = flippedCards;
            if (card.key === firstCard.key) {
                setMatchedCards([...matchedCards, card, firstCard]);
                setFlippedCards([]);
                if (matchedCards.length + 2 === cards.length) {
                    handleGameEnd(true);
                }
            } else {
                setIsBusy(true);
                setTimeout(() => {
                    setFlippedCards([]);
                    setIsBusy(false);
                }, 1000);
            }
        }
    };


    const handleGameEnd = (isVictory) => {
        setGameOver(true);
        setVictory(isVictory)
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }


    if (gameOver) {
        return (
            <GameEnd
                victory={victory}
                flips={flips}
                matchedCards={matchedCards.length}
                onPlayAgain={initializeGame}
            />
        );
    }

    return (
        <div className="game-container">
            <div className="game-info-container">
                <div className="game-info">
                    Time {timeRemaining}
                </div>
                <div className="game-info">
                    Flips {flips}
                </div>
            </div>
            {cards.map(card => (
                <div
                    key={card.id}
                    className={`card ${flippedCards.includes(card) || matchedCards.includes(card) ? 'visible' : ''} ${matchedCards.includes(card) ? 'matched' : ''}`}
                    onClick={() => handleCardClick(card)}
                >
                    <div className="card-back card-face">
                        <img className="cob-web cob-web-top-left" src="Assets/Images/Cobweb.png"/>
                        <img className="cob-web cob-web-top-right" src="Assets/Images/Cobweb.png"/>
                        <img className="cob-web cob-web-bottom-left" src="Assets/Images/Cobweb.png"/>
                        <img className="cob-web cob-web-bottom-right" src="Assets/Images/Cobweb.png"/>
                        <img className="spider" src="Assets/Images/Spider.png"/>
                    </div>
                    <div className="card-front card-face">
                        <img className="cob-web cob-web-top-left" src="Assets/Images/CobwebGrey.png"/>
                        <img className="cob-web cob-web-top-right" src="Assets/Images/CobwebGrey.png"/>
                        <img className="cob-web cob-web-bottom-left" src="Assets/Images/CobwebGrey.png"/>
                        <img className="cob-web cob-web-bottom-right" src="Assets/Images/CobwebGrey.png"/>
                        <img className="card-value" src={card.src}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
