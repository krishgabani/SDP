// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.API_KEY);
// const fetch = require('esm')(module)('node-fetch');

// const validateEmail = async (email) => {
//     const url = 'https://api.sendgrid.com/v3/validations/email';
//     const apiKey = process.env.API_KEY;
  
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${apiKey}`
//       },
//       body: JSON.stringify({ email })
//     });
  
//     const data = await response.json();
  
//     return data.result;
// };
// module.exports = async (email) => {
//     await validateEmail(email).then(response => {
//         if (response === 'valid') {
//           return '1'
//         } else {
//           return '0'
//         }
//       })
//       .catch(error => {
//         console.error(error);
//         return '-1'
//       });
// }

