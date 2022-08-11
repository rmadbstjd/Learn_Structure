const LoginRepository = require("../repositories/login.repository");

class LoginService {
    loginRepository = new LoginRepository();

    Login = async(nickname, password) => {
        const UserData = await this.loginRepository.login(nickname, password);
        return{
            nickname: UserData.nickname,
            password: UserData.password,
            userId: UserData.userId,
        };
    };
};
module.exports = LoginService;