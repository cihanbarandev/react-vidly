/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const setClassName = (page, index, props) => {
	const { pageSize, currentPage, currentlyDisplayedItemsCount } = props;
	let className = 'page-item';
	className = page === currentPage ? `${className} active` : className;
	className =
		currentlyDisplayedItemsCount <= pageSize && index !== 0
			? `${className} disabled`
			: className;

	return className;
};

const Pagination = props => {
	const {
		itemsCount,
		pageSize,
		currentlyDisplayedItemsCount,
		onPageChange
	} = props;

	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	console.log(currentlyDisplayedItemsCount);

	return (
		<nav>
			<ul className="pagination justify-content-center">
				{pages.map((page, index) => {
					return (
						<li key={page} className={setClassName(page, index, props)}>
							<a
								className="page-link"
								onClick={() => {
									onPageChange(page);
								}}
							>
								{page}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};

export default Pagination;
