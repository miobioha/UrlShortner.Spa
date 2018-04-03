//import fetch from 'cross-fetch'

export const REQUEST_SHORTENED_URL = 'REQUEST_SHORTENED_URL'
export const RECEIVE_SHORTENED_URL = 'RECEIVE_SHORTENED_URL'


function requestShortenedUrl(link) {
    return {
      type: REQUEST_SHORTENED_URL,
      link
    }
}

function receiveShortenedUrl(link, shortLink) {
    return {
      type: RECEIVE_SHORTENED_URL,
      originalLink: link,
      shortLink,
      receivedAt: Date.now()
    }
}

export function shortenUrl(link) {
    var fetchData = { 
        method: 'POST', 
        body: `link=${link}`,
        headers: new Headers({
            "Accept": 'application/json',
            "Content-Type": "application/x-www-form-urlencoded",
          })
    };
    return dispatch => {
      dispatch(requestShortenedUrl(link))
      return fetch('http://myapp.com/urlshortener/api/v1/shortenlink', fetchData)
        .then(response => {
            return response.json()
        })
        .then(json => dispatch(receiveShortenedUrl(link, json.shortLink)))
        .catch(err => {
            console.error(err);
          })
    }
  }

