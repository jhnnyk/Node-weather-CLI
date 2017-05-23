// Weather Underground API key: 4c48a6b8955d04a6

// Require modules
const http = require('http');

// Connect to the API
const request = http.get(`http://api.wunderground.com/api/4c48a6b8955d04a6/conditions/q/CA/San_Francisco.json`,
      response => {
        // Read the data
        let body = '';
        response.on('data', data => {
          body += data.toString();
        });

        response.on('end', () => {
          console.log(body);
        });
      });
