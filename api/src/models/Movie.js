const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
  });
};

