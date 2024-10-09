import Handlebars from 'handlebars';
import loginTemplate from './pages/login.hbs?raw';
import registerTemplate from './pages/register.hbs?raw';
import chatsTemplate from './pages/chats.hbs?raw';

class App {
    constructor() {
        this.routes = {
            '/login': Handlebars.compile(loginTemplate),
            '/register': Handlebars.compile(registerTemplate),
            '/chats': Handlebars.compile(chatsTemplate),
        };
        this.chats = [
            { id: 1, name: 'Чат 1' },
            { id: 2, name: 'Чат 2' },
        ];

        this.messages = {
            1: [{ text: 'Привет!' }, { text: 'Как дела?' }],
            2: [{ text: 'Добрый день!' }],
        };

        this.render();
    }

    render() {
        this.loadPage(location.hash.slice(1) || '/login');

        window.addEventListener('hashchange', () => {
            this.loadPage(location.hash.slice(1));
        });
    }

    loadPage(path) {
        const templateFunc = this.routes[path] || this.routes['/login'];
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = templateFunc();

        if (path === '/chats') {
            this.renderChatList();
        }
    }

    renderChatList() {
        const chatListContainer = document.getElementById('chatList');
        chatListContainer.innerHTML = ''; // Очищаем предыдущий список

        this.chats.forEach(chat => {
            const chatElement = document.createElement('div');
            chatElement.innerText = chat.name; // Имя чата
            chatElement.onclick = () => this.openChat(chat.id); // Открытие чата
            chatListContainer.appendChild(chatElement);
        });
    }

    openChat(chatId) {
        this.loadMessages(chatId);
        document.getElementById('chatWindow').style.display = 'block'; // Показываем окно чата
    }

    loadMessages(chatId) {
        this.renderMessages(chatId);
    }

    renderMessages(chatId) {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = ''; // Очищаем предыдущие сообщения

        (this.messages[chatId] || []).forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.innerText = message.text; // Текст сообщения
            messagesContainer.appendChild(messageElement);
        });

        // Добавляем обработчик для отправки сообщений
        const sendMessageButton = document.getElementById('sendMessage');
        sendMessageButton.onclick = () => this.sendMessage(chatId);
    }

    sendMessage(chatId) {
        const messageInput = document.getElementById('message');
        const messageText = messageInput.value;

        if (messageText.trim()) {
            // Добавляем сообщение в локальные данные
            if (!this.messages[chatId]) {
                this.messages[chatId] = [];
            }
            this.messages[chatId].push({ text: messageText });

            messageInput.value = ''; // Очищаем поле ввода
            this.renderMessages(chatId); // Обновляем сообщения
        }
    }
}

export default App;
