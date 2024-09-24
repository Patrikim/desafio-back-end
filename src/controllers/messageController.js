const messageModel = require('../models/messageModel');

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido. Deve ser numérico.' });
  }

  const validStatus = ['ENVIADO', 'RECEBIDO', 'ERRO DE ENVIO'];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: 'Status inválido.' });
  }

  try {
    const result = await messageModel.updateStatus(id, status);
    if (!result) {
      return res.status(404).json({ error: 'Mensagem não encontrada.' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o status.' });
  }
};

exports.getMessagesByStatus = async (req, res) => {
  const { status } = req.params;
  
  const validStatus = ['ENVIADO', 'RECEBIDO', 'ERRO DE ENVIO'];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: 'Status inválido.' });
  }

  try {
    const messages = await messageModel.getMessagesByStatus(status);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar o relatório.' });
  }
};

exports.createMessage = async (req, res) => {
  const { content, status } = req.body;

  if (!content || !status) {
      return res.status(400).json({ error: 'Conteúdo e status são obrigatórios.' });
  }

  try {
      const newMessage = await messageModel.createMessage(content, status);
      res.status(201).json(newMessage);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar a mensagem.' });
  }
};

