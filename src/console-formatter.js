

const consoleFormatter = (results) => {
  const issuesArray = results.map(({id, name, description, issuesCount}) => {
    return {id, component: name, description, issuesCount}
 })
 console.table(issuesArray)

}



module.exports = { consoleFormatter }
