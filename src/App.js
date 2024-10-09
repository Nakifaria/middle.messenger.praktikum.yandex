import Handlebars from 'handlebars';
import loginTemplate from './pages/login.hbs?raw'; 
import registerTemplate from './pages/register.hbs?raw';

class App {
    constructor() {
        this.routes = {
            '/login': Handlebars.compile(loginTemplate), 
            '/register': Handlebars.compile(registerTemplate),
        };
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
    }
}

export default App;
