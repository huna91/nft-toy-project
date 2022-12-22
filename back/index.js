const dot = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { sequelize, User } = require("./public");
const multer = require("multer");
const path = require("path");

// 디렉토리 없을 경우 생성해주는 예외 처리
// (server listen 전 단계 이므로 동기식 코드로 해도 무방)
try {
    fs.readdirSync('assets');
} catch (error) {
    console.error('not exist directory.');
    fs.mkdirSync('assets');
}
const upload = multer({
  // 파일 저장 위치 (disk , memory 선택)
  storage: multer.diskStorage({
    destination: function (req, file, done) {
      done(null, './public/images');
    },
    filename: function (req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  // 파일 허용 사이즈 (5 MB)
  limits: { fileSize: 5 * 1024 * 1024 }
})


// fieldname : html 폼에 정의된 필드 명
// originalname : 사용자가 업로드 한 파일 명
// size : 파일 사이즈 (byte 단위)
// mimetyp : 파일 타입 (밈 타입)


sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("연결이 잘됐다");
  })
  .catch((err) => {
    console.log(err);
  });

const options = {
  origin: "http://localhost:3000",
};

app.use(cors(options));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


// 전달받은객체 형태를 해석해서 사용할 수 있게 설정
app.use(express.json());


app.post('/photo', upload.single("file"), function async (req, res, next) {

  
  console.log(req.file);
  
    res.send('upload success.');
});

app.get("/", async (req, res) => {});

const server = app.listen(process.env.PORT, () => {
  console.log("서버 열림");
});
