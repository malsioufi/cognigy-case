import App from './app';
import appRouter from './routes';

const app = new App(appRouter);
app.listen();
