'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('veiculos', [{
      veiculo: 'Uno',
      descricaoManu: "Basica",
      Valor: 10,
      DescricaoManuDetalhada:"Troca de velas e filtro",
      dataManu: new Date(),
      email:"jeova.game@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('veiculos', null, {});

  }
};
