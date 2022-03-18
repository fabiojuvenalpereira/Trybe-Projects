const SaleProduct  = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define(
    'SaleProduct',
  { 
    productId: DataTypes.INTEGER,
    saleId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts',
  }
  );

  salesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: 'SaleProduct',
      foreignKey: 'saleId',
      otherKey: 'productId',
      autoIncrement: false,
      primaryKey: true
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales', 
      through: 'SaleProduct',
      foreignKey: 'productId', 
      otherKey: 'saleId',
      autoIncrement: false,
      primaryKey: true
    });
  }

  return salesProducts;
};

module.exports = SaleProduct;