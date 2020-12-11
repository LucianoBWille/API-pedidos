'use strict';
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.get = async () => {
    const res = await Cliente
        .find({}, "_id nome senha email dataNascimento dataCadastro dataAtualizacao")
    return res;
}

exports.getByNome = async (nome) => {
    const res = await Cliente
        .findOne({
            nome: nome
        }, 'nome senha email dataNascimento dataCadastro dataAtualizacao');
    return res;
}

exports.create = async (data) => {
    var cliente = new Cliente(data);
    return await cliente.save();
}

exports.update = async (data) => {
    await Cliente
        .findByIdAndUpdate(data._id, {
            $set: {
                nome: data.nome,
                dataNascimento: data.dataNascimento,
                dataAtualizacao: new Date()
            }
        });
    const res = await Cliente.findById(data._id);
    return res
}

exports.delete = async (id) => {
    await Cliente
        .findOneAndRemove(id);
}