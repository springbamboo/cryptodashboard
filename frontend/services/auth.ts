let _isLogin: boolean = false;
const ROOT_ENDPOINT = "http://localhost:8080";
const SIGNUP_PATH = "/api/auth/signup";
const SIGNIN_PATH = "/api/auth/signIN";

type AuthResult = { message: string };

const signup = async (
    username: string,
    password: string,
    email: string
): Promise<AuthResult> => {
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);
    data.append("email", email);
    const reqOption: RequestInit = {
        method: "post",
        body: data,
    };
    const response = await fetch(ROOT_ENDPOINT + SIGNUP_PATH, reqOption);
    const json: { message: string } = await response.json();
    if (response.ok) {
        console.log("Signup success");
        return json;
    } else if (400 <= response.status && response.status < 500) {
        console.error(json);
        throw json;
    } else if (response.status === 500) {
        console.error(json);
        throw "Internal Error";
    }
};

const signin = async (username: string, password: string) => {
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);
    const reqOption: RequestInit = {
        method: "post",
        body: data,
    };
    const response = await fetch(ROOT_ENDPOINT + SIGNUP_PATH, reqOption);
    const json = await response.json();
    if (!response.ok) throw json;
    _isLogin = true;
    return json;
};

const Auth = {
    get isLogin() {
        return false;
    },
    signup,
    signin,
};

export default Auth;
