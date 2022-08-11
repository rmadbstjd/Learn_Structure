const PostService = require("../services/posts.service");
const jwt = require("jsonwebtoken");

class PostsController {
    postService = new PostService();
    //게시글 전체 조회 API
    getPosts = async(req,res,next) => {
        const posts = await this.postService.findAllPost();
        res.status(200).json({data : posts});
    };
    //게시글 상세 조회 API
    getPostId = async(req,res,next) => {
        const {postId} = req.params;
        
        const post = await this.postService.findPostById(postId);
        res.status(200).json({data : post});
    };
    // 좋아요한 글 조회 API
    getLikes = async(req,res,next) => {
        const tokenValue = req.cookies.token;
        const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
        const likes = await this.postService.findLikePost(userId);
        res.status(200).json({data : likes});
    };
    // 게시글 생성 API
    createPost = async(req,res,next) => {
        const tokenValue = req.cookies.token;
        const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
        const {title, content} =req.body;
        const createPostData = await this.postService.createPost(title, content, userId, nickname);
        res.status(201).json({success:true, message:"게시글 작성에 성공하였습니다.", postId:createPostData.postId});
    };
    // 게시글 수정 API
    updatePost = async(req,res,next) => {
        const tokenValue = req.cookies.token;
        const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
        const {postId} = req.params;
        const {title, content} = req.body;
        
        const updatePost = await this.postService.updatePost(title, content, postId, userId,nickname);
        if(updatePost === "NotaPost") {
            return res.status(400).json({success:false, message:"게시글이 존재하지 않습니다."});
        }
        if(updatePost ==="NotaAuth") {
            return res.status(400).json({success:false, message:"게시글을 수정할 권한이 없습니다."});
        }
        res.status(200).json({success:true, message:"게시글을 수정하였습니다."});
    };
    // 게시글 삭제 API
    deletePost = async(req,res,next) => {
        const tokenValue = req.cookies.token;
        const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
        const {postId} = req.params;
        const deletePost = await this.postService.deletePost(postId,userId,nickname);
        if(deletePost === "NotaPost") {
            return res.status(400).json({success:false, message:"게시글이 존재하지 않습니다."});
        }
        if(deletePost ==="NotaAuth") {
            return res.status(400).json({success:false, message:"게시글을 수정할 권한이 없습니다."});
        }
        res.status(200).json({success:true, message:"게시글을 삭제하였습니다."});
    }
    // 좋아요 기능 API
    putLike = async(req,res,next) => {
        const tokenValue = req.cookies.token;
        const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
        const {postId} = req.params;
        const likePost = await this.postService.putLike(postId,userId,nickname);
        if(likePost === true){
            res.status(200).json({success :true, message : "게시글의 좋아요를 등록하였습니다."});
        }
        else {
            res.status(200).json({success :false, message : "게시글의 좋아요를 취소하였습니다."});
        }
    };


};
module.exports = PostsController;