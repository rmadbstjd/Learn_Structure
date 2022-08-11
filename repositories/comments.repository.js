const { Comment } = require("../models");

class CommentsRepository{
    findAllComment = async () =>{
        const comments = await Comment.findAll();
        return comments;
    }

    findCommentById =async (commentId) =>{
        const comment =await Comment.findByPk(commentId);

        return comment;
    }
    createComments = async (userId, nickname, content, postId) =>{
        const createCommentsData = await Comment.create({
            userId, nickname, content, postId
        });
        return createCommentsData;
    };
    updateComments = async (commentId, userId, nickname, content) => {
        const updateCommentsData =await Comment.update(
            {content}, {where : {id : commentId}}
        );
        return updateCommentsData;
    }
    deleteComments = async(commentId) =>{
        const deleteCommentsData = await Comment.destroy(
            {where : {id : commentId}}
        )
        return deleteCommentsData;
    }

};

module.exports = CommentsRepository;