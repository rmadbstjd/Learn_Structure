const signuptest1 = {
    nickname: "dbstjd123",
    password: "1234",
    confirm: "1234",
  };
  const signuptest2 = {
    nickname: "testuser123",
    password: "1234",
    confirm: "1234",
  };
  const logintest1 = {
    nickname: "dbstjd123",
    password: "1234",
  };
  const logintest2 = {
    nickname: "testuser123",
    password: "1234",
  };
  
  const userReq_Cookie = {
    token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY1OTk2MzA1NH0.XFjC5KhSJ-K-3XwjvyOTdmMu5k5Fe3GDqaCOfOezrAo",
  };
  
  const mockUser_ResLocals = {
    userId: 3,
    nickname: "Tester3",
    password: "12345",
    likedPosts: [],
    createdAt: new Date("2022-08-06T04:14:16.000Z"),
    updatedAt: new Date("2022-08-07T05:05:33.000Z"),
  };
  
  module.exports = { signuptest1, signuptest2, logintest1, logintest2, userReq_Cookie, mockUser_ResLocals };