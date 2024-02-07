import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import session, { MemoryStore } from "express-session";

dotenv.config();

const PORT = process.env.PORT || 4000;
const FileStore = require("session-file-store")(session);
let MySQLStore = require("express-mysql-session")(session);

let options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
let sessionStore = new MySQLStore(options);

const app = express();

// 60분
const maxAge = 1000 * 60 * 60;

app.use(
    session({
        // secure: false, // https 환경에서만 session 정보를 주고받도록처리
        secret: process.env.COOKIE_SECRET ?? "", // 암호화하는 데 쓰일 키
        resave: false, // 세션을 언제나 저장할지 설정함
        // saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
        cookie: {
            //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
            maxAge: maxAge,
        },
        name: "session-cookie", // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
        store: sessionStore,
    })
);
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
