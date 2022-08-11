const { User } = require("../models");

class UserRepository {
    createUser = async(nickname, password, confirm) => {
        const users = await User.create({nickname, password, confirm});
        return users;
    };

    findOneUser = async(nickname) => {
        const users = await User.findOne({where: nickname});
        return users;
    }
};
module.exports = UserRepository;
