import {
    Avatar,
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    Link,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React from "react";
import styles from "./signup.module.css";

const action = "http://localhost:8080/api/auth/signup";
export default function signup() {
    return (
        <Container component="main" maxWidth="xs">
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form
                    noValidate
                    className={styles.form}
                    action={action}
                    method="post"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="User Name"
                                name="username"
                                id="username"
                                autoComplete="name"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email Address"
                                name="email"
                                id="email"
                                autoComplete="email"
                                variant="outlined"
                                required
                                fullWidth
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                variant="outlined"
                                type="password"
                                required
                                fullWidth
                            ></TextField>
                        </Grid>
                    </Grid>
                    <input type="hidden" name="role[]" value="user"></input>
                    <div className={styles.submit}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
