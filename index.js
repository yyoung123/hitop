// module 만들기
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const axios = require("axios");

const corsOption = {
  origin: "http://127.0.0.1:5501",
  credentials: true,
};

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");

app.use(cors(corsOption));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json()); //json 리턴할려면
app.get("/", (req, res) => {
  // res.send("<h1>안녕하세요. html로 응답을 합니다.</h1>");
  // res.sendFile(path.join(__dirname, "/views/index.html"));
  // res.json("<h1>안녕하세요. html로 응답을 합니다.</h1>");
  res.render("index");
});
app.get("/introduce", (req, res) => {
  // console.log(myName);//500 error
  res.render("introduce", { title: "소개말입니다.", mainTitle: "company" }); //파일명
});
app.get("/estimate", (req, res) => {
  //내맘대로
  res.render("estimate", { title: "소개말입니다.", mainTitle: "company" });
});
app.get("/history", (req, res) => {
  res.render("history", { title: "소개말입니다.", mainTitle: "company" });
});
app.get("/greeting", (req, res) => {
  res.render("greeting", { title: "인사말입니다.", mainTitle: "company" });
});
app.get("/location", (req, res) => {
  res.render("location", { title: "인사말입니다.", mainTitle: "company" });
});
app.get("/market", (req, res) => {
  res.render("market", { title: "인사말입니다.", mainTitle: "company" });
});
app.get("/philosophy", (req, res) => {
  res.render("philosophy", { title: "인사말입니다.", mainTitle: "company" });
});
app.get("/notice", (req, res) => {
  res.render("notice", { title: "인사말입니다.", mainTitle: "company" });
});

app.get("/list", (req, res) => {
  // res.send("list 입니다.")
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5502");
  // res.header("Access-Control-Allow-Origin", "*");//cors
  res.json([
    { title: "타이틀01", contents: "내용1입니다." },
    { title: "타이틀02", contents: "내용2입니다." },
    { title: "타이틀03", contents: "내용3입니다." },
    { title: "타이틀04", contents: "내용4입니다." },
    { title: "타이틀05", contents: "내용5입니다." },
  ]);
});
app.get("/naver", (req, res) => {
  // 여기서 naver에 검색을 요청해서 결과를 받아서 리턴
  console.log(req.query);
  const queryTxt = encodeURIComponent(req.query.movieTitle);
  axios({
    url: `https://openapi.naver.com/v1/search/movie.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": "e7dJd7hdnvnEu_lNL5Kx",
      "X-Naver-Client-Secret": "9v3lVhATtL",
    },
  }).then(function (response) {
    //console.log(response.data);
    res.json(response.data);
  });
  //res.json();
});
//404 routing 오류
app.use((req, res, next) => {
  res.status(404).render("404");
});
//서버오류
app.use((err, req, res, next) => {
  res.status(500).render("error", { msg: "An unknown error occurred." });
});
app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
