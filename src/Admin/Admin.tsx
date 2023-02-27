import theme from "@/Theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";



function Admin() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                Hola
            </Container>
        </ThemeProvider>
    )
}

export default Admin;
