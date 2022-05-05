import React from 'react'
import PropTypes from "prop-types";


export const EditBurgerForm = ({ burger, updateBurger, deleteBurger, index }) => {

	const handleChange = (e) => {
		const updatedBurger = {
			...burger,
			[e.currentTarget.name]: e.currentTarget.name === 'price'
				? parseFloat(e.currentTarget.value) || 0
				: e.currentTarget.value
		}
		updateBurger(index, updatedBurger);
	}

	return (
		<div className="burger-edit">
			<input
				name="name"
				type="text"
				placeholder="Name"
				autoComplete="off"
				value={burger.name}
				onChange={handleChange}
			/>
			<input
				name="price"
				type="text"
				placeholder="Price"
				autoComplete="off"
				value={burger.price}
				onChange={handleChange}
			/>
			<select
				name="status"
				className="status"
				value={burger.status}
				onChange={handleChange}
			>
				<option value="available">Доступно</option>
				<option value="unavailable">Убрать из меню</option>
			</select>
			<textarea
				name="desc"
				placeholder="Desc"
				value={burger.desc}
				onChange={handleChange}
			/>
			<input
				name="image"
				type="text"
				placeholder="Image"
				autoComplete="off"
				value={burger.image}
				onChange={handleChange}
			/>
			<button
				type="submit"
				onClick={() => deleteBurger(index)}
			>Удалить из меню
			</button>
		</div>
	)
}

EditBurgerForm.propTypes = {
	burger: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		price: PropTypes.number,
		desc: PropTypes.string,
		status: PropTypes.string
	}),
	index: PropTypes.string,
	updateBurger: PropTypes.func,
	deleteBurger: PropTypes.func
}


