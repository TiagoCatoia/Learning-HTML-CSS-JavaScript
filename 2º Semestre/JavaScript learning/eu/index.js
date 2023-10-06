const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csvtojson");

const porta = 8000;

const app = express();

//ToDo: Ajustar o controle do CORS antes do deploy
app.use(cors());

app.use(express.urlencoded({ extended: true }));


//Requisição de lista de alunos. DEVE exigir um token válido
app.get("/historico/:ticker", (req, res) => {
    const csvFilePath = `./dados/${req.params.ticker}.csv`;
    if (!fs.existsSync(csvFilePath)) {
        res.status(404).send("Ticker não disponível")
    } else {
        csv()
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                //console.log(jsonObj);
                res.status(200).json(jsonObj);
            })
    }

})

app.get("/historico/:ticker/:data", (req, res, next) => {
    const csvFilePath = `./dados/${req.params.ticker}.csv`;
    if (!fs.existsSync(csvFilePath)) {
        res.status(404).send("Ticker não disponível")
    } else {
        csv()
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                //console.log(jsonObj);
                const resultado = jsonObj.filter(cotacao => cotacao.Date === req.params.data);
                if (resultado.length === 0) {
                    res.status(404).send("Data não disponível")
                } else {
                    res.status(200).json(resultado);
                }
            })
    }

})


app.listen(porta, () => {
    console.log(`servidor rodando na porta ${porta}`);
})


// localhost:8000/historico/ticker 
//tickers disponíveis: teste (3 linhas), BBAS3, PETR3

// npm install
// node index.js
/*API Fetch
- requisição http sem mudança de página*/
// fetch(url) toda requisição http é feita com uma url(endereço (servidor/porta(onde está) e oque eu quero))