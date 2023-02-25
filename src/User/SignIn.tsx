import React, { useEffect, useRef, useState } from "react";
import theme from "@/Theme";
import { ThemeProvider } from "@emotion/react";
import { Box, Container } from "@mui/system";
import {
    Avatar,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { LockClockOutlined, Copyright } from "@mui/icons-material";
import { User } from "@/modules/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as AV from "leancloud-storage";
import { Navigate, useNavigate } from "react-router-dom";

export function SignIn() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErr, setEmailErr] = useState<boolean>(false);
    const [emailErrMsg, setEmailErrMsg] = useState<string>("");

    const [passwordErr, setPasswordErr] = useState<boolean>(false);
    const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");

    const navigate = useNavigate();
    const [btnOnClick, setBtnOnClick] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setBtnOnClick(true);
        toast.promise<AV.User, AV.Error>(
            AV.User.logIn(username, password),
            {
                pending: "正在登陆中。。。",
                success: {
                    render({ data }) {
                        return `登陆成功！欢迎用户 ${data?.getUsername()}, 正在跳转中`;
                    },
                    onClose: () => {
                        navigate("/");
                    },
                },
                error: {
                    render({ data }) {
                        console.log(data?.rawMessage);
                        setBtnOnClick(false);
                        return `登陆失败： ${data?.rawMessage}`;
                    },
                },
            },
            {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            }
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <ToastContainer limit={1} />
                    <Avatar sx={{ m: 1, bgColor: "secondary.main" }}>
                        <LockClockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    value={username}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setUsername(event.currentTarget.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    error={passwordErr}
                                    helperText={passwordErrMsg}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setPassword(event.currentTarget.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={btnOnClick}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    no account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
