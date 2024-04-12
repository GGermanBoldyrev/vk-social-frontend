import styled from 'styled-components';

function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterText>
                    © 2024 SocialVista. All rights reserved.<Dash>|</Dash>
                    <GithubLink href="https://github.com/GGermanBoldyrev" target="_blank"
                                rel="noopener noreferrer">GitHub</GithubLink>
                </FooterText>
            </FooterContent>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    background-color: #333;
    color: #fff;
    padding: 20px 0;
`;

const FooterContent = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const FooterText = styled.p`
    font-size: 14px;
    text-align: center;
`;

const Dash = styled.span`
    margin: 0 10px;
`;

const GithubLink = styled.a`
    color: #fff;
`;

export default Footer;