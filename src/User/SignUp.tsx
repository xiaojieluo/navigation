import React, { useCallback, useState } from "react";
import theme from "@/Theme";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import { User } from "@/modules/User";
import * as AV from "leancloud-storage";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRe, setPasswordRe] = useState<string>("");

  const [usernameErr, setUsernameErr] = useState<boolean>(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState<string>("");

  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emailErrMsg, setEmailErrMsg] = useState<string>("");

  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");

  const [passwordReErr, setPasswordReErr] = useState<boolean>(false);
  const [passwordReErrMsg, setPasswordReErrMsg] = useState<string>("");

  const [signUpErr, setSignUpErr] = useState<boolean>(false);
  const [signUpErrMsg, setSignUpErrMsg] = useState<string>("");

  // 注册成功标识符
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);
  const [user, setUser] = useState<AV.User>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSignUpErr(false);
    setSignUpErrMsg("");
    let result = 0;
    if (email.length == 0) {
      setEmailErr(true);
      setEmailErrMsg("邮箱不能为空");
      result += 1;
    }
    if (password == "") {
      setPasswordErr(true);
      setPasswordErrMsg("密码不能为空");
      result += 1;
    }
    if (username == "") {
      setUsernameErr(true);
      setUsernameErrMsg("用户名不能为空");
      result += 1;
    }

    if (result != 0) return;
    User.signupForEmail(email, password, username)
      .then((user) => {
        console.log(user);
        // 保存注册用户信息
        // TODO: 注册完即登录
        setSignUpSuccess(true);
        setUser(user);
      })
      .catch((e: Error) => {
        console.log(e);

        setSignUpErr(true);
        setSignUpErrMsg(e.message);
      });
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
          {
            signUpSuccess == true && (
              <Alert severity="success" variant="outlined">
                <p>注册成功！{user?.id}</p>
              </Alert>
            )
          }
          {signUpErr == true && (
            <Alert
              onClose={() => {
                setSignUpErr(false);
              }}
              severity="error"
              variant="outlined"
            >
              {/* <AlertTitle>Error</AlertTitle> */}
              {signUpErrMsg}
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgColor: "secondary.main" }}>
            <LockClockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
                  error={usernameErr}
                  helperText={usernameErrMsg}
                  {...(usernameErr == false &&
                    username.length > 0 && { color: "success", focused: true })}
                  onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
                    setUsernameErr(false);
                    setUsernameErrMsg("");
                    await User.queryByUsername(username).then((exists) => {
                      if (exists == true && username.length > 0) {
                        console.log("exists");
                        setUsernameErr(true);
                        setUsernameErrMsg("Username already exists!");
                      }
                    });
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.currentTarget.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  error={emailErr}
                  helperText={emailErrMsg}
                  {...(emailErr == false &&
                    email.length != 0 && { color: "success", focused: true })}
                  id="email"
                  label="Email Address"
                  value={email}
                  onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
                    setEmailErr(false);
                    setEmailErrMsg("");

                    await User.queryEmail(email).then((exists) => {
                      if (exists == true && email.length > 0) {
                        setEmailErr(true);
                        setEmailErrMsg("Email address already exists.");
                      }
                    });
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.currentTarget.value);
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
                  onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                    setPasswordErr(false);
                    setPasswordErrMsg("");
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password_re"
                  label="please enter password again."
                  name="password_re"
                  type="password"
                  value={passwordRe}
                  error={passwordReErr}
                  helperText={passwordReErrMsg}
                  {...(passwordReErr == false &&
                    passwordRe != "" &&
                    password == passwordRe && {
                      color: "success",
                      focused: true,
                    })}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordRe(event.currentTarget.value);
                  }}
                  onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                    console.log([password, passwordRe]);
                    console.log(password != passwordRe);
                    setPasswordReErr(false);
                    setPasswordReErrMsg("");
                    if (password != passwordRe) {
                      setPasswordReErr(true);
                      setPasswordReErrMsg("两次密码不一致，请重试");
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
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
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
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

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Navigation
      </Link>
      {"  "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default SignUp;
