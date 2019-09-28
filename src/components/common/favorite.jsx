import React from 'react';

const Favorite = props => {
	const { isFavorite, onFavorite } = props;
	return (
		<i
			className={isFavorite ? 'fas fa-star Favorite' : 'far fa-star Favorite'}
			onClick={onFavorite}
			style={{ cursor: 'pointer' }}
		></i>
	);
};

export default Favorite;
