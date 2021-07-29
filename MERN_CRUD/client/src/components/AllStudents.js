import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useHistory } from "react-router-dom";

const AllStudents = (props) => {
	const [students, setStudents] = useState([]);

	const id = props.match.params.id;

	useEffect(() => {
		loadStudents();
	}, []);

	const loadStudents = async () => {
		const result = await axios.get("http://localhost:4040/student/");
		setStudents(result.data);
	};



	const deleteUser = (async) => {
		// eslint-disable-next-line no-undef
		axios.delete(`http://localhost:4040/student/delete/${id}`);
		console.log(id)
		loadStudents();
	};

	

	return (
		<div className="container">
			<h1>All Students</h1>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Student Name</th>
						<th scope="col">Student Age</th>
						<th scope="col">Academic Year</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student, index) => (
						<tr>
							<th scope="row">{index + 1}</th>
							<td>{student.name}</td>
							<td>{student.age}</td>
							<td>{student.academicYear} </td>
							<td>
								<Link
									class="btn btn-outline-primary mr-2"
									to={`/edit/${student._id}`}
								>
									Edit
								</Link>
								<Link
									class="btn btn-danger"
									onClick={() => deleteUser(id)}
								>
									Delete
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AllStudents;