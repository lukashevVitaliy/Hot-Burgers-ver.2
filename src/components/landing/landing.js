import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http.hooks";

import {
	restaurantsFetching,
	restaurantsFetched,
	restaurantsFetchingError,
	setCurrentRestaurants
} from "../../store/reducers/restaurantsSlice";

import "./landing.scss";


export const Landing = () => {
	const [display, setDisplay] = useState(false);
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	const { restaurants, restaurantsLoadingStatus } = useSelector(state => state.restaurants);
	const dispatch = useDispatch();
	const { request } = useHttp();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(restaurantsFetching());
		request("http://localhost:3001/restaurants")
			.then(data => dispatch(restaurantsFetched(data)))
			.catch(() => dispatch(restaurantsFetchingError()))
	}, [])

	if (restaurantsLoadingStatus === "loading") {
		return <h4 className="loading">Загрузка данных...</h4>
	} else if (restaurantsLoadingStatus === "error") {
		return <h4 className="error">Ошибка загрузки данных...</h4>
	}

	const displayList = () => {
		setDisplay({ display: !display })
	}

	const getTitle = (restaurant) => {
		const { title, url } = restaurant;
		setDisplay(false);
		setTitle(title);
		setUrl(url);
	}

	const handleClick = () => {
		dispatch(setCurrentRestaurants(title, url));
		navigate(`/restaurant/${url}`);
	}

	return (
		<div className="restaurant_select">

			<div className="restaurant_select_top" onClick={displayList}>
				<div className="restaurant_select_top-header font-effect-shadow-multiple">
					{title || "Выбери ресторан"}
				</div>

				<div className="arrow_picker">
					<div className="arrow_picker-up"></div>
					<div className="arrow_picker-down"></div>
				</div>
			</div>

			{display && <div className="restaurant_select_bottom">
				<ul>
					{
						restaurants.map(restaurant => {
							return <li
								key={restaurant.id}
								onClick={() => getTitle(restaurant)}
							>{restaurant.title}</li>
						})
					}
				</ul>
			</div>}

			{title && !display && <button onClick={handleClick}>Перейти в ресторан</button>}
		</div>
	)
}