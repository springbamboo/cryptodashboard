type LogType = "info" | "success" | "warning" | "error";

const logPrefix = {
    info: "\x1b[36mℹ",
    success: "\x1b[32m✔",
    warning: "\x1b[33m⚠",
    error: "\x1b[31m✖",
};
const log = (type: LogType, ...message: string[]) => {
    console.log(logPrefix[type], ...message);
};

export default log;
