// /.netlify/functions/GetAccessToken

const fetch = require('node-fetch');

exports.handler = async function (event, context, callback) {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`
    //window.location = accessUrl 

    let res = await fetch(url);
    let data = await res.json();
    
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
    });
};