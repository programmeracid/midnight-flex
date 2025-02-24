import PlayerCard from "../components/PlayerCard";
import "../css/Home.css";

function getRandomUsername() {
    const usernames = ["AcidSid", "Crescent", "ITISGYAN", "Mat7Socks", "Mid123", "ShadowHunter", "Middyonfire", "PhantomMHA", "SohomMinecraft", "Haadiplayz"];
    return usernames[Math.floor(Math.random() * usernames.length)];
}

function generatePlayers(playerNames) {
    const players = playerNames.map((name, index) => ({
        id: index + 1, // Assign a unique ID
        username: name,
        url: `https://minotar.net/body/${name}/16.png`,
        status: Math.random() < 0.5 ? "Pro" : "Noob"
      }))
      .sort((a, b) => a.username.localeCompare(b.username));
    return players;
}

function Home() {
    const founders = generatePlayers(["AcidSid", "Crescent", "shadowhunter", "blackcrow", "MystGamez"])
    const officers = generatePlayers(["Mat7Socks", "SohomMinecraft", "Grim_ReaPEar", "lunchtable", "TDOG98354"])

    return (
        <>
            {/* 🌟 Fancy First Grid */}
            <div className="top-section">
                <h2 className="grid-title top-title">Founders</h2>
                <div className="top-grid">
                    {/* First row: 3 PlayerCards */}
                    <div className="top-row">
                        {founders.slice(0, 3).map(player => (
                            <PlayerCard player={player} key={player.id} />
                        ))}
                    </div>

                    {/* Second row: 2 PlayerCards (Centered) */}
                    <div className="bottom-row">
                        {founders.slice(3).map(player => (
                            <PlayerCard player={player} key={player.id} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 💜 Fancy Second Grid */}
            <div className="bottom-section">
                <h2 className="grid-title bottom-title">Officers</h2>
                <div className="bottom-grid">
                    {officers.map(player => (
                        <PlayerCard player={player} key={player.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
