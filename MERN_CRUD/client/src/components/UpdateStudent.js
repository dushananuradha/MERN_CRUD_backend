/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


const UpdateStudent = (props) => {
	let history = useHistory();
	const id = props.match.params.id;
	
	const [newStudent, setNewStudent] = useState({
		name: "",
		age: "",
		academicYear: "",
	});

	//To create a new JS object
	const { name, age, academicYear } = newStudent;
	const getCurrentData = async ()=> {
		axios.get(`http://localhost:4040/student/get/${id}`).then((res)=> {	
			setNewStudent({
				name:res.data.student.name,
				age:res.data.student.age,
				academicYear:res.data.student.academicYear,
			})})
			.catch((err) => {
				alert(err);
			});
	}

	useEffect(()=> {
		getCurrentData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const onInputChange = (e) => {
		setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
	};


	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.put(`http://localhost:4040/student/update/${id}`,newStudent);
		history.push("/");
	};
	

	return (
		<div className="container">
			<h1>Update Student</h1>
			<form onSubmit={(e) => onSubmit(e)}>
			
				<div className="form-group">
					<label for="name">Student Name</label>
					<input
						type="text"
						className="form-control"
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
						value={academicYear}
						placeholder="Enter Student Academic Year"
						onChange={(e) => onInputChange(e)}
					/>
				</div>

				<button className="btn btn-primary">Update Done</button>
			</form>
		</div>
	);
};

export default UpdateStudent;