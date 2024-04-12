import {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import NoImage from "../../assets/user.png";
import FilledLike from "../../assets/filled-like.png";
import EmptyLike from "../../assets/empty-like.png";
import Loader from "../../assets/loader.png";
import {useParams} from 'react-router-dom';
import {blueColor} from "../basic/Colors.tsx";
import {navbarHeight} from "../basic/Sizes.tsx";
import {CommentInterface, PostInterface} from "../interfaces.ts";
import Comment from "../core/Comment.tsx";

function SinglePostPage() {
    const {postId} = useParams();

    const [post, setPost] = useState<PostInterface | null>(null);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        // Fetch the post data based on the postId
        // This is just a mock implementation, replace it with your actual data fetching logic
        const mockPost: PostInterface = {
            id: 1,
            authorId: 1,
            title: 'Lorem ipsum dolor sit amet',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore ' +
                'et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur ' +
                'adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            timestamp: new Date(),
            likes: 10,
            commentsId: [3]
        };
        setPost(mockPost);
    }, [postId]);

    const comments: CommentInterface[] = [
        {id: 1, postId: 3, authorId: 2333333333, text: "Great post!Great post!Great post!", timestamp: new Date()},
        {
            id: 2,
            postId: 2,
            authorId: 23333333333,
            text: "Привет, очень классно что ты делаешь такие сайты",
            timestamp: new Date()
        }
    ]

    const handleLike = () => {
        setLiked(!liked);
    };

    if (!post) {
        return (
            <LoadingBlock>
                <LoadingImage src={Loader} alt="Loading image"/>
            </LoadingBlock>
        );
    }

    return (
        <PostContainer>
            <PostBody>
                <AuthorBlock>
                    <AuthorImage src={NoImage} alt="Author image"/>
                    <AuthorData>
                        <AuthorName>{post.authorId}</AuthorName>
                        <p>{post.timestamp.toLocaleString()}</p>
                    </AuthorData>
                </AuthorBlock>
                <div>
                    <PostTitle>{post.title}</PostTitle>
                    <PostText>{post.text}</PostText>
                </div>
                <ActionBlock>
                    <LikeBlock>
                        <LikeCount>{post.likes}</LikeCount>
                        <LikeButton onClick={handleLike}>
                            <LikeImage src={liked ? FilledLike : EmptyLike} alt="Like"/>
                        </LikeButton>
                    </LikeBlock>
                </ActionBlock>
            </PostBody>
            <CommentContainer>
                <CommentsHeader>
                    <HeaderText>Comments</HeaderText>
                    <AddCommentButton>Add comment</AddCommentButton>
                </CommentsHeader>
                {post.commentsId.length > 0 ? (
                    comments.map((comment: CommentInterface) => (
                        <Comment key={comment.id} comment={comment}/>
                    ))
                ) : (
                    <TextNoComments>No comments yet. Be the first to write it.</TextNoComments>
                )}
            </CommentContainer>
        </PostContainer>
    );
}

/*Comments*/
const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CommentsHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-weight: 400;
    margin-bottom: 40px;
`;

const HeaderText = styled.div`
    border-bottom: 1px black solid;
    font-size: 24px;
`;

const AddCommentButton = styled.button`
    font-size: 16px;
    color: #fff;
    background-color: ${blueColor};
    padding: 5px 10px;
    border-radius: 5px;
    
    &:hover {
        cursor: pointer;
    }
`;

const TextNoComments = styled.div`
    
`;

const PostContainer = styled.div`
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PostBody = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 30px 60px;
    margin: 40px 0 20px 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`;

const AuthorBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const AuthorImage = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 50%;
    margin-right: 10px;
`;

const AuthorData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const AuthorName = styled.div`
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 5px;
`;

const PostTitle = styled.h2`
    text-align: center;
    font-weight: 400;
    margin-top: 30px;
`;

const PostText = styled.p`
    text-indent: 50px;
    font-size: 18px;
    line-height: 30px;
    margin-top: 30px;
`;

const ActionBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`;

const LikeBlock = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const LikeButton = styled.button`
    margin-left: 5px;

    &:hover {
        cursor: pointer;
    }
`;

const LikeImage = styled.img`
    margin-bottom: 2px;
    width: 25px;
    height: 24px;
`;

const LikeCount = styled.span`
    border-radius: 5px;
    font-weight: 400;
    color: ${blueColor};
`;

/*Loading styles*/
const spinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoadingBlock = styled.div`
    height: calc(100vh - ${navbarHeight}px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LoadingImage = styled.img`
    width: 75px;
    height: 75px;
    margin-bottom: 10px;
    animation: ${spinAnimation} 2s linear infinite;
`;

export default SinglePostPage;
