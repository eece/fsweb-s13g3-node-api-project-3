const express = require('express');
const usersRouter = require('./users/users-router');
const { logger } = require('./middleware/middleware');


const server = express();
server.use(express.json());
server.use(logger);

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

server.use('/api/users', usersRouter);
// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
