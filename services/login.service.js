const LoginRepository = require("../repositories/login.repository");

class LoginService {
    loginRepository = new LoginRepository();

    Login = async(nickname, password) => {
        const UserData = await this.LoginRepository.login(nickname, password);
        return{
            nickname: UserData.nickname,
            password: UserData.password,
        };
    };
};
module.exports = LoginService;