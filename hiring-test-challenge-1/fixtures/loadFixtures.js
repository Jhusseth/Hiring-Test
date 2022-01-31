/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const DangerMessages = require('./DangerMessages.json');
const InfoMessages = require('./InfoMessages.json');
const InvalidWords = require('./InvalidWords.json');
const WarningMessages = require('./WarningMessages.json');

const basePath = 'http://localhost:3000/api/v1';

async function callEndpoint(method, url, data) {
  try {
    await axios({
      method, url: `${basePath}${url}`, data
    });
  } catch (e) {
    console.log(`❌ Error calling ${url}:\n \x1b[31m${JSON.stringify(e.response.data)}\n\n \x1b[0m`);
  }
}

async function loadMessages() {
  const url = '/message';

  for (let i = 0; i < DangerMessages.length; i += 1) {
    const message = { message: DangerMessages[i]};

    await callEndpoint('post', url, message);
  }

  for (let i = 0; i < InfoMessages.length; i += 1) {
    const message = { message: InfoMessages[i]};

    await callEndpoint('post', url, message);
  }

  for (let i = 0; i < InvalidMessages.length; i += 1) {
    const message = { message: InvalidMessages[i]};

    await callEndpoint('post', url, message);
  }

  for (let i = 0; i < WarningMessages.length; i += 1) {
    const message = { message: WarningMessages[i]};

    await callEndpoint('post', url, message);
  }

  console.log('\x1b[32m', '✅ messages sent. \x1b[0m');
}

async function loadFixtures() {
  await loadMessages();
}

loadFixtures();
