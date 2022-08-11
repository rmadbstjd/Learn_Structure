const LoginService = require("../services/login.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class LoginController {
    loginService = new LoginService();

    // 로그인 API
    login = async(req,res,next) => {
        if(req.cookies.token){
            res.status(402).json({
                success: false,
                errorMessage: "이미 로그인이 되어있습니다",
            });
            return;
        }

        const {nickname, password} = req.body;
        const user = await this.LoginService.Login(nickname, password);

        if(!user){
            res.status(400).json({
                success: false,
                errorMessage: "닉네임 또는 패스워드가 일치하지 않습니다.",
            });
            return;
        }

        let payload = {userId: user.userId, nickname: nickname};
        const token = jwt.sign(payload, process.env.MYSQL_KEY);
        res.cookies("token", token);

        res.json({
            success: true,
            message: "로그인이 성공되었습니다."
        });
    };
};
module.exports = LoginController;