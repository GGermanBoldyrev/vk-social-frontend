import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Container from "../molecules/Container.tsx";
import {blueColor} from "../atoms/Colors.tsx";
import {navbarHeight} from "../atoms/Sizes.tsx";

interface Page {
    name: string;
    link: string;
}

const pages: Page[] = [
    {name: 'Home', link: '/'},
    {name: 'Posts', link: '/posts'},
    {name: 'Login', link: '/login'},
];

const Navbar = () => {
    return (
        <Nav>
            <Container>
                <NavContent>
                    <Left>
                        <Link to="/">SocialVista</Link>
                    </Left>
                    <Right>
                        {pages.map((page) => (
                            <StyledLink key={page.name} to={page.link}>{page.name}</StyledLink>
                        ))}
                    </Right>
                </NavContent>
            </Container>
        </Nav>
    );
};

const Nav = styled.nav`
    height: ${navbarHeight}px;
    padding: 1.25rem 0;
    background-color: ${blueColor};
    color: #fff;
`;

const NavContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    font-size: 24px;
`;

const Right = styled.div`
    font-size: 18px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:not(:last-child) {
        margin-right: 1.4rem;
    }
;

    &:last-child {
        border: 1px solid #fff;
        border-radius: 4px;
        padding: 0.5rem 1rem;
    }
;

    &:hover:not(:last-child) {
        border-bottom: 2px solid #fff;
        transition: 0.2s;

    }

    &:hover:last-child {
        color: ${blueColor};
        background-color: #fff;
        transition: 0.2s;
    }
`;

export default Navbar;
