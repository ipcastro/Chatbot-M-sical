require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Express
app.use(express.json());
app.use(express.static('public'));

// Inicialização do Gemini
const genAI = new GoogleGenerativeAI("AIzaSyCAWuWXyYs7uxzED5Db6ep0O10SxWL7WlQ");
let chat;

// Rota para servir o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para o chat
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensagem é obrigatória' });
        }

        // Inicializa o chat se ainda não foi inicializado
        if (!chat) {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: "Você é um chatbot musical especializado em responder perguntas sobre música, artistas, gêneros musicais e teoria musical. Responda sempre em português do Brasil."
                    },
                    {
                        role: "model",
                        parts: "Olá! Sou um chatbot musical e estou aqui para ajudar com qualquer dúvida sobre música. Posso falar sobre artistas, gêneros musicais, teoria musical, instrumentos e muito mais. Como posso ajudar você hoje?"
                    }
                ]
            });
        }

        // Envia a mensagem para o Gemini
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao processar a mensagem' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
}); 