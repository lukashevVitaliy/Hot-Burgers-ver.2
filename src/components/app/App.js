import React from "react";
import { useSelector } from "react-redux";

import { Header } from "../header";
import { Burgers } from "../burgers";
import { Order } from "../order";
import { MenuAdmin } from "../menu-admin";
import SignIn from "../auth/sign-in/sign-in";

import "./app.scss";


const App = () => {
	const burgers = useSelector(state => state.burgers.burgers);

	return (
		<SignIn>
			<div className="burger-paradise">
				<div className="menu">
					<Header />
					<ul className="burgers">
						{Object.keys(burgers).map(key => {
							return (
								<Burgers
									key={key}
									index={key}
									details={burgers[key]}
								/>
							)
						})}
					</ul>
				</div>
				<Order />
				<MenuAdmin />
			</div>
		</SignIn>
	)
}

export default App;