const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// const cwd = process.cwd();// 이것은 무엇인가

const PORT = process.env.port || 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(` running on port ${PORT}!`);
  });
});
