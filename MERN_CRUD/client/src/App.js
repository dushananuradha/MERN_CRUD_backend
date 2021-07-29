import Header from "./components/Header";
import AddStudent from "./components/AddStudent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllStudents from "./components/AllStudents";
import UpdateStudent from "./components/UpdateStudent";

function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<Route path="/add" exact component={AddStudent} />
				<Route path="/" exact component={AllStudents} />
				<Route
					path="/edit/:id"
					exact
					component={UpdateStudent}
				/>
			</div>
		</Router>
	);
}

export default App;