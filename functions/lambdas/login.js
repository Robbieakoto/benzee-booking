const axios = require('axios');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

require('dotenv').config()

exports.handler = async(event) => {
  const { email, password } = JSON.parse(event.body).input;

  if(event.httpMethod == 'OPTIONS') {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Allow': 'POST'
      }, 
      statusCode: 204
    }
  }

  const responseBodyString = JSON.stringify({
    query: `
      query getUser($email: String!) {
        users(where: {email: {_eq: $email}}) {
          email
          id
          name
          password
        } 
      }   
  `,
    variables: {
      email,
    }
  });

  try {
    const response = await axios.post(
      `${process.env.VUE_APP_GRAPHQL_HTTP}`, 
      responseBodyString, 
      { 
        headers:  {
          "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.VUE_APP_HASURA_ADMIN_SECRET
        } 
      }
    );

    if (response.data.data.users.length < 1) {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          accessToken: null,
          message: "User not found",
        })
      };
    }

    const userDetails = response.data.data.users[0]
    const passwordMatch = bcrypt.compareSync(password, userDetails.password);

    if (!passwordMatch) {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          accessToken: null,
          message: "Wrong credentials provided",
        })
      };
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex')
    // Update user token field with token

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        accessToken: token
      })
    }


  } catch(e) {
    console.error(e)
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      statusCode: 404,
      body: JSON.stringify({
        success: true,
        accessToken: null,
        message: "Something went wrong",
      })
    };
  }
}