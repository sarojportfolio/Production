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

                // Loop through the rows and create table rows dynamically
                rows.forEach((row, index) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${index + 1}</td> <!-- Rank (index+1) -->
                        <td>${row[1]}</td> <!-- Team Name (column B) -->
                        <td>${row[2]}</td> <!-- Alive (column C) -->
                        <td>${row[3]}</td> <!-- Points (column D) -->
                        <td>${row[4]}</td> <!-- Kills (column E) -->
                    `;
                    
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

// Display error message
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Fetch leaderboard data when the page loads
window.onload = fetchLeaderboardData;
