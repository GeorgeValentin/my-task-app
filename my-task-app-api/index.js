('use strict');

const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// authentication server logic
//app.use('/api/auth', authRoutes);

// tasks server logic
app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
