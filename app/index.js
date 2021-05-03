
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require("cors")
const dbrl =
"mongodb+srv://admin:dipak123@cluster0.hefx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors())
app.use(bodyParser.json())

mongoose
  .connect(dbrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((res) => {
    console.log("Could not connect to database");
    process.exit();
  });

  // Schema part============================================================
const StudentSchema = mongoose.Schema(
  {
    name:"",
    email:"",
    password:""
  },
  {
    timestamps: true,
  }
);






// model part=======================================

const Student = mongoose.model("Student", StudentSchema);






app.get("/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.send(students);
    })
    .catch((err) => {
      res.send({
        message: " error ",
      });
    });
});

app.post("/students", (req, res) => {
  console.log("posting data")
  const student = new Student({
    
    name: req.body.name,
   
    email: req.body.email,
    password: req.body.password
  });
  console.log(student)
  student
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message: "Unbale to add",
      });
    });
});






app.listen(4000, () => {
  console.log("App Server Run");
});















