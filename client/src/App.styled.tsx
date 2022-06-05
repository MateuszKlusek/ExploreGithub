
import styled from "styled-components"

export const AppContainer = styled.div`
    /* NEVER IMPORT INSIDE STYLED COMPONENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    /* @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"); */
    font-family: "Inter", sans-serif;
    width: 100%;
    min-height: 100vh;
    &::-webkit-slider-thumb {
    -webkit-appearance: none;
    }
    background: rgb(230,230,230);
    color: rgb(25,25,25);
    position: relative;
`