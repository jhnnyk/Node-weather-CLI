// Require modules
const https = require('https');
const api = require('./api.json');

// Print out temp details
function printMessage(city, temp) {
  const message = `It is currently ${temp}F in ${city}.`;
  console.log(message);
}

// Print out error message
function printError(error) {
  console.error(error.message);
}

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
            try {
              // Parse data
              const conditions = JSON.parse(body);
              // Print the data
              printMessage(conditions.current_observation.display_location.full, conditions.current_observation.temp_f);
            } catch (e) {
              printError(e);
            }
          });
        });

        request.on('error', printError);
}

module.exports.get = get;

// TODO: Handle any errors
