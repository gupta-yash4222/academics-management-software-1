import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CoursePlannerComp from '../components/CoursePlanner'

export default function CoursePlannerPage () {
	const [semData, setSemData] = useState([]);
	const baseUrl = 'http://localhost:3000/';

	useEffect(() => {
		let data = [];
		axios.get(baseUrl + 'coursePlanner/getNum')
		.then(res => {
			if(res.status === 200) {
				const numSems = res.data.numSem;
				console.log(numSems);
				for(let i=1; i<=numSems; i++) {
					axios.get(baseUrl + `coursePlanner/semester/${i}`)
					.then(resp => {
						if(resp.status === 200) {
							data.push(resp.data.semester);
							// alert(`data added for sem ${i}`);
							// console.log(resp.data.semester);
						}
						else {
							console.log(resp);
							alert(`An error occured while fetching semester ${i}`);
						}
					})
					.catch(err => {
						console.log(err);
						alert(`An error occured while fetching semester ${i}`);
					});
				}
				setSemData(data);
			}
			else {
				alert("An error occured!");
				console.log(res);
			}
		})
		.catch(err => {
			alert("An error occured!");
			console.log(err);
		});
	}, []);

	return (
		<div>
			<CoursePlannerComp data={semData}/>
		</div>
	)
}
