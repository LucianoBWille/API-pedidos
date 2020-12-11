global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo ao Node Store!';

module.exports = {
    connectionString: 'mongodb://127.0.0.1/db_api_pedidos',
    sendgridKey: 'your key', //substituir pois a cada uso, pois vou excluir essa chave
    containerConnectionString: 'SUA CONNECTION STRING'
}