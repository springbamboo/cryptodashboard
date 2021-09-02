let _isLogin: boolean = false;
let _userStatus: LoginResult | null = null;
const ROOT_ENDPOINT = "http://localhost:8080";
const SIGNUP_PATH = "/api/auth/signup";
const SIGNIN_PATH = "/api/auth/signin";

type SignUpResult = { message: string };

const signup = async (
    username: string,
    password: string,
    email: string
): Promise<SignUpResult> => {
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

type LoginResult = {
    id: string;
    username: string;
    email: string;
    roles: string[];
    accessToken: string;
};

const login = async (
    username: string,
    password: string
): Promise<LoginResult> => {
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);
    const reqOption: RequestInit = {
        method: "post",
        body: data,
    };
    const response = await fetch(ROOT_ENDPOINT + SIGNIN_PATH, reqOption);
    const json = await response.json();
    if (!response.ok) throw json;
    _isLogin = true;
    _userStatus = json;
    return json;
};

const Auth = {
    get isLogin() {
        return false;
    },
    get userStatus() {
        return _userStatus;
    },
    signup,
    login,
};

export default Auth;
