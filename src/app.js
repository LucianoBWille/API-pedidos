'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const debug = require('debug')('api-pedidos:server');

const config = require('./config')
/*
const dbHandler = require('./db-handler');
dbHandler.connect();
*/

const app = express();
const router = express.Router();
/*
//conecta ao banco
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer({
    instance: {
        dbName: "db_api_pedidos", // by default generate random dbName
        port: 36385
      }
});

mongoose.Promise = Promise;
mongoServer.getUri().then((mongoUri) => {
    const mongooseOpts = {
        // options for mongoose 4.11.3 and above
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
        /*,
        reconnectInterval: 1000,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
    };*/
/*
    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
    });

    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
});*/

//mongoose.connect('localhost:27017/db_api_pedidos')
//var mongoDB = 'mongodb://127.0.0.1/db_api_pedidos';
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//carrega models
const Produto = require('./models/Produto');
const Cliente = require('./models/Cliente');
const Pedido = require('./models/Pedido');

//carrega Rotas
const indexRoute = require('./routes/index-route')
const produtoRoute = require('./routes/produto-route')
const clienteRoute = require('./routes/cliente-route')
const pedidoRoute = require('./routes/pedido-route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRoute);



//servidor
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizePort(val){
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }

    return false;
}

function onError(error){
    if (error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
            'Pipe ' + port :
            'Port ' + port;

    switch(error.code){
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE0':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipi ' + addr
        : 'port ' + addr.port;
    debug('Listening on '+ bind);
}

module.exports = app;