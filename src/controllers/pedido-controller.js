'use strict';

const repository = require('../repositories/pedido-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send({
            lista: data,
            message: "Sucesso"
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    /*
    if (!req.body.cliente) {
        res.status(401).send({
            message: 'Cliente é obrigatório'
        }).end();
        return;
    }
    */

    let contract = new ValidationContract()
    contract.isRequired(req.body.cliente, 'Cliente é obrigatório')

    if (contract.isNotValid()) {
        res.status(400).send(contract.errors()[0]).end();
        return;
    }

    try {
        const data = await repository.create(req.body);
        /*{
            cliente: req.body.cliente,
            dataCadastro: new Date(),
            produtos: data.produtos
        });*/
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!',
            retorno: data
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async (req, res, next) => {
    /*
    if (!req.body._id) {
        res.status(401).send({
            message: 'Id não foi informado'
        });
        return;
    }
    */

    let contract = new ValidationContract()
    contract.isRequired(req.body._id, 'Id não foi informado')

    if (contract.isNotValid()) {
        res.status(400).send(contract.errors()[0]).end();
        return;
    }

    try {
        const data = await repository.update(req.body);
        res.status(200).send({
            message: 'Cliente atualizado com sucesso!',
            retorno: data
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Cliente removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};