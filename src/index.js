import fetch from 'node-fetch';

const handleHTTPErrors = (response) => {
  if (!response.ok) {
    throw Error(response.status);
  }

  return response;
};

fetch(
  'https://www.teamtrees.org/',
  {
    Accept: 'text/html',
  }
)
  .then(handleHTTPErrors)
  .then(response => response.text())
  .then((text) => {
    const match = text.match(/<div id="totalTrees" class="counter" data-count="(\d*)">0<\/div>/);
    if (match) {
      console.log(match[1]);
    }
  })
  .catch(console.log);
