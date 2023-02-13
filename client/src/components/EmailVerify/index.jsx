import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";

// import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);

	const param = useParams();

    console.log(param);
	console.log("heeleoe");	
	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5000/api/user/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
                console.log("ereref");
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				//console.log(error);
				setValidUrl(false);
			}
		};
		if(validUrl) {
			verifyEmailUrl();
		}

	}, []);

	return (
		<>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email Sent to Admin successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default EmailVerify;

