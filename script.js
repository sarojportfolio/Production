// Replace with your actual Google Sheet ID and API key
const sheetId = '11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0';  // Your Google Sheet ID
const range = 'Sheet1!A1:E100';  // Adjust this to the range of data you want from your sheet
const apiKey = 'AIzaSyDSpekvb2VK6aUKgDyMk3u_p8YiA4cdAsA';  // Your API key

const leaderboardUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

function fetchLeaderboardData() {
    fetch(leaderboardUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.values) {
                const rows = data.values;
                const scoreboardBody = document.getElementById('scoreboard-body');
                scoreboardBody.innerHTML = '';  // Clear previous data

                const sortedRows = sortRowsByAlive(rows);

                // Loop through the rows and create table rows dynamically
                sortedRows.forEach((row, index) => {
                    const tr = document.createElement('tr');
                    
                    const aliveValue = parseInt(row[2], 10); // Alive column (assumed to be 3rd column)
                    const aliveLine = getAliveLine(aliveValue);
                    const isWipeout = aliveValue === 0;

                    tr.innerHTML = `
                        <td class="rank">${index + 1}</td> <!-- Rank -->
                        <td class="team-name">${row[1]}</td> <!-- Team Name -->
                        <td class="alive">${isWipeout ? 'Wipeout' : aliveLine}</td> <!-- Alive -->
                        <td class="points">${row[3]}</td> <!-- Points -->
                        <td class="kills">${row[4]}</td> <!-- Kills -->
                    `;
                    
                    if (isWipeout) {
                        tr.querySelector('.alive').classList.add('wipeout');
                    }
                    
                    scoreboardBody.appendChild(tr);
                });
            } else {
                showError('No data found in the sheet.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            showError('Unable to load data. Please try again later.');
        });
}

// Sort rows based on Alive (ascending), so Wipeout goes to the bottom
function sortRowsByAlive(rows) {
    return rows.sort((a, b) => {
        const aliveA = parseInt(a[2], 10);
        const aliveB = parseInt(b[2], 10);
        
        // Move Wipeout (0) to the bottom
        if (aliveA === 0) return 1;
        if (aliveB === 0) return -1;
        return aliveB - aliveA; // Sort descending by Alive
    });
}

// Function to return the green line for the Alive value
function getAliveLine(aliveValue) {
    const lines = [];
    for (let i = 0; i < aliveValue; i++) {
        lines.push('<span class="alive-line"></span>');
    }
    return lines.join(''); // Join the green lines into a single string
}

// Display error message
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Fetch leaderboard data when the page loads
window.onload = fetchLeaderboardData;
