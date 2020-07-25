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
  html: ""
};

sendgridMail.setApiKey(SENDGRID_API_KEY);

exports.handler = async (event) => {
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
  const trigger = requestBody.trigger.name; //approved_booking
  const availabilityStatus = requestBody.event.data.new['is_available'];
  const data = {
    url: 'http://benzeeresidency.com/'
  }

  msg.html = parseEmailBody(trigger, availabilityStatus, data);

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
      console.log({response})
    // console.log(JSON.stringify(response))

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


export function parseEmailBody(trigger, availabilityStatus, data = {}) {
  let emailBody;

  if (trigger === 'new_booking') {
      emailBody = `
        <tr>
          <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p>
                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thanks for choosing BenZee Residency. we have recieved your Request for Accommodation. </p>

                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Kindly, wait as we confirm availablity and revert. Thank you for your patience!</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
  }

  if (trigger === 'approved_booking') {
    switch (availabilityStatus) {
      case true:
        emailBody = `
          <tr>
            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                <tr>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p>
                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you for choosing BenZee Residency. Your booking request has been approved! Click the button below to pay for your booking. </p>
                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">To complete your booking, you are to pay a booking fee of <b>GHs550.00</b> and make either <b>Half or Full payment of your fees within 30 days</b> after paying your booking or you loose your room and booking.</p>
                    <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                      <tbody>
                        <tr>
                          <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                              <tbody>
                                <tr>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="${data.url}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Pay Booking</a> </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="font-size: 8px;">Button not working? Copy or use link => ${data.url}</p>                      
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        `
        break;
      case false:
        emailBody = `
          <tr>
            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                <tr>
                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p>
                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">We are sorry to inform you that we do not have rooms available per your room type. </p>

                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">We strongly suggest you request another room type.</p>
                    <p style="font-size: 8px;">We deeply regret any inconvienience caused  </p>                      
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
        break;
    }
  }

  return `
      <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>BenZee Residency</title>
            <style>
            /* -------------------------------------
                INLINED WITH htmlemail.io/inline
            ------------------------------------- */
            /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
            @media only screen and (max-width: 620px) {
              table[class=body] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
              }
              table[class=body] p,
                    table[class=body] ul,
                    table[class=body] ol,
                    table[class=body] td,
                    table[class=body] span,
                    table[class=body] a {
                font-size: 16px !important;
              }
              table[class=body] .wrapper,
                    table[class=body] .article {
                padding: 10px !important;
              }
              table[class=body] .content {
                padding: 0 !important;
              }
              table[class=body] .container {
                padding: 0 !important;
                width: 100% !important;
              }
              table[class=body] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
              table[class=body] .btn table {
                width: 100% !important;
              }
              table[class=body] .btn a {
                width: 100% !important;
              }
              table[class=body] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
              }
            }

            /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
            @media all {
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                line-height: 100%;
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
              .btn-primary table td:hover {
                background-color: #34495e !important;
              }
              .btn-primary a:hover {
                background-color: #34495e !important;
                border-color: #34495e !important;
              }
            }
            </style>
          </head>
          <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                    <!-- START CENTERED WHITE CONTAINER -->
                    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">BenZee Residency Request Update</span>
                    <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

                      <!-- START MAIN CONTENT AREA -->
                      ${emailBody}
                      <!-- END MAIN CONTENT AREA -->
                    </table>

                    <!-- START FOOTER -->
                    <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                        <tr>
                          <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                            <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">BenZee Residency, Adjringanor - East Legon</span>
                            <br>
                            <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;"> Tel: (233) 054 513 2507</span> 
                          </td>
                        </tr>
          
                      </table>
                    </div>
                    <!-- END FOOTER -->

                  <!-- END CENTERED WHITE CONTAINER -->
                  </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
  `;
}