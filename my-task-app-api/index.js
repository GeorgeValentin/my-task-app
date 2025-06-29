('use strict');

const express = require('express');
const cors = require('cors');

const serverPort = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(serverPort, async () => {
  console.log(`Server started on port ${serverPort}`);
});
