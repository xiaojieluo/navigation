import React, { useState } from "react";
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
import {User} from '@/modules/User';

export function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameErr, setUsernameErr] = useState<boolean>(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState<string>("");

  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emailErrMsg, setEmailErrMsg] = useState<string>("");

  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    User.signInWithUsername(username, password).then((user) => {
        console.log(user)
    }).catch((e: Error) => {
        console.log(e);
    })
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
                  
                //   onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
                //     await User.queryByUsername(username).then((exists) => {
                //       if (exists == true && username.length > 0) {
                //         console.log("exists");
                //         setUsernameErr(true);
                //         setUsernameErrMsg("Username already exists!");
                //       }
                //     });
                //   }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.currentTarget.value);
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                //   onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
                //     await User.queryEmail(email).then((exists) => {
                //       if (exists == true && email.length > 0) {
                //         setEmailErr(true);
                //         setEmailErrMsg("Email address already exists.");
                //       }
                //     });
                //   }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
              </Grid> */}
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
                //   onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                //     setPasswordErr(false);
                //     setPasswordErrMsg("");
                //   }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.currentTarget.value);
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
