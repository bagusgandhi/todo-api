module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'todo_item',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        get() {
          const rawValue = this.getDataValue('is_active');
          return Number(rawValue).toString();
        },
      },
      priority: {
        type: DataTypes.STRING,
        defaultValue: 'very-high',
      },
    },
    {
      paranoid: true,
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );
  return Todo;
};
