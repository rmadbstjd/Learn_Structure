const CommentService = require("../services/comments.service");
const jwt = require("jsonwebtoken");

class CommentsController {
    commentService = new CommentService();
    //댓글 목록 조회 API
    getComments = async (req, res, next) => {
        try {

            const comments = await this.commentService.findAllComment();
            res.status(200).json({ data: comments });
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            res.status(400).send({ message });
        }
    };

    //댓글 작성 API
    createComments = async (req, res, next) => {
        try {
            const tokenValue = req.cookies.token;
            const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
            const { content } = req.body;
            const { postId } = req.params;
            if (!content) {
                return res.json({ message: "댓글 내용을 입력해주세요!" });
            }

            const createCommentsData = await this.commentService.createComments(userId, nickname, content, postId)

            res.status(201).json({ success: true, message: "댓글 작성에 성공하였습니다." });

        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            return res.status(400).send({ message });
        };
    }


    //댓글 수정 API
    updateComments = async (req, res, next) => {
        try {
            const tokenValue = req.cookies.token;
            const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
            const { commentId } = req.params;
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ message: "댓글 내용을 입력해주세요" });
            }

            const updateComments = await this.commentService.updateComments(commentId, userId, nickname, content);
            if(updateComments ==="NotaComment"){return res.status(200).json({success:false, message:"댓글 이 존재하지 않습니다."});}
            if(updateComments === "NotaAuth"){return res.status(200).json({success:false, message:"댓글 을 수정할 권한이 없습니다"});}
            res.status(200).json({ success: true, message: " 댓글을 수정하였습니다." });
        
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            res.status(400).send({ message });
        }
    };

    //댓글 삭제 API

    deleteComments = async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const tokenValue = req.cookies.token;
            const { userId, nickname } = jwt.verify(tokenValue, "my-secret-key");
            const deleteComments = await this.commentService.deleteComments(commentId, userId, nickname);
            if(deleteComments ==="NotaComment"){return res.status(200).json({success:false, message:"댓글 이 존재하지 않습니다."});}
            if(deleteComments === "NotaAuth"){return res.status(200).json({success:false, message:"댓글 을 삭제할 권한이 없습니다"});}

            res.status(200).json({ success: true, message: " 댓글을 삭제하였습니다." });
        } catch (error) {
            const message = `${req.method} ${req.originalUrl} : ${error.message}`;
            res.status(400).send({ message });
        }
    }
}
module.exports = CommentsController;