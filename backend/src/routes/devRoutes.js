const express = require('express');
const server = require('../index.js');
const router = express.Router(); //  eslint-disable-line new-cap

//  This is really buggy as it doesn't understand the server object
router.get('/close', (req, res) => {
  process.stdout.write(`Closing backend server... `);
  res.redirect('/');
  server.close((err) => {
    console.log(`${err ? 'FAILED' : 'SUCCESSFUL'}`);
    process.exit(err ? 1 : 0);
  });
});

//  eslint-disable-next-line no-unused-vars
function closeServer(server) {
  process.stdout.write(`Closing backend server... `);

  server.close((err) => {
    console.log(`${err ? 'FAILED' : 'SUCCESSFUL'}`);
    process.exit(err ? 1 : 0);
  });
}

module.exports = router;
