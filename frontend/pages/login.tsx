import {
    Avatar,
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    CircularProgress,
} from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { FormEvent, useState, ChangeEvent } from "react";
import Auth from "../services/auth";
import styles from "./signup.module.css";

export default function Signup() {
    const [formValues, setFormValues] = useState({
        username: "",
        password: "",
    });
    const [errorText, setErrorText] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.currentTarget;
        setInProgress(true);
        Auth.login(formValues.username, formValues.password)
            .then((result) => {
                console.log(result);
                setErrorText(null);
                goToHome();
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
    const goToHome = () => {
        router.push("/");
    };
    return (
        <Container component="main" maxWidth="xs">
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOpenOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
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
                                Log in
                            </Button>
                        )}
                    </div>
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/signup" passHref>
                            Create Account
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
