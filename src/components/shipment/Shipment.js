import PropTypes from "prop-types";
import './shipment.scss';


export const Shipment = ({ total }) => {

	const shipping = total > 0 && total < 500 ? 350 : 99;
	const shippingNeon = shipping === 99
		? (<span className="font-effect-shadow-multiple total_wrap-cheap">{shipping} ₽</span>)
		: (<span>{shipping} ₽</span>);

	return (
		<div className="total">
			<div className="total_wrap">
				<div>
					<div>Доставка: {total > 0 && shippingNeon}</div>
					<div className="total_wrap-free">
						{total < 500 && `Закажите еще на ${500 - total} ₽ для доставки за 99 ₽`}
					</div>
				</div>
				<div className="total_wrap-final">
					Итого: {total} ₽
				</div>
			</div>
		</div>
	)
}

Shipment.protoTypes = {
	total: PropTypes.number
}