const { Post } = require("../models");
const { Likey } = require("../models");

class PostRepository {
    findAllPost = async() => {
        const posts = await Post.findAll();
        return posts;
    };
    
    findPostById = async(postId) => {
      const post = await Post.findByPk(postId);
      return post;
    };

    createPost = async(title, content,userId,nickname) => {
      const createPostData = await Post.create({
        title, content,userId,nickname
      });
      return createPostData;
    };

    updatePost = async(title, content, postId) => { // title, content, postId 이 순서를 꼭 지켜야 함
      
        const updatePostData = await Post.update(
            {title, content}, {where : {id : postId}}
        );
        
        return updatePostData;
    };
    deletePost = async(postId) => {
      const deletePostData = await Post.destroy(
        {where : {id : postId}});
      
      return deletePostData;
    };
    findLikeAllPost =async (condition,Id) => {
      if(condition =="postId") {
        const likes = await Likey.findAll({where : {postId : Id}});
        return likes;
      }
      if(condition =="userId") {
        
        const likes2 = await Likey.findAll({where : {userId : Id}});
        return likes2;
      }
      
    };
    /* findLikeAllPost = async(postId) => {
        const likes = await Likey.findAll({where:{postId}});
        return likes; 
      }
      findLikeAllPost2 = async(userId) => {
        const likes2 = await Likey.findAll({where:{userId}});
        return likes2;
      }*/
    findLikePost = async (array) => {
      const like = await Post.findAll({ where: { id: array }});
      return like;
    };
    createLike = async(postId, userId) => {
      const createLikeData = await Likey.create({postId,userId});
      return createLikeData;
    };
    deleteLike = async(postId, userId) => {
      console.log(postId,userId);
      const deleteLikeData = await Likey.destroy({where:{postId,userId}});
      return deleteLikeData;
      
    };
    updateLike = async(postId, user_like) => {
      
      const updateLikeData = await Post.update({like : user_like.length}, {where : {id: postId}});
      return updateLikeData;
    };
};
module.exports = PostRepository;