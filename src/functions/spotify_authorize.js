const axios = require('axios')

exports.handler = async function (event, context, callback) {
  const clientId = process.env.REACT_APP_CLIENT_ID
  const scope = process.env.REACT_APP_ORIGINAL_SCOPE
  //const redirectURI = process.env.REACT_APP_REDIRECT_URI_LOCALHOST
  const redirectURI = process.env.REACT_APP_REDIRECT_URI_NETLIFY


  const response = await axios.get(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`)
  console.log('spotify_authorize response', response)
  return {
    statusCode: 200,
    body: JSON.stringify({title : response.data.title})
  }
  // callback(null, {
    // statusCode: 200,
    // body: JSON.stringify({accessURL : accessURL})
  // })

};