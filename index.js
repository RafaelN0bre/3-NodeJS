// Importando o CustomExpress
const customExpress = require('./config/customExpress')

const Tabelas = require('./infraestrutura/tabelas')
//Adicionando um get padrão
// É necessário derrubar o servidor e rodar novamente, nõa basta atualizar a página
    //app.get('/', (req, res) => res.send('Servidor rodando, tudo ok'))
    //Tranferindo para controllers/atendimentos
    //app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))

const conexao = require('./infraestrutura/conexao')

//Não faz muito sentido lançarmos o banco de dados depois de lançar o servidor, então colocamos o lançamento do servidor dentro da conexão do banco de dados, caso não haja erro.

conexao.connect((erro) => {
    if(erro){
        console.log(erro)
    }else{
        console.log('Conectado com Sucesso')

        Tabelas.init(conexao)

        //Como estamos importando o módulo, devemos iniciá-lo também aqui

        const app = customExpress()

        //Subindo servidor
        // Para rodar, basta --> node index.js

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})
