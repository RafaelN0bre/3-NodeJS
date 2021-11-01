const conexao = require('../infraestrutura/conexao')

const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        //Validação de data, deve ser após a data de criação, de acordo com o nosso modelo de negócio. Retorna bool
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome : 'data',
                valido : dataEhValida,
                mensagem : 'Data deve ser maior ou igual à data atual'
            }, 
            {
                nome : 'cliente',
                valido : clienteEhValido,
                mensagem : 'Nome do cliente deve ter ao menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido )
        // Se existem valores com campos não-válidos
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}

        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if (erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(atendimento)
            }
        })    
        }
        

    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (erro, resultados)=> {
            if(erro){
                res.status(400).json()
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`
        
        conexao.query(sql, (erro, resultados)=> {
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'


        //O segundo parêmtro é o valor que estarão inseridos na interrogação, como temos mais de uma, utilzamos um array
        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE From atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)

            }else{
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento