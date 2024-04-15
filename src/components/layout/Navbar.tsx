import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Container from "../basic/Container.tsx";
import {blueColor} from "../basic/Colors.tsx";
import {navbarHeight} from "../basic/Sizes.tsx";
import {useSelector} from "react-redux";

interface Page {
    name: string;
    link: string;
}

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userId = useSelector((state) => state.auth.userId);

    let pages: Page[] = [
        {name: 'Home', link: '/'},
        {name: 'Posts', link: '/posts'},
    ];

    if (isLoggedIn) {
        pages = [
            ...pages,
            {name: 'Profile', link: `/profile?user_id=${userId}`}
        ];
    } else {
        pages = [
            ...pages,
            {name: 'Login', link: '/login'},
        ]
    }

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
    font-size: 28px;
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
