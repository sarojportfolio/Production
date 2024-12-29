// Configuration
const apiKey = "AIzaSyDSpekvb2VK6aUKgDyMk3u_p8YiA4cdAsA";
const sheetId = "11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0";
const range = "Sheet1!A2:E12";
const leaderboardUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

// Fetch and render the data
async function fetchScoreboardData() {
    try {
        const response = await fetch(leaderboardUrl);
        const data = await response.json();

        if (!data.values) throw new Error("No data available");

        const rows = data.values;
        const tbody = document.getElementById("scoreboard-body");
        tbody.innerHTML = ""; // Clear existing rows

        rows.forEach((row, index) => {
            const tr = document.createElement("tr");

            // Rank
            const rankTd = document.createElement("td");
            rankTd.className = "rank";
            rankTd.textContent = index + 1;
            tr.appendChild(rankTd);

            // Team Name
            const teamTd = document.createElement("td");
            teamTd.className = "team-name";
            teamTd.textContent = row[1] || "Unknown";
            tr.appendChild(teamTd);

            // Alive (Green Line)
            const aliveTd = document.createElement("td");
            const aliveLines = parseInt(row[2]) || 0;

            if (aliveLines === 0) {
                aliveTd.className = "wipeout";
                aliveTd.textContent = "Wipeout";
            } else {
                const lineContainer = document.createElement("div");
                lineContainer.className = "alive-line-container";

                for (let i = 0; i < aliveLines; i++) {
                    const line = document.createElement("div");
                    line.className = "alive-line";
                    lineContainer.appendChild(line);
                }
                aliveTd.appendChild(lineContainer);
            }
            tr.appendChild(aliveTd);

            // Points
            const pointsTd = document.createElement("td");
            pointsTd.className = "points";
            pointsTd.textContent = row[3] || "0";
            tr.appendChild(pointsTd);

            // Kills
            const killsTd = document.createElement("td");
            killsTd.className = "kills";
            killsTd.textContent = row[4] || "0";
            tr.appendChild(killsTd);

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching scoreboard data:", error);
        document.getElementById("error-message").style.display = "block";
    }
}

// Fetch data on load
fetchScoreboardData();
