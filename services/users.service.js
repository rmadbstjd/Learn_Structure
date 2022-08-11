const userRepository = require("../repositories/users.repository");

class UserService {
    userRepository = new userRepository();

    createUser = async(nickname, password, confirm) => {
        const createUserData = await this.userRepository.createUser(nickname, password, confirm);
        return {
            userId: createUserData.Id, 
            nickname: createUserData.nickname, 
            password: createUserData.password, 
            confirm: createUserData.confirm, 
            createAt: createUserData.createAt, 
            updatedAt: createUserData.updatedAt, 
        };
    };
};
module.exports = UserService;