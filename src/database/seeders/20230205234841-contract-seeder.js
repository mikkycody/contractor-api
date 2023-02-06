"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const date = new Date();
    const rand = Math.floor(Math.random() * 6) + 1;
    const startDate = date;
    date.setDate(date.getDate() + rand);
    const endDate = date;
    const contracts = [
      {
        clientId: 3,
        contractorId: 2,
        startDate,
        endDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clientId: 5,
        contractorId: 4,
        startDate,
        endDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("contracts", contracts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("contracts", null, {});
  },
};
