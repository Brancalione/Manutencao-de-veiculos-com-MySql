const { Veiculos } = require('../models/');

module.exports = {
  async index(req, res) {
    try {
      const veiculos = await Veiculos.findAll();
      res.json(veiculos);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  
  async store(req, res) {
    try {
      const veiculo = await Veiculos.create(req.body);
      res.status(201).json(veiculo);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  async filtra(req, res) {
    try {
      const  nome  = req.query.veiculo;
      const veiculos = await Veiculos.findAll({
        where: {
          veiculo: nome
        }
      });
      res.json(veiculos);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
