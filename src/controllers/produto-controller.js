'use strict';

const repository = require('../repositories/produto-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByDescricao = async (req, res, next) => {
    try {
        var data = await repository.getByDescricao(req.query.descricao);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.isRequired(req.body.descricao, 'Descrição do produto é obrigatório')
    //contract.isRequired(req.body.preco, 'Preço do produto é obrigatório')

    if (contract.isNotValid()) {
        res.status(400).send(contract.errors()[0]).end();
        return;
    }

    try {
        const data = await repository.create({
            descricao: req.body.descricao,
            preco: req.body.preco,
            dataCadastro: new Date()
        });
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!',
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
            message: 'Produto atualizado com sucesso!',
            retorno: data
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.isRequired(req.body.id, 'Id não foi informado')

    if (contract.isNotValid()) {
        res.status(400).send(contract.errors()[0]).end();
        return;
    }
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};