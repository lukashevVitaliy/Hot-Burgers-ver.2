import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addToOrder } from "../../store/reducers/orderSlice";
import "./burgers.scss";


export const Burgers = ({ details, index }) => {
	const orders = useSelector(state => state.order.order);
	const dispatch = useDispatch();

	const { image, name, price, desc, status } = details;
	const isAvailable = status === "available";

	const handleClick = (key) => {
		const order = { ...orders };
		order[key] = order[key] + 1 || 1;
		dispatch(addToOrder(order));
	}

	return (
		<li className="menu-burger">
			<div className="image-container">
				<img src={image} alt={name} />
			</div>
			<div className="burger-details">
				<h3 className="burger-name">
					{name}
					<span className="price">{price} ₽</span>
				</h3>
				<p>{desc}</p>
				<button
					className="buttonOrder"
					disabled={!isAvailable}
					onClick={() => handleClick(index)}
				>{isAvailable ? "Заказать" : "Временно нет"}
				</button>
			</div>
		</li>
	)
}

Burgers.propTypes = {
	details: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		price: PropTypes.number,
		desc: PropTypes.string,
		status: PropTypes.string
	}),
	index: PropTypes.string,
	addToOrder: PropTypes.func
}

export default Burgers;