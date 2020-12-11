'use strict';

const repository = require('../repositories/cliente-repository');
const ValidationContract = require('../validators/fluent-validator');
const md5 = require('md5')
const config = require('../config')
const emailService = require('../services/email-service')

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

exports.getByNome = async (req, res, next) => {
    try {
        var data = await repository.getByNome(req.query.nome);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    /*
    if (req.body.nome.length < 1) {
        res.status(400).send({
            message: 'Nome Cliente é obrigatório'
        }).end();
        return;
    }
    */

   let contract = new ValidationContract()
   contract.isRequired(req.body.nome, 'Nome Cliente é obrigatório')
   contract.hasMinLen(req.body.nome, 3, 'O nome do cliente deve ter pelo menos 3 caracteres' )
   contract.isEmail(req.body.email, 'Email informado não é válido' )
   contract.hasMinLen(req.body.senha, 6, 'A senha deve ter pelo menos 6 caracteres' )

   if (contract.isNotValid()) {
       res.status(400).send(contract.errors()[0]).end();
       return;
   }

    try {
        const data = await repository.create({
            nome: req.body.nome,
            dataNascimento: req.body.dataNascimento,
            senha: md5(req.body.senha + global.SALT_KEY),
            email: req.body.email,
            dataCadastro: new Date()
        });

        //emailService.send(req.body.email, 'Bem vindo ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.nome))

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!',
            retorno: data
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e
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