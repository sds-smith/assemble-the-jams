const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const response = await axios.get(process.env.CLIENT_ID);
    return {
      statusCode: 200,
      body: JSON.stringify({ clientId: response.data.CLIENT_ID }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};