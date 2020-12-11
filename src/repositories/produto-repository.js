'use strict';
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = async () => {
    const res = await Produto
        .find({}, "_id descricao preco dataCadastro dataAtualizacao")
    return res;
}

exports.getByDescricao = async (descricao) => {
    const res = await Produto
        .findOne({
            descricao: descricao
        }, 'descricao preco dataCadastro dataAtualizacao');
    return res;
}

exports.create = async (data) => {
    var produto = new Produto(data);
    return await produto.save();
}

exports.update = async (data) => {
    await Produto
        .findByIdAndUpdate(data._id, {
            $set: {
                descricao: data.descricao,
                preco: data.preco,
                dataAtualizacao: new Date()
            }
        });
    const res = await Produto.findById(data._id);
    return res
}

exports.delete = async (id) => {
    await Produto
        .findOneAndRemove(id);
}