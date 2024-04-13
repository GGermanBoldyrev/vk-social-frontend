import styled from "styled-components";
import Post from "../core/Post.tsx";
import {PostInterface} from "../interfaces.ts";

const examplePost: PostInterface = {
    id: 1,
    authorId: 2,
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    timestamp: new Date(),
    likes: 10,
    commentsId: [1,2,3]
};

const posts: PostInterface[] = [examplePost, examplePost, examplePost, examplePost];

function Posts() {
    return (
        <GridContainer>
            {posts.map(post => <Post key={post.id} post={post} />)}
        </GridContainer>
    )
}

const GridContainer = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
`;

export default Posts