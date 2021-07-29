import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddStudent = () => {
	let history = useHistory();
	const [newStudent, setNewStudent] = useState({
		name: "",
		age: "",
		academicYear: "",
	});

	//To create a new JS object
	const { name, age, academicYear } = newStudent;

	const onInputChange = (e) => {
		setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
		
	};
	

//To send data to backend as http requests
const sendDataToBackEnd = async (e) => {
	e.preventDefault();
	await axios
		.post("http://localhost:4040/student/add", newStudent)
		.then(() => {
			alert("Student is successfully added");
			setNewStudent({
				name: "",
				age: "",
				academicYear: "",
			})
		})
		.catch((err) => {
			alert(err);
		});
	history.push("/");
};
	
	return (
		<div className="container">
			<h1>Add New Student in Below Table</h1>
			<form onSubmit={(e) => sendDataToBackEnd(e)}>
				<div className="form-group">
					<label for="name">Student Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						value={name}
						placeholder="Enter Student Name"
						onChange={(e) => onInputChange(e)}
					/>
				</div>

				<div className="form-group">
					<label for="age">Student Age</label>
					<input
						type="text"
						className="form-control"
						id="age"
						name="age"
						value={age}
						placeholder="Enter Student Age"
						onChange={(e) => onInputChange(e)}
					/>
				</div>

				<div className="form-group">
					<label for="academicYear">Academic Year</label>
					<input
						type="text"
						className="form-control"
						id="academicYear"
						name="academicYear"
						value={academicYear}
						placeholder="Enter Student Academic Year"
						onChange={(e) => onInputChange(e)}
					/>
				</div>

				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

export default AddStudent;