import styled from "styled-components";
import NoImage from "../../assets/user.png"
import FilledLike from "../../assets/filled-like.png"
import EmptyLike from "../../assets/empty-like.png"
import {useState} from "react";
import {blueColor} from "../basic/Colors.tsx";
import {Link} from "react-router-dom";
import {PostInterface} from "../interfaces.ts";

function Post({post}: { post: PostInterface }) {
    const [liked, setLiked] = useState<boolean>(false);

    function handleLike() {
        setLiked(!liked);
    }

    return (
        <PostContainer>
            <div>
                <AuthorImage src={NoImage} alt="Author image"/>
                <div>
                    <p>{post.author_id}</p>
                    <p>{post.timestamp.toLocaleString()}</p>
                </div>
            </div>
            <div>
                <Link to={`/post/${post.id}`}>
                    <PostTitle>{post.title}</PostTitle>
                </Link>
                <PostText>{post.text}</PostText>
                <ReadMoreButton to={`/post/${post.id}`}>Read more...</ReadMoreButton>
            </div>
            <ActionBlock>
                <LikeBlock>
                    <LikeCount>{post.likes}</LikeCount>
                    <LikeButton onClick={handleLike}>
                        <LikeImage src={liked ? FilledLike : EmptyLike} alt="Like"/>
                    </LikeButton>
                </LikeBlock>
                <CommentButton>
                    <CommentHref to={`/post/${post.id}`}>{post.comments_ids.length} Comments</CommentHref>
                </CommentButton>
            </ActionBlock>
        </PostContainer>
    )
}

const PostContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;

    &:hover {
        transition: 0.3s;
        transform: scale(1.02);
    }
`;

const AuthorImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

const PostTitle = styled.h2`
    margin-top: 10px;
`;

const PostText = styled.p`
    margin: 10px 0;
    height: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ReadMoreButton = styled(Link)`
    color: ${blueColor};
    font-weight: 400;
`;

const ActionBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px
`;

const LikeBlock = styled.div`
    display: flex;
    align-items: center;
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

const CommentButton = styled.button`
    font-size: 15px;
    font-weight: 400;
    background-color: transparent;
    color: #007bff;
    border: none;
    cursor: pointer;
`;

const CommentHref = styled(Link)`
    font-weight: 400;
`;

export default Post;