import styled from "styled-components";
import HomePageImage from "../../assets/homepic.jpg"
import {blueColor} from "../basic/Colors.tsx";
import {navbarHeight} from "../basic/Sizes.tsx";

function HomePage() {
    return (
        <Content>
            <TextContent>
                <Title>SocialVista</Title>
                <Description>
                    Your digital horizon for connecting, sharing, and exploring. Experience seamless social
                    interactions, vibrant communities, and endless possibilities. Join us to expand your social network
                    and embark on new adventures in the digital realm.
                </Description>
            </TextContent>
            <Image src={HomePageImage} alt="SocialVista"/>
        </Content>
    )
}

const Content = styled.div`
    height: calc(100vh - ${navbarHeight}px);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TextContent = styled.div`
    margin-right: 20px;
    max-width: 50%;
`;

const Title = styled.h1`
    font-weight: 400;
    color: ${blueColor};
    font-size: 46px;
    margin-bottom: 20px;
    border-bottom: 2px solid ${blueColor};
    width: fit-content;
`;

const Description = styled.p`
    font-size: 20px;
    line-height: 40px;
`;

const Image = styled.img`
    max-width: 35%;
    height: auto;
`;

export default HomePage