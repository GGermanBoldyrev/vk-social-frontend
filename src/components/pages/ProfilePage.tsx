import {useQuery} from "react-query";
import styled from "styled-components";
import {navbarHeight} from "../basic/Sizes.tsx";
import {useSelector} from "react-redux";
import NoImage from "../../assets/user.png";

function ProfilePage() {
    // @ts-ignore
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // @ts-ignore
    const userId = useSelector((state) => state.auth.userId);

    const {data: profile, isLoading, isError} = useQuery("profile", async () => {
        const response = await fetch(`http://localhost:8080/profile?user_id=${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return response.json();
    });

    const {data: user_posts} = useQuery("user_posts", async () => {
        const response = await fetch(`http://localhost:8080/user/posts?author_id=${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return response.json();
    });

    if (!isLoggedIn) {
        return <LoginError>Can't get profile. Login first.</LoginError>;
    }

    if (isLoading) {
        return <LoadingText>Loading...</LoadingText>;
    }

    if (isError) {
        return <LoginError>Error fetching user profile.</LoginError>;
    }

    return (
        <ProfileContainer>
            <ProfileInfo>
                <h1>User Profile</h1>
                <ProfileData>
                    <Block><strong></strong> {profile.image ? "image" : <AuthorImage src={NoImage} alt="Author image"/>}
                    </Block>
                    <Block><strong>ID:</strong> {profile.id}</Block>
                    <Block><strong>Username:</strong> {profile.username}</Block>
                    <Block><strong>Email:</strong> {profile.email}</Block>
                </ProfileData>
            </ProfileInfo>
            <UserPosts>
                <h2>User Posts</h2>
                {user_posts.map((post: { id: number; title: string, text: string }) => (
                    <Post key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.text}</p>
                    </Post>
                ))}
            </UserPosts>
        </ProfileContainer>
    );
}

const Block = styled.p`
    font-weight: 400;
    margin-bottom: 20px;
`;

const AuthorImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
`;

const ProfileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;

const ProfileInfo = styled.div`
    width: 45%;
    margin-bottom: 50px;
`;

const ProfileData = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
`;

const UserPosts = styled.div`
    width: 45%;
`;

const Post = styled.div`
    background-color: #f9f9f9;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
`;

const LoadingText = styled.div`
    font-size: 24px;
    text-align: center;
    margin-top: 100px;
`;

const LoginError = styled.div`
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - ${navbarHeight}px);
`;

export default ProfilePage