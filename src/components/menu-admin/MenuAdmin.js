import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

import auth from "../../firebase";
import { useHttp } from "../../hooks/http.hooks";
import { burgersFetching, burgersFetched, burgersFetchingError, burgersDeleted } from "../../store/reducers/burgersSlice";
import { AddBurgersForm } from "../add-burgers-form";
import { EditBurgerForm } from "../edit-burger-form";
import "./menuAdmin.scss";


export const MenuAdmin = () => {
	const [user, setUser] = useState('');
	const [photo, setPhoto] = useState('');

	const burgers = useSelector(state => state.burgers.burgers);
	const { burgersLoadingStatus } = useSelector(state => state.burgers);
	const dispatch = useDispatch();
	const { request } = useHttp();
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				authHandler({ user })
			}
		});
	}, [])

	const authHandler = async (data) => {
		const { email, photoURL } = data.user;
		setUser(email);
		setPhoto(photoURL);
	}

	const loadSampleBurgers = () => {
		dispatch(burgersFetching());
		request("http://localhost:3001/burgers")
			.then(data => dispatch(burgersFetched(data)))
			.catch(() => dispatch(burgersFetchingError()))
	}

	const updateBurger = (key, updatedBurger) => {
		const burgersUpd = { ...burgers };
		burgersUpd[key] = updatedBurger;

		request("http://localhost:3001/burgers", "PUT", JSON.stringify(burgersUpd))
			.then(res => console.log(res, "Отправка успешна"))
			.then(dispatch(burgersFetched(burgersUpd)))
			.catch(error => console.log(error.message))
	}

	const deleteBurger = (id) => {
		const burgersNew = { ...burgers };
		delete burgersNew[id];

		request('http://localhost:3001/burgers/', "POST", JSON.stringify(burgersNew))
			.then(res => console.log(res, "Позиция успешно удалена"))
			.then(dispatch(burgersDeleted(burgersNew)))
			.catch(err => console.log(err))
	}

	if (burgersLoadingStatus === "loading") {
		return <h4 className="loading">Загрузка данных...</h4>
	} else if (burgersLoadingStatus === "error") {
		return <h4 className="error">Ошибка загрузки данных...</h4>
	}

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				navigate(`/`);
				window.location.reload(true);
			})
			.cath((error) => console.log(error.mesage));
	}

	const avatar = photo ? photo : "/images/avatar.png";


	return (
		<div className="menu-admin">
			{
				user && <div className="login-header">
					<div className="avatar">
						<img src={avatar} alt={user} />
					</div>
					<button
						className="buttonLogout"
						onClick={handleLogout}
					>Выйти</button>
				</div>
			}

			<h2>Управление меню</h2>
			{
				Object.keys(burgers).map(key => {
					return (
						<EditBurgerForm
							key={key}
							index={key}
							burger={burgers[key]}
							updateBurger={updateBurger}
							deleteBurger={deleteBurger}
						/>
					)
				})
			}

			<AddBurgersForm />
			<button onClick={loadSampleBurgers} >Загрузить бургеры</button>
		</div>
	)
}