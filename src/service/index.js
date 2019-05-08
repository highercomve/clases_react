export function getRedditTop(){
    return fetch('https://www.reddit.com/top.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return myJson;
    });
}

export function addPastebin(){
  return fetch('https://www.reddit.com/top.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    return myJson;
  });
}