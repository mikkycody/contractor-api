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
    const profiles = [
      {
        firstName: "Michael",
        lastName: "George",
        email: "mgeorge@test.com",
        balance: 10000,
        type: "contractor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Appleseed",
        lastName: "John",
        email: "johnappleseed@test.com",
        type: "client",
        balance: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("profiles", profiles, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
