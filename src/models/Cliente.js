'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    }, 
    senha: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true
    }, 
    dataNascimento: {
        type: String,
        required: true
    }, 
    dataCadastro: {
        type: Object,
        default: new Date()
    }, 
    dataAtualizacao: {
        type: Object,
        default: ''
    }
});

module.exports = mongoose.model("Cliente", schema);