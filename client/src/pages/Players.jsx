import PlayerCard from "../components/PlayerCard";
import { useState, useEffect } from "react";
import "../css/Players.css";
import { fetchMemberData } from "../data/GuildData";

function Players() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]); // State for player objects

  useEffect(() => {
    async function loadPlayers() {
      const names = await fetchMemberData(
        "https://stats.pika-network.net/api/clans/midnight",
        "username"
      ); // Fetch player names

      // Map to player objects
      const playerObjects = names
        .map((name, index) => ({
          id: index + 1, // Assign a unique ID
          username: name,
          url: `https://minotar.net/body/${name}/16.png`,
          status: Math.random() < 0.5 ? "Pro" : "Noob",
        }))
        .sort((a, b) => a.username.localeCompare(b.username)); // Sort alphabetically

      setPlayers(playerObjects);
    }

    loadPlayers();
  }, []); // Empty dependency array ensures it runs once on mount

  const handlePlayerSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
  };

  return (
    <div className="home">
      <h2 className="guild-title">Guild Members</h2> {/* Title added here */}
      <form onSubmit={handlePlayerSearch} className="search-form">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <button type="submit" className="search-btn">Search</button> */}
      </form>
      <div className="players-grid">
        {players.map(
          (player) =>
            player.username.toLowerCase().startsWith(searchQuery) && (
              <PlayerCard player={player} key={player.id} />
            )
        )}
      </div>
    </div>
  );
}

export default Players;
