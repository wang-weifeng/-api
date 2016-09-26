var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'tq', //数据库名
    'root', //用户名
    '', //密码
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306
    }
);

//定义表的模型
var tq = sequelize.define('tq', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city: {
        type: Sequelize.STRING(30)
    },
    date: {
        /
        type: Sequelize.TEXT
    }

});
tq.sync();

module.exports = tq;