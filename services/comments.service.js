const CommentsRepository = require("../repositories/comments.repository");

class CommentService {
    commentsRepository = new CommentsRepository();

    //댓글 전체 조회
    findAllComment = async () => {
        const allComment = await this.commentsRepository.findAllComment();

        allComment.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        return allComment.map((comment) => {
            return {
                commentId: comment.id,
                userId: comment.userId,
                nickname: comment.nickname,
                content: comment.content,
                createdAt: comment.createdAt,
            };

        });
    }


    //댓글 작성 
    createComments = async (userId, nickname, content, postId) => {
        const createCommentsData = await this.commentsRepository.createComments(userId, nickname, content, postId)
        return {
            commentId: createCommentsData.commentId,
            userId: createCommentsData.userId,
            nickname: createCommentsData.nickname,
            content: createCommentsData.content,
            createdAt: createCommentsData.createdAt,

        }
    }
    //댓글 수정
    updateComments = async (commentId, userId, nickname, content) => {
        const findComment = await this.commentsRepository.findCommentById(commentId);
        if (!findComment) {  return "NotaComment" };
        
        if(findComment.nickname !== nickname) {
            return "NotaAuth";
            
        }

        await this.commentsRepository.updateComments(commentId, userId, nickname, content);

        const updateCommentsData = await this.commentsRepository.updateComments(commentId, userId, nickname, content);

        return {
            commentId: updateCommentsData.commentId,
            userId: updateCommentsData.userId,
            nickname: updateCommentsData.nickname,
            content: updateCommentsData.content,
            createdAt: updateCommentsData.createdAt,

        };




    };
    //댓글 삭제
    deleteComments = async (commentId, userId, nickname) => {

        const findComment = await this.commentsRepository.findCommentById(commentId);
        if (!findComment) {  return "NotaComment" };
        
        if(findComment.nickname !== nickname) {
            return "NotaAuth";
            
        }

        
        
        await this.commentsRepository.deleteComments(commentId, userId, nickname);
        return {
            commentId: findComment.commentId,
            userId: findComment.userId,
            nickname: findComment.nickname,
            content: findComment.content,
            createdAt: findComment.createdAt,
        }
    }


}

module.exports = CommentService;