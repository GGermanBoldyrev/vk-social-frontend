import {ReactNode} from "react";
import styled from "styled-components";
import {navbarHeight} from "./Sizes.tsx";

function Container({children}: { children: ReactNode }) {
    return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
    height: 100%;
    max-width: 100%;
    min-height: calc(100vh - ${navbarHeight}px);
    padding: 0 20px;
    margin: 0 auto;

    @media (min-width: 768px) {
        max-width: 750px;
    }

    @media (min-width: 992px) {
        max-width: 970px;
    }

    @media (min-width: 1200px) {
        max-width: 1140px;
    }
`;

export default Container;