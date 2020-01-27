const faker = require('faker/locale/en_US');
const db = require('../models/');

const numberInRange = num => Math.floor(Math.random() * (num - 1) + 1);
module.exports = {
    createUsers: async () => {
        let usersArray = [];
        for (var i; i < 21; i++) {
            const user = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            usersArray.push(user);
        }
        return await Promise.all(usersArray.map(user => db.User.create(user)));
    },
    createClients: async () => {
        let clientsArray = [];
        let i = await db.User.findAll({
            raw: true
        });
        for (let j = 0; j < i.length * 20; j++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const email = faker.internet.email(firstName, lastName);
            const address = faker.address.streetAddress();
            const city = faker.address.city();
            const zipCode = faker.address.zipCode();
            const phoneNumber = faker.phone.phoneNumber();
            const userId = numberInRange(i.length);
            const client = {
                firstName,
                lastName,
                email,
                address,
                city,
                zipCode,
                phoneNumber,
                userId: 12
            };
            clientsArray.push(client);
        }
        console.log(clientsArray)
        const dbClients = await Promise.all(
            clientsArray.map(client => db.Client.create({
                ...client
            }))
        );
        return dbClients;
    }
};