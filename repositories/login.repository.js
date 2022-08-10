const { User } = require("../models");

class LoginRepository {
    login = async(nickname, password) => {
        const users = await User.findOne({where: {nickname, password}});
        return users;
    };
};
module.exports = LoginRepository;