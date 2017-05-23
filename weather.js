// Require modules
const https = require('https');
const api = require('./api.json');

// Print out temp details
// Print out error message

function get(query) {
  // Connect to the API
  const request = https.get(`https://api.wunderground.com/api/${api.key}/conditions/q/${query}.json`,
        response => {
          // Read the data
          let body = '';
          response.on('data', chunk => {
            body += chunk.toString();
          });

          response.on('end', () => {
            console.log(body);
            // Parse data
            // Print the data
          });
        });
}

module.exports.get = get;

// TODO: Handle any errors
