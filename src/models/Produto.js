'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    descricao: {
        type: String,
        required: true,
        trim: true
    }, 
    preco: {
        type: Number,
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

module.exports = mongoose.model("Produto", schema);