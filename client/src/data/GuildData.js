
async function fetchMemberData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (!data.members || !Array.isArray(data.members)) {
            throw new Error("Invalid or missing 'members' array in response.");
        }

        // Extract only the requested key from each member
        return data.members.map(member => member.user.username);
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

fetchMemberData("https://stats.pika-network.net/api/clans/midnight")
    .then(data => console.log(data))
    .catch(err => console.error("Request failed:", err));


function getPlayerNames() {
    return playerNames;
}

const playerNames = [
    "shadowhunter",
    "middyonfire",
    "Mr_BloodYY",
    "F3arMeCasual",
    "AcidSid",
    "Crescent",
    "Mat7rocks",
    "MystGamez",
    "Mr_Amol",
    "Emmanuel_B",
    "lunchtable",
    "PhantomMHA",
    "alexdemanlia",
    "madshax10",
    "lowzen_",
    "veroswift",
    "fortnite172",
    "archix9",
    "chehwex",
    "blackcrow",
    "kwttie",
    "NotSoAditya",
    "SohomMinecraft",
    "Haadiplayz",
    "IndianSweat",
    "TDOG98354",
    "H4CK_Dz",
    "Grim_ReaPEar",
    "shaz27",
    "rxso",
    "bronahh",
    "AADisThere",
    "wMommy",
    "Cevne",
    "cronus19"
];

// Function to return the list of players


// Exporting the function
export { getPlayerNames, fetchMemberData };






