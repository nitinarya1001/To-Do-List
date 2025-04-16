import express from "express";
import bodyparser from "body-parser";

const app = express();
const port = 4000;
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
let todayTask = {};
let workTask = {};

app.get("/", (req, res) => {
  res.render("index.ejs", { todayTask: todayTask, workTask: workTask });
});

app.post("/add", (req, res) => {
  if (req.body["Today"]) {
    todayTask[req.body["Today"]] = true;
    // .push(req.body["Today"]);
  }
  if (req.body["Work"]) {
    workTask[req.body["Work"]] = true;
    // workTask.push(req.body["Work"]);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  if (req.body["deleteTodayTask"]) {
    var del = Object.keys(todayTask)[req.body["deleteTodayTask"]]; //deleting items one at a time
    delete todayTask[del];
  }
  if (req.body["deleteWorkTask"]) {
    var del = Object.keys(workTask)[req.body["deleteWorkTask"]]; //deleting items one at a time
    delete workTask[del];
  }
  if (req.body["todaytaskdone"]) {
    if (todayTask[req.body["todaytaskdone"]] === true) {
      todayTask[req.body["todaytaskdone"]] = false;
    } else {
      todayTask[req.body["todaytaskdone"]] = true;
    }
  }
  if (req.body["worktaskdone"]) {
    if (workTask[req.body["worktaskdone"]] === true) {
      workTask[req.body["worktaskdone"]] = false;
    } else {
      workTask[req.body["worktaskdone"]] = true;
    }
  }
  // console.log(todayTask[req.body["todaytaskdone"]])
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`site is running on ${port}`);
});
