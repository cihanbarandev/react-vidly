import React, { Component } from 'react';
import Favorite from './common/favorite';
import Table from './common/table';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like',
			content: movie => (
				<Favorite
					isFavorite={movie.isFavorite}
					onFavorite={() => this.props.onFavorite(movie)}
				/>
			),
			sortable: false
		},
		{
			key: 'delete',
			content: movie => (
				<button
					onClick={() => this.props.onDelete(movie)}
					className="btn btn-danger btn-sm"
				>
					Delete
				</button>
			),
			sortable: false
		}
	];

	render() {
		const { movies, sortColumn, onSort } = this.props;

		return (
			<Table
				data={movies}
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;
