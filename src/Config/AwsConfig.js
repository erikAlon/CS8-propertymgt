require('dotenv').config();
const AWS = require('aws-sdk');
config = {
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  apiVersion: process.env.APIVERSION,
};

AWS.config.update(config);

let dbDoc = new AWS.DynamoDB.DocumentClient();

module.exports = dbDoc;
