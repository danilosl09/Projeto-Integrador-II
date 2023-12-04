const express = require("express")
const routes = require("./routes/routes")
const path = require("path")
require("./config/associations")
const methodOverride = require('method-override');  




const server = express()
const port = 3000

//criando um middleware para que substitua requisições POST ou GET por outras quando a URL possui "_method"
server.use(methodOverride("_method",{methods:["POST","GET"]}));

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(routes)

//avisando o express sobre um repositório estático no projeto
server.use(express.static(path.join(__dirname,"public")))

server.set("public", path.join(__dirname,"public"))

//avisando o express do local das views
server.set("views", path.join(__dirname,"views"))
//setando a engine utilizada para visualização: EJS
server.set("view engine","ejs")


server.listen(port,()=>{
    console.log("Servidor executando na porta " + port)
})