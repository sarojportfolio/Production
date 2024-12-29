// API Key and Sheet Information
const apiKey = 'AIzaSyDSpekvb2VK6aUKgDyMk3u_p8YiA4cdAsA';
const sheetId = '11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0';
const range = 'Sheet1!A2:E12'; // You can adjust the range to match your data

const leaderboardUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

// Fetch and display data from Google Sheets API
async function fetchScoreboardData() {
    try {
        const response = await fetch(leaderboardUrl);
        const data = await response.json();
        if (!data.values) throw new Error("No data available");

        const scoreboardBody = document.getElementById('scoreboard-body');
        scoreboardBody.innerHTML = ''; // Clear previous data

        data.values.forEach((row, index) => {
            // Skip empty rows
            if (row.length < 5) return;

            // Insert rows dynamically
            const rowElement = document.createElement('tr');
            const alive = row[2]; // Alive value

            // Handle alive data with green lines
            let aliveContent = '';
            if (alive == 4) {
                aliveContent = `<div class="alive-line" style="height: 4px;"></div>`;
            } else if (alive == 3) {
                aliveContent = `<div class="alive-line" style="height: 3px;"></div>`;
            } else if (alive == 2) {
                aliveContent = `<div class="alive-line" style="height: 2px;"></div>`;
            } else if (alive == 1) {
                aliveContent = `<div class="alive-line" style="height: 1px;"></div>`;
            } else if (alive == 0) {
                aliveContent = 'Wipeout';
            }

            rowElement.innerHTML = `
                <td>${index + 1}</td>
                <td>${row[1]}</td> <!-- Team Name -->
                <td>${aliveContent}</td> <!-- Alive (green line or wipeout) -->
                <td>${row[3]}</td> <!-- Points -->
                <td>${row[4]}</td> <!-- Kills -->
            `;
            scoreboardBody.appendChild(rowElement);
        });
    } catch (error) {
        console.error("Error fetching scoreboard data:", error);
        document.getElementById('error-message').style.display = 'block';
    }
}

// Call the function to fetch data
fetchScoreboardData();
