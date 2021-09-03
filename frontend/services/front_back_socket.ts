let socket: WebSocket | null = null;

function connectWS(path: string) {
    if (typeof WebSocket === "undefined") return null;
    if (socket === null) {
        // "http"  -> "ws"     on localhost
        // "https" -> "wss"    on server
        const WS_ORIGIN = location.origin.replace(/^http/, "ws");
        const url = `${WS_ORIGIN}/${path}`;
        socket = new WebSocket(url);
        socket.addEventListener("open", (e) => {
            console.log("open");
        });
        socket.addEventListener("close", (e) => {
            console.log("close");
            console.log(e);
        });
        socket.addEventListener("error", (e) => {
            console.log("error");
            console.log(e);
        });
    }
    return socket;
}

export const connectHomeWS = () => connectWS("home");
export const disconnectHomeWS = () => {
  socket.close();
  socket = null;
}
// export default useWsService
