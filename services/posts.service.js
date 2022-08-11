const postRepository = require("../repositories/posts.repository");

class PostService {
    postRepository = new postRepository();
    //게시글 전체 조회
    
    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();
        
        allPost.sort((a,b) => {
            return b.createdAt - a.createdAt;
        });

        return allPost.map((post) => {
            return {
                postId : post.id,
                userId : post.userId,
                nickname : post.nickname,
                title : post.title,
                createdAt : post.createdAt,
                updatedAt : post.updatedAt, 
                like : post.like,

            };
        });
    };
    //게시글 상세 조회
    findPostById = async(postId) => {
        
        const findPost = await this.postRepository.findPostById(postId);
        
        return {
            postId: findPost.id,
            nickname: findPost.nickname,
            title: findPost.title,
            content: findPost.content,
            createdAt: findPost.createdAt,
            updatedAt: findPost.updatedAt,
            like : findPost.like,
          };


    };
    //게시글 작성
    createPost = async(title,content,userId,nickname) => {
        
    const createPostData = await this.postRepository.createPost(title, content,userId,nickname);
        return {
            postId: createPostData.id,
            nickname: createPostData.nickname,
            userId : createPostData.userId,
            title: createPostData.title,
            content: createPostData.content,
            createdAt: createPostData.createdAt,
            updatedAt: createPostData.updatedAt,
            like : createPostData.like,
        };
    };
    //게시글 수정
    updatePost = async(title, content, postId, userId, nickname) => { //posts.controller.js에서 updatePost() 함수의 매개변수의 순서가 다르면 안된다!
        
        const findPost = await this.postRepository.findPostById(postId);
        
        
        if(!findPost) {
            return "NotaPost";
              
        }
        if(findPost.nickname !== nickname) {
            return "NotaAuth";
            
        }
        
        const updatePost = await this.postRepository.updatePost(title, content, postId);
        
        return {
            postId: updatePost.id,
            nickname: updatePost.nickname,
            title: updatePost.title,
            content: updatePost.content,
            createdAt: updatePost.createdAt,
            updatedAt: updatePost.updatedAt,
            like :updatePost.like,
        };

    };
    //게시글 삭제
    deletePost = async(postId, userId, nickname) => {
        const findPost = await this.postRepository.findPostById(postId);
        if(!findPost) {
            //res.status(400).json("테스트중");
            return "NotaPost";
            //throw new Error("게시글이 존재하지 않습니다."); //res.status.json()이 안되는 이유?
        }
        if(findPost.nickname !== nickname) {
            return "NotaAuth";
            
        }
        
            await this.postRepository.deletePost(postId);
        
        return {
            postId: findPost.id,
            nickname: findPost.nickname,
            title: findPost.title,
            content: findPost.content,
            createdAt: findPost.createdAt,
            updatedAt: findPost.updatedAt,
            like :findPost.like,
          };
    };
    putLike = async(postId,userId,nickname) => {
       
        const test = await this.postRepository.findLikeAllPost("userId",userId); //로그인된 userId
        const pushlike = await this.postRepository.createLike(postId, userId); //Likey Table에 로그인된 userId와 좋아요를 누른 글의 postId 저장
        let like_done = true; //좋아요를 눌렀으니까 like_done은 true
        for (let i = 0; i < test.length; i++) {
            if (pushlike.userId == test[i].userId) {
                if (pushlike.postId == test[i].postId) {
                        like_done = false;
                        await this.postRepository.deleteLike(postId, userId);
                }
            }
        }
        const user_like = await this.postRepository.findLikeAllPost("postId",postId);
        await this.postRepository.updateLike(postId, user_like);
        return like_done;
    };
    //좋아요한 글 조회
    findLikePost = async(userId) => {
        const array = [];
        const post_list = await this.postRepository.findLikeAllPost("userId",userId);
        
        for (let i = 0; i < post_list.length; i++) {
            array.push(post_list[i].postId);
        }
        
        const sorted_posts = await this.postRepository.findLikePost(array);
        
        const sorted_post = sorted_posts.sort(function (a, b) {
            return b.like - a.like;
        });
        
        return{
              data: sorted_post.map((sorted_post) => ({
              postId: sorted_post.id,
              userId: sorted_post.userId,
              nickname: sorted_post.nickname,
              title: sorted_post.title,
              createdAt: sorted_post.createdAt,
              like: sorted_post.like,
            })),
          };
    };

};
module.exports = PostService;