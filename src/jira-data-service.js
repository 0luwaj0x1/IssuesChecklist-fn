const { getRequest } = require('./lib/http-client')

const baseUrl = "https://herocoders.atlassian.net/rest/api/3";
const maxResults = 3;

let total = null, issues = [],  results = [];

function getComponents() {
  const url = `${baseUrl}/project/IC/components`;
  return getRequest({ url });
}

async function getComponentIssues(component, iteratorCallback) {

  const url =`${baseUrl}/search?jql=component%20%3D%20${component.id}%20&maxResults=${maxResults}&startAt=${issues.length}`
  const currentComponent = await getRequest({url});
  
  total = currentComponent.total;
  issues = issues.concat(currentComponent.issues)
 
  while (total !== issues.length) {
    await getComponentIssues(component, () => {})
  }

  iteratorCallback(issues.length)
}

async function getData(resultCallback) {

  const allComponents = await getComponents();

  const componentsWithoutLeads = allComponents.filter(
    (component) => component.assigneeType !== "COMPONENT_LEAD"
  );

  async function iterator(index) {
    if (index === componentsWithoutLeads.length) {
      return resultCallback(results);
    }

    const component = componentsWithoutLeads[index];

    await getComponentIssues(component, (result) => {
      results.push({ ...component, issuesCount: result });
      resetState()
      iterator(index + 1)
    });
  }
  iterator(0)
}



function resetState() {
  total = null
  issues = []
}


module.exports = { getData }