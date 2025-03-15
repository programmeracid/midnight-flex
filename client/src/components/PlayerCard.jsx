import { useState, useEffect } from 'react';
import '../css/PlayerCard.css';

function PlayerCard({ player }) {
    function onPlayerClick() {
        alert("Player clicked: " + player.username);
    }

    const [status, setStatus] = useState(""); // Default empty status

    const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";

    useEffect(() => {
        async function fetchPlayerStatus() {
            try {
                const response = await fetch(`${BASE_URL}/api/:${player.username}`);
                if (response.ok) {
                    const data = await response.json();
                    setStatus(data.status); // Set status from database
                }
            } catch (error) {
                console.error("Error fetching player status:", error);
            }
        }

        fetchPlayerStatus();
    }, [player.username]); // Runs when username changes

    return (
        <div className="player-card" onClick={onPlayerClick}>
            <div className="player-img">
                <img src={player.url} alt={player.username} />
            </div>
            <div className="player-info">
                <h3>{player.username}</h3>
                <p>{status}</p>
            </div>
        </div>
    );
}

export default PlayerCard;
