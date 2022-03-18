const User = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: false,
      tableName: 'users',
    }
  );

  return user;
};

module.exports = User;