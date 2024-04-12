
interface Post {
    id: number;
    author: string;
    image?: string;
    title: string;
    text: string;
    timestamp: Date;
    likes: {"Likes": number};
    comments?: Comment[]
}

interface Comment {
    id: number;
    author: string;
    text: string;
    timestamp: Date;
    likes: {"Likes": number};
}

function Post({post}: {post: Post}) {
    return (
        <>
            asd
        </>
    )
}

export default Post;