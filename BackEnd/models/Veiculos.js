const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Veiculos extends Model {}

  Veiculos.init({
    veiculo: DataTypes.STRING,
    descricaoManu: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    descricaoManuDetalhada: DataTypes.STRING,
    dataManu: DataTypes.DATE,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Veiculos',
  });

  return Veiculos;
};