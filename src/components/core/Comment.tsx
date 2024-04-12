import styled from "styled-components";
import {CommentInterface} from "../interfaces.ts"
import NoImage from "../../assets/user.png"

interface CommentProps {
    comment: CommentInterface
}


function Comment({comment}: CommentProps) {
    return (
        <CommentContainer>
            <CommentHeader>
                <AuthorSection>
                    <CommentImage src={NoImage}></CommentImage>
                    <CommentAuthor>{comment.authorId}</CommentAuthor>
                </AuthorSection>
                <CommentDate>{comment.timestamp.toLocaleString()}</CommentDate>
            </CommentHeader>
            <CommentText>{comment.text}</CommentText>
        </CommentContainer>
    );
}

const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AuthorSection = styled.div`
    display: flex;
    align-items: center;
`;

const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
`;

const CommentImage = styled.img`
    width: 30px;
    height: 30px;
`;

const CommentAuthor = styled.p`
    margin-left: 15px;
    font-weight: bold;
`;

const CommentText = styled.p`
    margin-top: 5px;
`;

const CommentDate = styled.p`
    color: #666;
    font-size: 0.8rem;
`;

export default Comment;