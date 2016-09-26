var Sequelize = require('sequelize');
var co = require('co');
var sequelize = new Sequelize(
    'node',    //数据库名
    'root',             //用户名
    '',             //密码
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306
    }
);

//定义表的模型
var Tq = sequelize.define('tq', {
    id:{ //自增长id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    city: { 
        type: Sequelize.CHAR(20)
    },
    date: { 
        type: Sequelize.CHAR(20)
    },
    daywe:{ 
        type: Sequelize.CHAR(20)
    },

    nightwe:{ 
        type: Sequelize.CHAR(20)
    },
     dayt:{ 
        type: Sequelize.FLOAT(11)
    },
     nightt:{ 
        type: Sequelize.FLOAT(11)
    }
  

   
});

Tq.sync();

module.exports = Tq;