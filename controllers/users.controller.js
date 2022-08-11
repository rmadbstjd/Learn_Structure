const UserService = require("../services/users.service");
const {User} = require("../models");

class UsersController {
    userService = new UserService();

    // 회원가입 API
    createUser = async(req,res,next) => {
        const {nickname, password, confirm} = req.body;
        const tokenValue = req.cookies.token;
        const existUser = await this.userService.findOneUser({nickname});
        let nicknametest = /^[A-Za-z0-9]{3,}$/;
        
        if(password.match(nickname)){
            res.status(400).json({
                success: false, 
                errorMassage: "비밀번호와 닉네임이 같은 값이 포함되어 회원가입에 실패하였습니다",
            });
        }

        if(password.length < 4){
            res.status(400).json({
                success:false,
                errorMassage: "비밀번호는 최소 4자리이어야 합니다",
            });
        }

        if(!nicknametest.test(nickname)){
            res.status(400).json({
                success: false,
                errorMassage: "아이디 양식이 맞지 않습니다",
            });
        }

        if(password !== confirm){
            res.status(400).json({
                success: false,
                errorMassage: "비밀번호와 확인 비밀번호가 일치하지 않습니다",
            });
        }

        if(existUser){
            res.status(400).json({
                success: false,
                errorMassage: "중복된 닉네임입니다",
            });
        }

        if(tokenValue){
            res.status(400).json({
                success: false,
                errorMassage: "로그인된 상태에서는 회원가입을 할 수 없습니다",
            });
        }

        await this.userService.createUser({nickname, password, confirm});
        res.status(200).json({
            success: true,
            message : "회원 가입에 성공하였습니다"
        });
    };
};
module.exports = UsersController;