export interface AuthorInterface {
    id: number,
    username: string,
    email: string,
    password: string,
    image?: string,
    postsId: number[],  // Array of post IDs authored by the author
}

export interface PostInterface {
    id: number;
    authorId: number; // ID of the author who created the post
    title: string;
    text: string;
    timestamp: Date;
    likes: number;
    commentsId: number[] // Array of comments IDs the post belongs
}

export interface CommentInterface {
    id: number;
    postId: number; // ID of the post to which the comment belongs
    authorId: number, // ID of the author who created the comment
    text: string;
    timestamp: Date;
}