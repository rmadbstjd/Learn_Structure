const { User } = require("../models");

class UserRepository {
    createUser = async(nickname, password, confirm) => {
        const users = await User.create({nickname, password, confirm});
        return users;
    };
};
module.exports = UserRepository;
