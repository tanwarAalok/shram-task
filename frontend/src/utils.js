export const cardsArray = [
    { id: 1, key: "bat", src: "Assets/Images/Bat.png" },
    { id: 2, key: "bones", src: "Assets/Images/Bones.png" },
    { id: 3, key: "cauldron", src: "Assets/Images/Cauldron.png" },
    { id: 4, key: "eye", src: "Assets/Images/Eye.png" },
    { id: 5, key: "skull", src: "Assets/Images/Skull.png" },
    { id: 6, key: "pumpkin", src: "Assets/Images/Pumpkin.png" },
    { id: 7, key: "ghost", src: "Assets/Images/Ghost.png" },
    { id: 8, key: "dracula", src: "Assets/Images/Dracula.png" },
    { id: 9, key: "bat", src: "Assets/Images/Bat.png" },
    { id: 10, key: "bones", src: "Assets/Images/Bones.png" },
    { id: 11, key: "cauldron", src: "Assets/Images/Cauldron.png" },
    { id: 12, key: "eye", src: "Assets/Images/Eye.png" },
    { id: 13, key: "skull", src: "Assets/Images/Skull.png" },
    { id: 14, key: "pumpkin", src: "Assets/Images/Pumpkin.png" },
    { id: 15, key: "ghost", src: "Assets/Images/Ghost.png" },
    { id: 16, key: "dracula", src: "Assets/Images/Dracula.png" }
];


export const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const getScore = (flips, matchedCards) => {
    const matched = matchedCards/2;
    const bonus = 100;
    const penalty = 5;
    const wrongFlips = flips - (2*matched);
    return Math.max(0, (bonus * matched - wrongFlips * penalty));
}

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;