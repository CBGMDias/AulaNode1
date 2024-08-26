const express = require('express');
const rotas = require('./routes');
const axio = require('axios');

const app = express();

app.use(express.json());
app.use('/api', rotas);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/route', (req, res) => {
    res.send('Minha Primeira Rota');
});

app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep; // Obtendo o CEP da URL
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)){
        return res.status(400).send('CEP inválido. Formato: XXXXX-XXX');
    }

    try{
        // Fazendo requisição para a API do ViaCEP
        const response = await axio.get(`https://viacep.com.br/ws/${cep}/json/`);
        res.json(response.data); // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        res.status(500).send('Erro ao consultar o CEP');
    }    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));