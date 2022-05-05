import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hooks";

import { burgersCreated } from "../../store/reducers/burgersSlice";

import "./add-burgers-form.scss";

export const AddBurgersForm = () => {
	const burgers = useSelector(state => state.burgers.burgers);
	const dispatch = useDispatch();
	const { request } = useHttp();

	// создаем ссылки
	const nameRef = React.createRef();
	const priceRef = React.createRef();
	const statusRef = React.createRef();
	const descRef = React.createRef();
	const imageRef = React.createRef();


	const createBurger = (e) => {
		e.preventDefault();
		// создаю новый объект
		const newItem = {
			[[`burger#${Date.now()}`]]: {
				name: nameRef.current.value,
				price: parseFloat(priceRef.current.value || 0),
				status: statusRef.current.value,
				desc: descRef.current.value,
				image: imageRef.current.value
			}
		}
		// конвертирую новый объект в массив
		const burger = Object.entries(newItem);
		// коверитрую все бургеры из стора в массив
		const Array = Object.entries(burgers);
		// добавляю в массив с бургерами новый объект
		const newArrayBurger = [...Array, ...burger];
		// конвертирую  бургер обратно в объект
		const newObjBurger = Object.fromEntries(newArrayBurger)

		request("http://localhost:3001/burgers", "POST", JSON.stringify(newObjBurger))
			.then(res => console.log(res, "Отправка успешна"))
			.then(dispatch(burgersCreated(newObjBurger)))
			.catch(err => console.log(err));

		e.currentTarget.reset();
	}


	return (
		<form
			className="burger-edit"
			onSubmit={createBurger}
		>
			<input
				ref={nameRef}
				name="name"
				type="text"
				placeholder="Name"
				autoComplete="off"
			/>
			<input
				ref={priceRef}
				name="price"
				type="text"
				placeholder="Price"
				autoComplete="off"
			/>
			<select
				ref={statusRef}
				name="status"
				className="status"
			>
				<option value="available">Доступно</option>
				<option value="unavailable">Убрать из меню</option>
			</select>
			<textarea
				ref={descRef}
				name="desc"
				placeholder="Desc"
			>
			</textarea>
			<input
				ref={imageRef}
				name="image"
				type="text"
				placeholder="Image"
				autoComplete="off"
			/>
			<button type="submit">+Добавить в меню</button>
		</form>
	)
}