import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CoursePlannerComp from '../components/CoursePlanner';

const api = axios.create({
	baseURL: 'http://localhost:3000/coursePlanner',
});

export async function fetchSemData(setSemData) {
	api.get('/semester').then(res => {
		if(res.status === 200) {
			console.log("Successfully fetched semesters data");
			setSemData(res.data.semesters);
		}
		else {
			alert("An error occured! Status != 200");
			console.log(res);
		}
	}).catch(err => {
		alert("An error occured!");
		console.log(err);
	});
}

export default function CoursePlannerPage () {
	const [semData, setSemData] = useState(null);
	useEffect(() => {
		fetchSemData(setSemData);
	}, []);

	return (
		<div>
			{semData && <CoursePlannerComp semData={semData} setSemData={setSemData} />}
		</div>
	);
}
