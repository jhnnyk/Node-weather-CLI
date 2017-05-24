// Require modules
const https = require('https');
const api = require('./api.json');

// Print out temp details
function printMessage(city, temp) {
  console.log(`It is currently ${temp} in ${city}.`);
}
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
            // Parse data
            const conditions = JSON.parse(body);
            // Print the data
            printMessage(conditions.current_observation.display_location.full, conditions.current_observation.temp_f);
          });
        });
}

module.exports.get = get;

// TODO: Handle any errors
