
export default function CoursePlannerComp({ data }) {
	console.log(data);
	const maxCourses = Math.max(data.map((sem) => sem.courses.length));
	console.log(maxCourses);
	return (
		<table>
			<thead>
				<tr>
					{data.map((semester, index) => <th>Semester {index+1}</th>)}
				</tr>
			</thead>
			<tbody>

			</tbody>
		</table>

	)
}
