import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BACKEND_URL} from "../utils";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/leaderboard`);
                setLeaderboard(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <table className="leaderboard-table">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>High Score</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map((entry, index) => (
                    <tr key={index} className="leaderboard-row">
                        <td>{index + 1}</td>
                        <td>{entry.username}</td>
                        <td>{entry.highScore}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
