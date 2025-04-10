// Elementos do DOM
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Função para adicionar mensagem ao chat
function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para gerar resposta inteligente
function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Respostas para diferentes tipos de perguntas
    if (lowerMessage.includes('gênero') || lowerMessage.includes('estilo')) {
        return 'Existem muitos gêneros musicais interessantes! Alguns dos mais populares incluem:\n' +
               '🎵 Pop\n' +
               '🎸 Rock\n' +
               '🎹 Eletrônica\n' +
               '🎷 Jazz\n' +
               '🎻 Clássica\n' +
               '🎤 MPB\n' +
               '🎶 Sertanejo\n' +
               '🎺 Forró\n' +
               '🎼 Bossa Nova\n' +
               '🎪 Funk\n' +
               '🎤 Rap\n' +
               '🎸 Metal\n' +
               '🎹 Blues\n' +
               '🎷 Reggae\n' +
               'Qual desses gêneros você gostaria de explorar mais?';
    }
    else if (lowerMessage.includes('artista') || lowerMessage.includes('cantor') || lowerMessage.includes('banda') || 
             lowerMessage.includes('taylor') || lowerMessage.includes('harry') || lowerMessage.includes('ariana') ||
             lowerMessage.includes('weeknd') || lowerMessage.includes('weekend')) {
        
        if (lowerMessage.includes('weeknd') || lowerMessage.includes('weekend')) {
            return 'The Weeknd é um dos maiores artistas da atualidade! 🎤\n' +
                   'Algumas informações sobre ele:\n' +
                   '🎵 Nome real: Abel Tesfaye\n' +
                   '🎸 Gênero: R&B/Pop\n' +
                   '🎹 Álbuns famosos: "After Hours", "Dawn FM", "Starboy", "Beauty Behind the Madness"\n' +
                   '🎤 Músicas icônicas: "Blinding Lights", "Starboy", "Save Your Tears", "Die For You"\n' +
                   '🎶 Curiosidade: Ele começou sua carreira postando músicas anonimamente no YouTube\n' +
                   '🎵 Prêmios: Vencedor de vários Grammys e Billboard Music Awards\n' +
                   'Gostaria de saber mais sobre algum álbum ou música específica dele?';
        }
        else if (lowerMessage.includes('taylor')) {
            return 'Taylor Swift é uma das maiores artistas da atualidade! 🎤\n' +
                   'Algumas informações sobre ela:\n' +
                   '🎵 Gênero: Pop/Country\n' +
                   '🎸 Álbuns famosos: "1989", "Red", "Folklore", "Midnights"\n' +
                   '🎹 Músicas icônicas: "Love Story", "Shake It Off", "Blank Space", "Anti-Hero"\n' +
                   '🎤 Curiosidade: Ela começou sua carreira no country e depois migrou para o pop\n' +
                   '🎶 Prêmios: Vencedora de 12 Grammys e vários outros prêmios\n' +
                   'Gostaria de saber mais sobre algum álbum ou música específica dela?';
        }
        else if (lowerMessage.includes('harry')) {
            return 'Harry Styles é um cantor britânico muito talentoso! 🎸\n' +
                   'Algumas informações sobre ele:\n' +
                   '🎵 Gênero: Pop/Rock\n' +
                   '🎸 Álbuns: "Harry Styles", "Fine Line", "Harry\'s House"\n' +
                   '🎹 Músicas famosas: "Sign of the Times", "Watermelon Sugar", "As It Was"\n' +
                   '🎤 Curiosidade: Ele começou sua carreira na banda One Direction\n' +
                   '🎶 Prêmios: Vencedor de Brit Awards e Grammy\n' +
                   'Gostaria de saber mais sobre sua carreira ou músicas?';
        }
        else if (lowerMessage.includes('ariana')) {
            return 'Ariana Grande é uma das maiores estrelas do pop atual! 🎤\n' +
                   'Algumas informações sobre ela:\n' +
                   '🎵 Gênero: Pop/R&B\n' +
                   '🎸 Álbuns: "Thank U, Next", "Sweetener", "Positions"\n' +
                   '🎹 Músicas famosas: "Thank U, Next", "7 Rings", "Positions"\n' +
                   '🎤 Curiosidade: Ela começou sua carreira como atriz na Broadway\n' +
                   '🎶 Prêmios: Vencedora de vários MTV Video Music Awards e Grammy\n' +
                   'Gostaria de saber mais sobre sua música ou carreira?';
        }
        else {
            return 'Que ótimo que você se interessa por artistas! Posso te falar sobre:\n\n' +
                   '🎤 Artistas Internacionais:\n' +
                   '- The Weeknd (R&B/Pop)\n' +
                   '- Taylor Swift (Pop/Country)\n' +
                   '- Harry Styles (Pop/Rock)\n' +
                   '- Ariana Grande (Pop/R&B)\n' +
                   '- Ed Sheeran (Pop)\n' +
                   '- Billie Eilish (Pop Alternativo)\n' +
                   '- Drake (Hip Hop/Rap)\n' +
                   '- Beyoncé (R&B/Pop)\n' +
                   '- Justin Bieber (Pop)\n' +
                   '- Dua Lipa (Pop)\n\n' +
                   '🎸 Artistas Brasileiros:\n' +
                   '- MPB: Caetano Veloso, Chico Buarque, Elis Regina, Gilberto Gil, Maria Bethânia\n' +
                   '- Rock: Legião Urbana, Titãs, Paralamas do Sucesso, Raul Seixas, Cazuza\n' +
                   '- Pop: Anitta, Pabllo Vittar, Luísa Sonza, Ludmilla, Iza\n' +
                   '- Sertanejo: Marília Mendonça, Jorge & Mateus, Henrique & Juliano, Maiara & Maraisa\n' +
                   '- Forró: Luiz Gonzaga, Dominguinhos, Elba Ramalho, Alceu Valença\n' +
                   '- Bossa Nova: Tom Jobim, João Gilberto, Vinícius de Moraes, Nara Leão\n\n' +
                   'Sobre qual artista você gostaria de saber mais?';
        }
    }
    else if (lowerMessage.includes('instrumento')) {
        return 'Os instrumentos musicais são fascinantes! Aqui estão algumas categorias:\n' +
               '🎸 Cordas: Violão, Guitarra, Baixo, Violino, Viola, Violoncelo, Contrabaixo, Cavaquinho, Bandolim\n' +
               '🎹 Teclas: Piano, Teclado, Órgão, Acordeão, Sanfona\n' +
               '🥁 Percussão: Bateria, Pandeiro, Tambor, Atabaque, Surdo, Cuíca, Reco-reco, Agogô\n' +
               '🎷 Sopro: Saxofone, Flauta, Trompete, Trombone, Clarineta, Oboé, Fagote\n' +
               '🎺 Instrumentos típicos brasileiros: Berimbau, Pífano, Rabeca, Zabumba, Triângulo\n' +
               'Qual instrumento você gostaria de aprender a tocar?';
    }
    else if (lowerMessage.includes('teoria') || lowerMessage.includes('nota') || lowerMessage.includes('acorde')) {
        return 'A teoria musical é fundamental! Vou te explicar alguns conceitos básicos:\n' +
               '🎼 As notas musicais são: Dó, Ré, Mi, Fá, Sol, Lá, Si\n' +
               '🎵 Os acordes são formados por três ou mais notas tocadas juntas\n' +
               '🎹 A escala maior é formada por uma sequência específica de tons e semitons\n' +
               '🎸 Os intervalos são as distâncias entre as notas\n' +
               '🎶 O ritmo é a organização dos sons no tempo\n' +
               '🎵 A harmonia é o estudo dos acordes e suas relações\n' +
               '🎼 A melodia é a sequência de notas que formam uma linha musical\n' +
               'Gostaria de saber mais sobre algum desses conceitos?';
    }
    else if (lowerMessage.includes('música') || lowerMessage.includes('canção') || lowerMessage.includes('hit')) {
        return 'Que legal que você quer falar sobre músicas! Posso te falar sobre:\n\n' +
               '🎵 Músicas Internacionais:\n' +
               '- "Blinding Lights" - The Weeknd\n' +
               '- "Anti-Hero" - Taylor Swift\n' +
               '- "As It Was" - Harry Styles\n' +
               '- "7 Rings" - Ariana Grande\n' +
               '- "Shape of You" - Ed Sheeran\n' +
               '- "Bad Guy" - Billie Eilish\n' +
               '- "God\'s Plan" - Drake\n' +
               '- "Single Ladies" - Beyoncé\n' +
               '- "Stay" - Justin Bieber\n' +
               '- "Don\'t Start Now" - Dua Lipa\n\n' +
               '🎶 Músicas Brasileiras:\n' +
               '- "Águas de Março" - Tom Jobim\n' +
               '- "Construção" - Chico Buarque\n' +
               '- "O Bêbado e a Equilibrista" - Elis Regina\n' +
               '- "Trem das Onze" - Adoniran Barbosa\n' +
               '- "Como Nossos Pais" - Elis Regina\n' +
               '- "Aquarela do Brasil" - Ary Barroso\n' +
               '- "Garota de Ipanema" - Tom Jobim e Vinícius de Moraes\n' +
               '- "Chega de Saudade" - João Gilberto\n' +
               '- "O Que É, O Que É?" - Gonzaguinha\n' +
               '- "Pais e Filhos" - Legião Urbana\n\n' +
               'Qual dessas músicas você gostaria de conhecer melhor?';
    }
    else if (lowerMessage.includes('história') || lowerMessage.includes('origem')) {
        return 'A história da música é fascinante! Vou te contar um pouco:\n' +
               '🎼 A música existe desde os tempos pré-históricos\n' +
               '🎵 No Brasil, temos influências de:\n' +
               '   - Música indígena\n' +
               '   - Música africana\n' +
               '   - Música europeia\n' +
               '🎶 Alguns movimentos importantes:\n' +
               '   - Bossa Nova (anos 50/60)\n' +
               '   - Tropicália (anos 60/70)\n' +
               '   - Jovem Guarda (anos 60)\n' +
               '   - Rock brasileiro (anos 80)\n' +
               'Gostaria de saber mais sobre algum desses períodos?';
    }
    else if (lowerMessage.includes('carreira') || lowerMessage.includes('profissão')) {
        return 'Existem várias carreiras na área da música! Algumas opções são:\n' +
               '🎤 Cantor/Cantora\n' +
               '🎸 Músico Instrumentista\n' +
               '🎹 Professor de Música\n' +
               '🎼 Compositor\n' +
               '🎵 Produtor Musical\n' +
               '🎷 Arranjador\n' +
               '🎺 Regente\n' +
               '🎻 Luthier (construtor de instrumentos)\n' +
               '🎪 DJ\n' +
               '🎤 Técnico de Som\n' +
               'Qual dessas carreiras te interessa mais?';
    }
    else if (lowerMessage.includes('ajuda') || lowerMessage.includes('o que você pode fazer') || lowerMessage.includes('quais perguntas')) {
        return 'Posso te ajudar com várias coisas relacionadas à música! Aqui estão alguns exemplos de perguntas que você pode fazer:\n\n' +
               '🎵 Sobre gêneros musicais:\n' +
               '- "Quais são os principais gêneros musicais?"\n' +
               '- "Me fale sobre o gênero MPB"\n\n' +
               '🎤 Sobre artistas:\n' +
               '- "Quem são os principais artistas brasileiros?"\n' +
               '- "Me recomende algumas bandas de rock"\n\n' +
               '🎸 Sobre instrumentos:\n' +
               '- "Quais são os tipos de instrumentos musicais?"\n' +
               '- "Me fale sobre instrumentos de corda"\n\n' +
               '🎼 Sobre teoria musical:\n' +
               '- "O que são notas musicais?"\n' +
               '- "Me explique sobre acordes"\n\n' +
               '🎹 Sobre músicas:\n' +
               '- "Quais são algumas músicas brasileiras famosas?"\n' +
               '- "Me recomende algumas músicas clássicas"\n\n' +
               '📚 Sobre história:\n' +
               '- "Me conte sobre a história da música brasileira"\n' +
               '- "Qual a origem da Bossa Nova?"\n\n' +
               '💼 Sobre carreira:\n' +
               '- "Quais são as carreiras na área da música?"\n' +
               '- "Como posso me tornar um músico profissional?"\n\n' +
               'Qual desses temas você gostaria de explorar?';
    }
    else {
        return 'Desculpe, não entendi muito bem sua pergunta. Se precisar de ajuda para saber o que perguntar, é só digitar "ajuda" ou "quais perguntas você pode responder?"';
    }
}

// Função para enviar mensagem
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Adiciona mensagem do usuário
    addMessage(message, true);
    userInput.value = '';

    // Simula uma resposta do bot
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, false);
    }, 1000);
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Mensagem inicial do bot
addMessage('Olá! Sou o Chatbot Músical, seu guia musical virtual! 🎵🎼 Estou aqui para compartilhar meu amor pela música com você.\n\nPosso te ajudar com vários temas musicais. Se você não souber o que perguntar, é só digitar "ajuda" e eu te mostro algumas sugestões de perguntas que posso responder.\n\nO que você gostaria de saber sobre o maravilhoso mundo da música?', false); 