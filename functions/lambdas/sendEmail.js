const sendgridMail = require('@sendgrid/mail');
const axios = require('axios');

require("dotenv").config();

const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL } = process.env;
const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
const msg = {
  to: "",
  from: SENDGRID_FROM_EMAIL,
  subject: "BenZee Residency",
  html: "<h1>This is a test<h1/>"
};

sendgridMail.setApiKey(SENDGRID_API_KEY);

exports.handler = async (event, context) => {
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

  const requestBody = JSON.parse(event.body);
  // const trigger = requestBody.trigger.name; //approved_booking
  // const availabilityStatus = requestBody.event.data.new['is_available'];

  // msg.html = requestBody.body;

  const residentId = requestBody.event.data.new['resident_id'];

  const responseBodyString = JSON.stringify({
    query: `
      query getResidentEmail($id: uuid!) {
        residents(where: {id: {_eq: $id}}, limit: 1) {
          email
        } 
      }   
  `,
    variables: {
      id: residentId,
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

    if (response.data.data.residents.length < 1) {
      return {
        statusCode: 200,
        headers: HEADERS,
        body: "Resident not found"
      };
    }
    msg.to = response.data.data.residents[0].email

    await sendgridMail.send(msg);

    return {
      statusCode: 200,
      headers: HEADERS,
      body: "Email queued successfully"
    };
  } catch (error) {
    console.log({ error });
    return { statusCode: 422, headers: HEADERS, body: String(error) };
  }
};
