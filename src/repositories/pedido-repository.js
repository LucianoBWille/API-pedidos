'use strict';
const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.get = async () => {
    const res = await Pedido
        .find({}, 
            "_id cliente produtos dataCadastro dataAtualizacao")
        .populate('Cliente', 'nome')
        .populate('items.Produto', 'descricao');
    return res;
}

exports.create = async (data) => {
    var pedido = new Pedido();
    pedido.cliente = data.cliente;
    pedido.dataCadastro = new Date();
    pedido.produtos = data.produtos;
    return await pedido.save();
}

exports.update = async (data) => {
    await Pedido
        .findByIdAndUpdate(data._id, {
            $set: {
                cliente: data.cliente,
                produtos: data.produtos,
                dataAtualizacao: new Date()
            }
        });
    const res = await Pedido.findById(data._id);
    return res
}

exports.delete = async (id) => {
    await Pedido
        .findOneAndRemove(id);
}