const express = require("express");
const Joi = require("joi");

const app = express();

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses1" },
  { id: 3, name: "courses1" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

// app.get("/api/:year/:month", (req, res) => {
//   res.send(req.params);
// });

app.get("/api/courses/", (req, res) => {
  return res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("目前沒有這個課程");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body); // result.error
  //400 Bad request
  if (error) return res.status(400).send(error.message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //look up the course
  //in not existing return 404
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("目前沒有這個課程");
  //validata
  //if invalid , return 400 - Bad request

  const { error } = validateCourse(req.body); // result.error
  //400 Bad request
  if (error) return res.status(400).send(error.message);

  //Update course
  course.name = req.body.name;
  //Return the update course
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("目前沒有這個課程");

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(course);
};

app.listen(8080, () => {
  console.log("server is running...");
});
