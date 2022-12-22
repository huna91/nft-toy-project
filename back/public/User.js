const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_email: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey : true,
          comment: "유저 이메일"
        },
        user_nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
          comment: "유저 닉네임"
        },
        user_pw: {
          type: Sequelize.STRING(255),
          allowNull: false,
          comment : "유저 패스워드"
        },
        user_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          comment : "유저 이름"
        },
        refresh_token: {
          type: Sequelize.STRING(256),
          allowNull: false,
          comment: "리프레쉬 토큰",
          defaultValue: 'pop',
        },
        phone_number: {
          type: Sequelize.INTEGER.UNSIGNED,
          comment : "유저 폰 번호",
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
  }
}

module.exports = User;
