// colocar query do MongoDB
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

// const userModel = require('./src/models/userModel');

// const ADMIN = {
//   name: 'admin',
//   email: 'root@email.com',
//   password: 'admin',
//   role: 'admin' }

// const createAdminUser = async () => {
//   const created = userModel.createUserOnDb(ADMIN.name, ADMIN.email, ADMIN.password, ADMIN.role);
// };

// module.exports = createAdminUser