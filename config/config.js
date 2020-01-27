require('dotenv').config();
module.exports = {
	development: {
		username: process.env.PG_USER || 'postgres',
		password: process.env.PG_PASS || null,
		database: 'client_manager_development',
		host: '127.0.0.1',
		dialect: 'postgres',
		operatorsAliases: false,
		logging: false
	},
	production: {
		use_env_variable: 'DATABASE_URL',
		database: 'client_manager_production',
		dialect: 'postgres',
		dialectOptions: {
			ssl: true
		},
		operatorsAliases: false
	}
};
