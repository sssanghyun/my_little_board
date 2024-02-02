import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
    session({
        // secure: false, // https 환경에서만 session 정보를 주고받도록처리
        secret: process.env.COOKIE_SECRET ?? "", // 암호화하는 데 쓰일 키
        resave: false, // 세션을 언제나 저장할지 설정함
        saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
        cookie: {
            //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
            httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
            secure: true,
        },
        name: "session-cookie", // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
    })
);

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
