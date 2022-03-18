const Sale = (sequelize, DataTypes) => {
  const saleTable = sequelize.define(
    "Sale",
    {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(9,2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(50),
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'sales',
    }
  );

  saleTable.associate = (models) => {
    saleTable.belongsTo(models.User, { foreignKey: 'id', as: 'user_id' });
    saleTable.belongsTo(models.User, { foreignKey: 'id', as: 'seller_id' });
  };


  return saleTable;
};

module.exports = Sale;

