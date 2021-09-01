import {
    Avatar,
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    Link,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { PersonAddOutlined } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { FormEvent, useState, ChangeEvent } from "react";
import Auth from "../services/auth";
import styles from "./signup.module.css";

export default function Signup() {
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [errorText, setErrorText] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.currentTarget;
        setInProgress(true);
        Auth.signup(formValues.username, formValues.password, formValues.email)
            .then((result) => {
                console.log(result);
                setErrorText(null);
                setIsDialogOpen(true);
            })
            .catch((error: Error | { message: string }) => {
                console.log(error);
                setErrorText(error.message);
            })
            .finally(() => {
                setInProgress(false);
            });
    };
    const router = useRouter();
    const goToLogin = () => {
        router.push("/login");
    };
    return (
        <Container component="main" maxWidth="xs">
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <PersonAddOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {errorText !== null && (
                    <Typography color="error">ERROR: {errorText}</Typography>
                )}
                <form
                    noValidate
                    className={styles.form}
                    method="post"
                    onSubmit={handleSubmit}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                            ></TextField>
                        </Grid>
                    </Grid>
                    <input type="hidden" name="role[]" value="user"></input>
                    <div className={styles.submit}>
                        {inProgress ? (
                            <CircularProgress color="primary" />
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign Up
                            </Button>
                        )}
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
            <Dialog open={isDialogOpen}>
                <DialogTitle>Success!</DialogTitle>
                <DialogContent>
                    You have been successfully resisterd. Please login to
                    continue.
                </DialogContent>
                <DialogActions>
                    <Button onClick={goToLogin} color="primary" autoFocus>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
