import { css } from '@mui/material/styles';

const globalStyles = css`
    html, body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        min-height: 100dvh;
    };
    *,
    :after,
    :before {
    box-sizing: border-box;
    };
`;

export default globalStyles;