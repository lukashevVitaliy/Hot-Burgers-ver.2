import { useSelector } from "react-redux";
import "./header.scss";


export const Header = () => {
	const currentRestaurant = useSelector(state => state.restaurants.currentRestaurants);

	return (
		<header className="top">
			<div className="wrap">
				<div className="header-content">
					<div className="header-rating">
						<div className="header-rating_tag">Рейтинг: </div>
						<div className="header-rating_icon">★★★★★</div>
					</div>
					<div className="header-divider"></div>
					<h1 className="font-effect-outline">{currentRestaurant}</h1>
					<h3>
						<span>Быстрая доставка горячих</span>
						<span className="sub-header"> #бургеров</span>
					</h3>
				</div>
			</div>
		</header>
	)
}