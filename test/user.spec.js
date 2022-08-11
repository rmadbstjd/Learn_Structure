const users = require("../routes/users");
const {createUser} = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth-middleware");
const request = require("supertest");

test("비밀번호와 닉네임이 같은 값이 포함되어 회원가입에 실패하였습니다", async () => {
    await request(users).post("/users").expect(createUser({nickname: "Test", password: "A1234", confirm: "A1234"})).toEqual(true);
    // expect(createUser({nickname: "Test", password: "A1234", confirm: "A1234"})).toEqual(true);
    // expect(createUser({nickname: "Test", password: "Test123", confirm: "Test123"})).toEqual(true);
});