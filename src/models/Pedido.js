'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    }, 
    dataCadastro: {
        type: Object,
        default: new Date()
    }, 
    dataAtualizacao: {
        type: Object,
        default: ''
    },
    produtos: [{
        quantidade: {
            type: Number,
            required: true,
            default: 1
        },
        descricao: {
            type: String,
            required: true,
            trim: true
        }, 
        preco: {
            type: Number,
            required: true
        },
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
});

module.exports = mongoose.model('Pedido', schema);