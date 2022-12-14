const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get('/posts',postsController.getPosts);
router.get('/posts/like',authMiddleware, postsController.getLikes);
router.get('/posts/:postId',postsController.getPostId);
router.post('/posts', authMiddleware, postsController.createPost);
router.put('/posts/:postId/like', authMiddleware, postsController.putLike);
router.put('/posts/:postId', authMiddleware, postsController.updatePost);
router.delete('/posts/:postId', authMiddleware, postsController.deletePost);

module.exports = router;
//------------------------------------------------------------------------------------------------//
//게시글 등록 API
/*router.post("/posts", authMiddleware, async (req, res) => {
  const tokenValue = req.cookies.token;
  const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
  const { title, content } = req.body;
  const createdPost = await Post.create({ title, userId, nickname, content });
  res.json({
    success: true,
    message: `${nickname}님의 게시글을 생성하였습니다.`,
  });
});
//로그인 한 유저가 좋아요를 누른 게시글 조회
/*router.get("/posts/like", authMiddleware, async (req, res) => {
  const tokenValue = req.cookies.token;
  const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
  const array = [];
  const post_list = await Likey.findAll({ where: { userId } });

  for (let i = 0; i < post_list.length; i++) {
    array.push(post_list[i].postId);
  }

  const sorted_posts = await Post.findAll({ where: { id: array } });

  const sorted_post = sorted_posts.sort(function (a, b) {
    return b.like - a.like;
  });

  res.json({
    data: sorted_post.map((sorted_post) => ({
      postId: sorted_post.id,
      userId: sorted_post.userId,
      nickname: sorted_post.nickname,
      title: sorted_post.title,
      createdAt: sorted_post.createdAt,
      like: sorted_post.like,
    })),
  });
});

//전체 게시글 조회 API
router.get("/posts", async (req, res) => {
  const post = await Post.findAll();

  const sorted_post = post
    .sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).reverse();
    
  res.json({
    data: sorted_post.map((sorted_post) => ({
      // arrow function의 특징 : 객체를 반환할 때 => 뒤에 ({})를 붙여야 한다.
      postId: sorted_post.id,
      userId: sorted_post.userId,
      nickname: sorted_post.nickname,
      title: sorted_post.title,
      createdAt: sorted_post.createdAt,
      like: sorted_post.like,
    })),
  });
});
// 게시글 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
  const postId = Number(req.params.postId);

  const post = await Post.findOne({ where: { id: postId } });

  res.json({
    data: {
      postId: post.id,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      userId: post.userId,
      like: post.like,
      
    },
  });
});
//게시글 수정 API
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  const postId = Number(req.params.postId);
  const tokenValue = req.cookies.token;
  const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
  const { title, content } = req.body; //re_title이라 작성하지 않고 title이라고 작성학 $set에서 {title: title}하면 오류남
  const postpw = await Post.findOne({ where: { _id: postId } });
  console.log(nickname, postpw.nickname);
  if (nickname !== postpw.nickname) {
    return res
      .status(400)
      .json({
        success: false,
        errorMessage: `${nickname}님은 ${postpw.nickname}님의 게시글을 수정할 수 없습니다.`,
      });
  }

  await Post.update(
    { title: title, content: content },
    { where: { id: postId } }
  );

  res.json({
    success: true,
    message: `게시글을 수정하였습니다.`,
  });
});
//게시글 삭제 API
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const postId = Number(req.params.postId);
  const tokenValue = req.cookies.token;

  const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
  const existsPost = await Post.findOne({ where: { id: postId } });
  if (!existsPost) {
    return res
      .status(400)
      .json({ success: false, errorMessage: `삭제할 게시글이 없습니다.` });
  }
  if (nickname !== existsPost.nickname) {
    return res
      .status(400)
      .json({
        success: false,
        errorMessage: `${nickname}님은 ${existsPost.nickname}님의 게시글을 삭제할 수 없습니다.`,
      });
  }
  await Post.destroy({ where: { userId, Id: postId } });
  return res.json({
    success: true,
    msg: `게시글을 삭제했습니다.`,
  });
});
//게시글 좋아요 API
router.put("/posts/:postId/like", authMiddleware, async (req, res) => {
  const tokenValue = req.cookies.token;
  const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
  const postId = req.params.postId;
  const post = await Post.findOne({ where: { id: postId } });
  const test = await Likey.findAll({ where: { userId: userId } });
  const pushlike = await Likey.create({ userId, postId });
  let like_done = true;
  for (let i = 0; i < test.length; i++) {
    if (pushlike.userId == test[i].userId) {
      if (pushlike.postId == test[i].postId) {
        like_done = false;
        await Likey.destroy({ where: { postId, userId } });
      }
    }
  }
  const user_like = await Likey.findAll({ where: { postId } });
  await Post.update({ like: user_like.length }, { where: { id: postId } });
  if (like_done) {
    return res.json({ message: "게시글에 좋아요를 등록하였습니다." });
  } else {
    return res.json({ message: "게시글에 좋아요를 취소하였습니다." });
  }
});*/


