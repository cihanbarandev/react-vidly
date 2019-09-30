import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Favorite from './common/favorite';
import Pagination from './common/pagination';
import Paginate from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1
	};

	handleDelete = movie => {
		let movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	};

	handleFavorite = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movie, isFavorite: !movie.isFavorite };
		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	renderMovies() {
		const { movies: allMovies, pageSize, currentPage } = this.state;
		const movies = Paginate(allMovies, currentPage, pageSize);

		const movieEls = movies.map(movie => {
			return (
				<tr key={movie._id}>
					<td>{movie.title}</td>
					<td>{movie.genre.name}</td>
					<td>{movie.numberInStock}</td>
					<td>{movie.dailyRentalRate}</td>
					<td>
						{/* favorite movie */}
						<Favorite
							isFavorite={movie.isFavorite}
							onFavorite={() => {
								this.handleFavorite(movie);
							}}
						/>
					</td>
					<td>
						{/* delete movie */}
						<button
							onClick={() => this.handleDelete(movie)}
							className="btn btn-danger btn-sm"
						>
							Delete
						</button>
					</td>
				</tr>
			);
		});
		return movieEls;
	}

	render() {
		const { movies, pageSize, currentPage } = this.state;
		const moviesLength = movies.length;
		if (moviesLength) {
			return (
				<React.Fragment>
					<h3>Showing {moviesLength} movies.</h3>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Genre</th>
								<th scope="col">Stock</th>
								<th scope="col">Rate</th>
								<th scope="col"></th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>{this.renderMovies()}</tbody>
					</table>
					<Pagination
						itemsCount={moviesLength}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</React.Fragment>
			);
		} else {
			return <h3>There are no movies in the database!</h3>;
		}
	}
}

export default Movies;
