const router = require("express").Router();
let Student = require("../models/Student");
const mongoose = require("mongoose");

router.route("/add").post((req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	const academicYear = req.body.academicYear;

	//To create a new object of imported Student schema (instantiate) 
	const newStudent = new Student({
		name,
		age,
		academicYear,
	});

	//To save created newStudent object in MongoDB
	newStudent
		.save()
		.then(() => {
			res.json("Student added to the database");
		})
		.catch((err) => {
			console.log(err);
		});
});

//To create get method
router.route("/").get((req, res) => {
	Student.find()
		.then((students) => {
			res.json(students);
		})
		.catch((err) => {
			console.log(err);
		});
});

//To create update method
router.route("/update/:id").put(async (req, res) => {
	//take an id and store
	//id comes as a paramater in backend url
	let studentId = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(studentId)) return false;
	//destructuring
	const { name, age, academicYear } = req.body;

	//To create an object to update data (coming from the frontEnd) to pass to the document with relevant studentid in MongoDB
	const updatedStudent = {
		name,
		age,
		academicYear,
	};

	//Instead passing a seprate updatedStudent, {name,age,academicYear} also OK
	const update = await Student.findByIdAndUpdate(studentId, updatedStudent)
		.then(() => {
			//To send a frontend the updated information, after updatig them in MongoDb
			res.status(200).send({
				status: "Student updated",
				//student: update,
			});
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.send({ status: "Error with updating data", error: err.message });
		});
});

//To delete a student
router.route("/delete/:id").delete(async (req, res) => {
	let studentId = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(studentId)) return false;

	await Student.findByIdAndDelete(studentId)
		.then(() => {
			res.status(200).send({ status: "Student is deleted" });
		})
		.catch((err) => {
			console.log(err.message);
			res
				.status(500)
				.send({ status: "Error with delete student", error: err.message });
		});
});

//To get single student
router.route("/get/:id").get(async (req, res) => {
	let studentId = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(studentId)) return false;
	const student = await Student.findById(studentId)
		.then((student) => {
			res.status(200).send({ status: "Student fetched", student });
			student
		})
		.catch((err) => { 
			console.log(err.message);
			res
				.status(500)
				.send({ status: "Error with get student", error: err.message });
		});
});

module.exports = router;
