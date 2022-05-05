import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { deleteOrder } from "../../store/reducers/orderSlice";
import { Shipment } from "../shipment";
import "./order.scss";


export const Order = () => {
	const burgers = useSelector(state => state.burgers.burgers);
	const order = useSelector(state => state.order.order);
	const dispatch = useDispatch();

	const orderIds = Object.keys(order);

	const total = orderIds.reduce((prevTotal, key) => {
		const burger = burgers[key];
		const count = order[key];

		const isAvailable = burger && burger.status === 'available';
		if (isAvailable) {
			return prevTotal + burger.price * count;
		}
		return prevTotal;
	}, 0);

	const deleteFromOrder = (id) => {
		dispatch(deleteOrder(id))
	}

	const renderOrder = (key) => {
		const burger = burgers[key];
		const count = order[key];

		const transitionOptions = {
			classNames: "order",
			key,
			timeout: { enter: 500, exit: 500 }
		}

		const isAvailable = burger && burger.status === 'available';
		if (!isAvailable) {
			return (
				<CSSTransition {...transitionOptions} >
					<li key={key} className="unavailable">
						Извините, {burger ? burger.name : 'бургер'} времено не доступен
					</li>
				</CSSTransition>
			)
		}

		return (
			<CSSTransition {...transitionOptions} >
				<li key={key}>
					<span>
						<TransitionGroup component="span" className="count" >
							<CSSTransition
								classNames="count"
								key={count}
								timeout={{ enter: 500, exit: 500 }}
							>
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						шт. - {burger.name}
						<span> {count * burger.price} ₽</span>
						<button
							className="cancelItem"
							onClick={() => deleteFromOrder(key)}
						>&times;</button>
					</span>
				</li>
			</CSSTransition>
		)
	}


	return (
		<div className="order-wrap">
			<h2>Ваш Заказ</h2>
			<TransitionGroup component='ul' className="order">
				{orderIds && orderIds.map(renderOrder)}
			</TransitionGroup>
			{
				total > 0
					? <Shipment total={total} />
					: <div className="nothingSelected">Выберите блюдо и добавьте к заказу</div>
			}
		</div>
	)
}



