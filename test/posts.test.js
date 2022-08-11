const { sequelize } = require("../models");
const app = require("../app");
const { User, Post } = require("../models");
const request = require("supertest");
const postData = require("./data/Post-Data.js"); 
const userData = require("./data/User-Data.js"); 




describe("@1 POST /api/posts 게시글 작성 테스트", () => {
    
    let cookie;
    beforeEach(async () => {
      
      /*await request(app)
        .post("/api/users") // 회원가입 후
        .send(userData.signuptest1);*/
  
      const response = await request(app)
        .post("/api/login") 
        .send(userData.logintest1);
      cookie = response.headers["set-cookie"];
      

    });
  
    test("title과 content를 작성 후 statusCode가 201 & title과 content가 올바르게 작성됐는지 테스트", async () => {
      const response = await request(app)
        .post("/api/posts")
        .set("Cookie", cookie)
        .send(postData.Createpost1);
      globalThis.getPostId = response.body.postId;
      expect(response.statusCode).toBe(201);
      expect(response.request._data.title).toBe(postData.Createpost1.title);
      expect(response.request._data.content).toBe(postData.Createpost1.content);

    })

  });
  describe("@2 GET /api/posts 게시글 전체 조회 테스트", () => {
    test("게시글 전체 조회 후 statusCode가 201인지 테스트", async () => {
      const response = await request(app).get("/api/posts");
      
      expect(response.statusCode).toBe(200);
    });
  });
  
  describe("@3 GET /api/posts/:_postId 특정 게시글 상세 조회 테스트", () => {
    test("특정 게시글 상세 조회 후 statusCode가 201인지 테스트 & 조회한 게시글을 잘 받아왔는지 테스트", async () => {
      const response = await request(app).get("/api/posts/4");
      expect(response.statusCode).toBe(200); 
      returnpost = JSON.parse(response.text).data;
      expect(returnpost).toStrictEqual(postData.Returnpost1);
      expect(true).toBe(true); 
    });
  }); 

  describe("@4 PUT /api/posts/:_postId 특정 게시글 수정 테스트", () => {
    
    let cookie;
    
    beforeEach(async () => {
      
  
      const response = await request(app)
        .post("/api/login")
        .send(userData.logintest1);
      cookie = response.headers["set-cookie"];
    });
    test("로그인한 유저가 자기가 작성한 게시글 수정 시도", async () => {
      const response = await request(app)
        .put("/api/posts/" + getPostId)
        .set("Cookie", cookie)
        .send(postData.Updatepost1);
      expect(response.statusCode).toBe(200); 

      
    });
    test("로그인한 유저가 본인이 작성한 글이 아닌 글에 수정 시도", async () => {
      const response = await request(app)
        .put("/api/posts/4")
        .set("Cookie", cookie)
        .send(postData.Updatepost1);
      expect(response.statusCode).toBe(400); 
    });
    test("로그인 하지 않고 게시글 수정 시도", async () => {
      const response = await request(app)
        .put("/api/posts/"+getPostId)
        
        .send(postData.Updatepost1);
      expect(response.statusCode).toBe(401);
    });
  });

  describe("#5 DELETE /api/posts/:_postId 특정 게시글 삭제", () => {
    
    let cookie;
    beforeEach(async () => {
      
  
      const response = await request(app)
        .post("/api/login")
        .send(userData.logintest1);
      cookie = response.headers["set-cookie"];
    });
    test("로그인한 유저가 특정 게시글 삭제 시도", async () => {
      const response = await request(app)
        .delete("/api/posts/"+getPostId)
        .set("Cookie", cookie)
        
      expect(response.statusCode).toBe(200);
  
  
    });
    test("로그인한 유저가 다른 유저가 작성한 게시글 삭제 시도", async () => {
      console.log("쿠키11111111111111111112",cookie);
      const response = await request(app)
        .delete("/api/posts/4")
        .set("Cookie", cookie);
      expect(response.statusCode).toBe(400); 
    });
    test("로그인하지 않고 특정 게시글 삭제 시도", async () => {
      const response = await request(app).delete("/api/posts/"+getPostId);
      expect(response.statusCode).toBe(401);
    });
  });
  
  describe("@6 PUT LIKE /api/posts/:_postId/like", () => {
    let cookie;
    beforeEach(async () => {
      
  
      const response = await request(app)
        .post("/api/login")
        .send(userData.logintest1); 
      cookie = response.headers["set-cookie"];
      
    });
    
    test("로그인한 유저가 2번 게시글에 좋아요 누르기 테스트", async() => {
      
      const response = await request(app)
      .put("/api/posts/58/like")
      .set("Cookie",cookie)
      expect(response.statusCode).toBe(200);
      
    });
    test("로그인을 하지 않고 좋아요한 좋아요 누르기 테스트", async() => {
      const response = await request(app)
      .put("/api/posts/58/like")
      expect(response.statusCode).toBe(401);
    });
  });
  describe("@7 GET LIKE POST /api/posts/like", () => {
    let cookie;
    beforeEach(async () => {
      
  
      const response = await request(app)
        .post("/api/login")
        .send(userData.logintest1);
      cookie = response.headers["set-cookie"];
      
    });
    test("로그인한 유저가 좋아요한 글 목록 조회 테스트", async() => {
      const response = await request(app)
      .get("/api/posts/like")
      .set("Cookie",cookie)
      expect(response.statusCode).toBe(200);
    });
    test("로그인을 하지 않고 좋아요한 글 목록 조회 테스트", async() => {
      const response = await request(app)
      .get("/api/posts/like")
      expect(response.statusCode).toBe(401);
    });
  });

  