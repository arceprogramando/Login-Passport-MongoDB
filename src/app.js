import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import configObject from './config/config.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.routes.js';
import mongoDBConnection from './dao/db/config/mongo.config.js';
import sessionRoutes from './routes/session.routes.js';

const app = express();
const env = configObject;
app.use(cors());
app.use(cookieParser());

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.set('PORT', env.PORT || 8080);
app.set('NODE_ENV', env.NODE_ENV || 'development');

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: env.DB_CNN,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 50,
    }),
    secret: 'mi_clave_secreta',
    saveUninitialized: false,
    resave: false,
  }),
);

const server = app.listen(app.get('PORT'), () => {
  console.log(`=Encendido servidor en puerto ${app.get('PORT')}= \n====== http://localhost:${app.get('PORT')}/ =====`);
  console.log(`==========ENV:${app.get('NODE_ENV')}==========`);
  console.log('===============^^^^^===============');
  displayRoutes(app);
});

mongoDBConnection();

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/session', sessionRoutes);

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(data);
  });
});
