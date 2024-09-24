const express = require('express');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(express.json());

app.use('/api/messages', messageRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
