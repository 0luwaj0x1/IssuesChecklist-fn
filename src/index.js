const { getData } = require("./jira-data-service");
const { consoleFormatter } = require("./console-formatter");



(async function main() {
  try {
    await getData((results) => consoleFormatter(results));
  } catch (error) {
    console.error(error.message);
  }
})()
