// Require modules
const https = require('https');
const http = require('http');
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
  const readableQuery = query.replace('_', ' ');
  try {
  // Connect to the API
    const request = https.get(`https://api.wunderground.com/api/${api.key}/conditions/q/${query}.json`,
        response => {
          if (response.statusCode === 200) {
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
                if (conditions.location) {
                  printMessage(conditions.current_observation.display_location.full, conditions.current_observation.temp_f);
                } else {
                  const queryError = new Error(`The location "${readableQuery}" was not found.`);
                  printError(queryError);
                }
              } catch (e) {
                // Parse error
                printError(e);
              }
            });
          } else {
            // Status Code error
            const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`);
            printError(statusCodeError);
          }

        });

        request.on('error', printError);
      } catch(error) {
        printError(error);
      }
}

module.exports.get = get;

// TODO: Handle any errors
