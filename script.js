const sheetId = '11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0';  // Your Google Sheet ID
const range = 'Sheet1!A1:B100';  // Adjust this to the range of data you want from your sheet
const apiKey = 'AIzaSyDSpekvb2VK6aUKgDyMk3u_p8YiA4cdAsA';  // Your API key

const leaderboardUrl = `https://sheets.googleapis.com/v4/spreadsheets/${11L_NMzjjOQuGVVsshtP3Dz4r_mGbiO88gUB3Q9Vytf0}/values/${Sheet1!A1:B100}?key=${AIzaSyDSpekvb2VK6aUKgDyMk3u_p8YiA4cdAsA}`;

fetch(leaderboardUrl)
    .then(response => response.json())
    .then(data => {
        if (data && data.values) {
            const leaderboard = data.values;
            let output = '';
            
            leaderboard.forEach(row => {
                output += `<li>${row[0]}: ${row[1]}</li>`;
            });

            document.getElementById('leaderboard').innerHTML = output;
        } else {
            document.getElementById('leaderboard').innerHTML = '<li>No data available</li>';
        }
    })
    .catch(error => {
        console.error('Error fetching data from Google Sheets API:', error);
        document.getElementById('leaderboard').innerHTML = '<li>There was an error fetching the data</li>';
    });
