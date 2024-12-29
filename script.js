// Define the sheet ID and range
const sheetId = '11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0';  // Your Google Sheet ID
const range = 'Sheet1!A1:B10';  // Adjust this range to fit your needs (e.g., entire sheet or specific range)

// Define your API key (replace with your actual API key)
const apiKey = 'AIzaSyDSpekvb2VK6aUKgDyMk3u_p8YiA4cdAsA';  // Replace with your new API key

// Construct the URL to call the Google Sheets API
const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

// Fetch data from Google Sheets
fetch(sheetUrl)
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    console.log(data);  // Handle the response data here (you can manipulate or display it)
  })
  .catch(error => {
    console.error('Error:', error);  // Handle errors here (e.g., if the API call fails)
  });

// Google Sheets JSON API URL
const sheetUrl = "https://docs.google.com/spreadsheets/d/11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0/gviz/tq?tqx=out:json";

// Function to fetch data from Google Sheets
async function fetchScoreboardData() {
    try {
        const response = await fetch(sheetUrl);
        const text = await response.text();

        // Parse Google Sheets JSON response
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows;

        // Map rows to scoreboard data
        const scoreboardData = rows.map((row) => ({
            rank: row.c[0]?.v || "N/A",
            team: row.c[1]?.v || "N/A",
            alive: row.c[2]?.v || 0,
            knocked: row.c[3]?.v || 0,
            eliminated: row.c[4]?.v || 0,
            points: row.c[5]?.v || 0,
            elims: row.c[6]?.v || 0,
        }));

        updateScoreboard(scoreboardData);
    } catch (error) {
        console.error("Error fetching scoreboard data:", error);
        showError();
    }
}

// Function to update the scoreboard
function updateScoreboard(data) {
    const tbody = document.getElementById("scoreboard-body");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach((team) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${team.rank}</td>
            <td>${team.team}</td>
            <td>${team.alive}</td>
            <td>${team.knocked}</td>
            <td>${team.eliminated}</td>
            <td>${team.points}</td>
            <td>${team.elims}</td>
        `;
        tbody.appendChild(row);
    });
}

// Function to display an error message
function showError() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
}

// Fetch data on page load
fetchScoreboardData();
