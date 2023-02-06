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
    const jobs = [
      {
        contractId: 1,
        amount: 10000,
        isPaid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        contractId: 2,
        amount: 10000,
        isPaid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        contractId: 1,
        amount: 5000,
        isPaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        contractId: 2,
        amount: 5000,
        isPaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("jobs", jobs, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("jobs", null, {});
  },
};
