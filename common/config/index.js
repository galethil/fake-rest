const port = process.env.PORT || 8080;
const baseURL = `${process.env.BASE_URL || 'http://localhost'}:${port}`;
module.exports = {
  // The secret for the encryption of the jsonwebtoken
  frontendURL: 'http://localhost:3000',
  baseURL: baseURL,
  port: port
};