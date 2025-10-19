// require your server and launch it
const server = require('./api/server.js');
require('dotenv').config();
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});