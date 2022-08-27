module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    'activity',
    {
      email: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );
  return Activity;
};
