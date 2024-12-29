// Replace these with your actual Google Sheet ID and API key
const sheetId = '11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0';  // Your Google Sheet ID
const range = 'Sheet1!A1:G100';  // Adjust this to the range where your data is
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
                        <td>${index + 1}</td>
                        <td>${row[0]}</td>  <!-- Team name (column A) -->
                        <td>${row[1]}</td>  <!-- Alive (column B) -->
                        <td>${row[2]}</td>  <!-- Knocked (column C) -->
                        <td>${row[3]}</td>  <!-- Eliminated (column D) -->
                        <td>${row[4]}</td>  <!-- Points (column E) -->
                        <td>${row[5]}</td>  <!-- Eliminations (column F) -->
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
