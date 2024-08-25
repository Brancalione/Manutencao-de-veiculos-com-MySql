const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { sequelize } = require('./models/index');
const { Veiculos  } = require('./models/index');

// Cria uma aplicação Express
const app = express();

//Manipula o que vem da requisção e transforma em objeto o json
app.use(express.json());

// Permite pode receber solicitações do front
app.use(cors({ origin: 'http://localhost:5173' }));

//Ao utilizar /api nas requisções, vai ser direcionado para o arquivo routes.js
app.use("/api", require("./routes"));

//Executa rotina diária com CRON todos os dias às 17h
cron.schedule('58 23 * * *', async () => {
  try {
    const dataAtual = new Date();
    const seisMesesAtras = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 6, dataAtual.getDate(), 0, 0, 0, 0);
    seisMesesAtras.setUTCHours(0, 0, 0, 0);

    // Busca registros antigos no MySQL
    const registrosAntigos = await Veiculos.findAll({
      where: {
        dataManu: seisMesesAtras
      }
    });

    if (registrosAntigos.length > 0) {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'seu_email@gmail.com',
          pass: 'sua chave'
        }
      });

      for (let veiculo of registrosAntigos) {
        await transporter.sendMail({
          from: 'App <seu_email@gmail.com>',
          to: veiculo.email,
          subject: 'Manutenção do Veículo',
          html: `Olá,<br><br>
          Este é um lembrete de que fazem 6 meses desde a última manutenção do seu veículo.<br>
          Recomendamos agendar uma nova manutenção o quanto antes.<br><br>`
        });
        console.log(`Email enviado para ${veiculo.email}`);
      }
    } else {
      console.log("Não existem registros com mais de 6 meses!");
    }
  } catch (error) {
    console.error("Erro ao verificar registros antigos:", error);
  }
});

//Inicia o servidor na porta '3000'
app.listen(3000, () => {
  console.log('Aplicativo rodando na porta 3000');

  // Testa a conexão com o banco de dados
  sequelize.authenticate()
    .then(() => {
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
      console.error('Não foi possível conectar ao banco de dados:', err);
    });
});
