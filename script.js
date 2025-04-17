// Elementos do DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const historyButton = document.getElementById('history-button');

// Array para armazenar o histórico de conversas
const conversationHistory = [];

// Função para rolar automaticamente para a última mensagem
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para mostrar o indicador de "digitando..."
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<span class="typing-dots">Digitando</span>';
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    return typingDiv;
}

// Função para remover o indicador de "digitando..."
function removeTypingIndicator(typingIndicator) {
    typingIndicator.remove();
}

// Função para adicionar mensagem ao chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    conversationHistory.push({ 
        message, 
        isUser,
        timestamp: new Date().toLocaleTimeString()
    });
    scrollToBottom();
}

// Função para gerar resposta usando a API do Gemini
async function generateResponse(userMessage) {
    try {
        // Usar a função callGeminiAPI definida no index.html
        if (!window.callGeminiAPI) {
            throw new Error('API Gemini não está inicializada. Por favor, recarregue a página.');
        }
        
        return await window.callGeminiAPI(userMessage);
    } catch (error) {
        console.error('Erro ao gerar resposta:', error);
        return 'Desculpe, tive um problema ao processar sua pergunta. Por favor, tente novamente.';
    }
}

// Função para enviar mensagem
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Verifica se a API Gemini está disponível
    if (!window.callGeminiAPI) {
        addMessage('Desculpe, a API Gemini não está inicializada. Por favor, recarregue a página.');
        return;
    }

    // Desabilita o input e o botão durante o processamento
    userInput.disabled = true;
    sendButton.disabled = true;
    
    // Adiciona a mensagem do usuário
    addMessage(message, true);
    userInput.value = '';
    
    // Mostra o indicador de digitação
    const typingIndicator = showTypingIndicator();
    
    try {
        // Gera e adiciona a resposta do bot
        const response = await generateResponse(message);
        removeTypingIndicator(typingIndicator);
        addMessage(response);
    } catch (error) {
        removeTypingIndicator(typingIndicator);
        addMessage('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.');
    } finally {
        // Reabilita o input e o botão após o processamento
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
    }
}

// Função para mostrar histórico
function showHistory() {
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';
    
    // Cria o cabeçalho do histórico
    const headerDiv = document.createElement('div');
    headerDiv.className = 'history-header';
    
    const historyTitle = document.createElement('div');
    historyTitle.className = 'history-title';
    historyTitle.textContent = '📜 Histórico de Conversas';
    headerDiv.appendChild(historyTitle);
    
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Voltar ao Chat';
    backButton.onclick = () => {
        chatMessages.innerHTML = '';
        conversationHistory.forEach(msg => {
            addMessage(msg.message, msg.isUser);
        });
    };
    headerDiv.appendChild(backButton);
    
    chatMessages.appendChild(headerDiv);
    
    // Agrupa as mensagens por assunto
    let currentSubject = '';
    let currentMessages = [];
    
    conversationHistory.forEach((msg, index) => {
        if (msg.isUser) {
            if (currentSubject) {
                addMessageGroup(currentSubject, currentMessages);
            }
            currentSubject = msg.message;
            currentMessages = [msg];
        } else {
            currentMessages.push(msg);
        }
        
        if (index === conversationHistory.length - 1 && currentSubject) {
            addMessageGroup(currentSubject, currentMessages);
        }
    });
    
    scrollToBottom();
}

// Função para adicionar grupo de mensagens no histórico
function addMessageGroup(subject, messages) {
    const chatMessages = document.querySelector('.chat-messages');
    
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'history-subject';
    subjectDiv.textContent = `💬 ${subject}`;
    chatMessages.appendChild(subjectDiv);
    
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `history-message ${msg.isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = msg.message;
        chatMessages.appendChild(messageDiv);
    });
    
    const separator = document.createElement('div');
    separator.className = 'history-separator';
    chatMessages.appendChild(separator);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona os event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    historyButton.addEventListener('click', showHistory);
    
    // Inicializar o histórico de conversa com a mensagem de boas-vindas
    if (conversationHistory.length === 0) {
        const welcomeMessage = document.querySelector('.message.bot-message');
        if (welcomeMessage) {
            conversationHistory.push({
                message: welcomeMessage.textContent,
                isUser: false,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    }
    
    // Configurar o foco inicial
    userInput.focus();
});