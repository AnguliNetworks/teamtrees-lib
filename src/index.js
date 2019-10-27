import fetch from 'node-fetch';

const handleHTTPErrors = (response) => {
  if (!response.ok) {
    throw Error(response.status);
  }

  return response;
};

const getDonatedTrees = () => new Promise((
  (resolve, reject) => fetch(
    'https://www.teamtrees.org/',
    {
      Accept: 'text/html',
    },
  )
    .then(handleHTTPErrors)
    .then((response) => response.text())
    .then((text) => {
      const match = text.match(/<div id="totalTrees" class="counter" data-count="(\d*)">0<\/div>/);
      if (!match) {
        throw Error('No tree count found.');
      }

      resolve(match[1]);
    })
    .catch(reject)
));

getDonatedTrees()
  .then(console.log)
  .catch(console.error);
