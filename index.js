//Importar o módulo 'express para criar um aplicativo Express
const express = require('express')

//Criar uma instância do aplicativo Express
const app = express()

//Definir a porta onde o servidor irá escutar
const port = 3000

//Importar o módulo 'path' para lidar com caminhos de arquivos e diretórios
const path = require('path')

//Importar o módulo Handlebars
const exphbs = require('express-handlebars')

//Adicionando o CSS
app.use(express.static('public'))//Pasta para disponibilizar os arquivos CSS

//Configure template handlebars
app.engine('handlebars', exphbs.engine())//Motor de manipulação do HTML
app.set('view engine', 'handlebars')

//Configurar middleware para fazer o parse de dados enviados por fomulários
//Configurado para aceitar dados no estilo JSON
app.use(
    express.urlencoded({
        // A biblioteca 'qs' é usada para analisar dados no estilo JSON
        // Exemplo Json: {"animal":{"tipo":"cachorro","raça":"vira-lata","idade":3}}
        extended: true 
    }
    )
)

//Configurar midleware para fazer o parse de solicitações no formato JSON
app.use(express.json())

//Configurar uma rota para a página inicial ('/')
app.get('/', (req, res)=>{
    //Envia o arquivo 'login.handlerbars' como resposta para a solicitação
    res.render('login')
})



//Configurar uma rota para a próxima página ('../01 - NODE/templates/home.html')
app.get('/user/home', (req, res)=>{
    //Envia o arquivo 'login.html' como resposta para a solicitação
    res.render('home')
})


//Configurar uma rota para lidar com solicitações de salvar dados de usuários ('/')
app.post('/', (req, res)=>{
    //Extrair os dados 'login' e 'senha'do corpo da solicitação
    const email = req.body.email
    const senha = req.body.senha
    //Exibir os dados no console do servidor
    console.log('[REQUERIMENTO] E-mail: '+email+' - Senha: '+senha)
})

//Iniciar o servidor e fazê-lo escutar na porta especificada
app.listen(port, ()=>{
    console.log('Server Started!')
})

//Página de erro 404
app.use(function(req, res) {
    res.render('404', { url: req.url })
});
