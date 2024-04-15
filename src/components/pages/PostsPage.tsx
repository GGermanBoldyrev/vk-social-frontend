import styled from "styled-components";
import Post from "../core/Post.tsx";
import {useQuery} from "react-query";
import {PostInterface} from "../interfaces.ts";

function Posts() {
    const {data: posts, isLoading, isError} = useQuery("posts", async () => {
        const response = await fetch("http://localhost:8080/posts");
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return response.json();
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: Failed to fetch posts</div>;
    }
    return (
        <GridContainer>
            {posts.data.map((post: PostInterface) => <Post key={post.id} post={post}/>)}
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