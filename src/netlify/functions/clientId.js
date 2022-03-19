

exports.handler = function (event, context) {
  console.log(event);
  console.log(context);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      clientId: process.env.REACT_APP_CLIENT_ID,
      event
    })
  }
};

