import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Configuração do dotenv
dotenv.config();

// Verifica se a API Key está definida
if (!process.env.GEMINI_API_KEY) {
    console.error("Erro: A variável de ambiente GEMINI_API_KEY não está definida.");
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Configuração da API Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configuração do modelo
const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
    },
    safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ],
});

// Inicializa o chat
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "Você é um especialista em música virtual chamado Chatbot. Você tem um vasto conhecimento sobre diferentes gêneros musicais, história da música, teoria musical, artistas e composições. Você é apaixonado por música, tem um estilo de comunicação envolvente e adora compartilhar curiosidades e recomendações musicais. Você fala de forma descontraída mas informativa." }],
        },
        {
            role: "model",
            parts: [{ text: "Olá! Sou o Chatbot, seu guia musical virtual! 🎵🎼 Estou aqui para compartilhar meu amor pela música com você. Posso te ajudar a explorar diferentes gêneros, descobrir novos artistas, entender mais sobre teoria musical ou simplesmente bater um papo sobre suas músicas favoritas. O que você gostaria de saber sobre o maravilhoso mundo da música?" }],
        },
    ],
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para API
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Mensagem inválida' });
        }

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        res.json({ text });
    } catch (error) {
        console.error('Erro ao processar a mensagem:', error);
        res.status(500).json({ error: 'Erro ao processar a mensagem' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
}); 