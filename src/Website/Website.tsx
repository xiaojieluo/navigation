import { ThemeProvider } from "@emotion/react";
import Create from "./Create";
import theme from "@/Theme";
import { Container, CssBaseline } from "@mui/material";

function Website() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <a href="/website/create">添加新网站</a>
            </Container>
        </ThemeProvider>
    );
}

export default Website;
