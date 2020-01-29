const faker = require('faker/locale/en_US');
const db = require('../models/');

const numberInRange = num => Math.floor(Math.random() * (num - 1) + 1);
module.exports = {
	createUsers: async () => {
		let usersArray = [];
		for (var i = 0; i < 21; i++) {
			let user = createUser();
			let password = faker.internet.password();
			usersArray.push({ ...user, password });
		}
		const dbUsers = await Promise.all(
			usersArray.map(user => db.User.create(user))
		);
		return dbUsers;
	},
	createClients: async () => {
		let clientsArray = [];
		let i = await db.User.findAll({
			raw: true
		});
		for (let j = 0; j < i.length * 20; j++) {
			const user = createUser();
			const address = faker.address.streetAddress();
			const city = faker.address.city();
			const zipCode = faker.address.zipCode();
			const phoneNumber = faker.phone.phoneNumber();
			const UserId = numberInRange(i.length);
			clientsArray.push({
				...user,
				address,
				city,
				zipCode,
				phoneNumber,
				UserId
			});
		}
		const dbClients = await Promise.all(
			clientsArray.map(client =>
				db.Client.create({
					...client
				})
			)
		);
		return dbClients;
	}
};

function createUser() {
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	const email = faker.internet.email(firstName, lastName);
	return {
		firstName,
		lastName,
		email
	};
}
