'use strict';
module.exports = (sequelize, DataTypes) => {
	const Client = sequelize.define(
		'Client',
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			address: DataTypes.STRING,
			city: DataTypes.STRING,
			zipCode: DataTypes.STRING
		},
		{}
	);
	Client.associate = function(models) {
		// associations can be defined here
		Client.belongsTo(models.User, {
			foreignKey: 'UserId',
			targetKey: 'id'
		});
	};
	return Client;
};
