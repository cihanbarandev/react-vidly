import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Favorite from './common/favorite';

class Movies extends Component {
	state = {
		movies: getMovies()
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

	attachIsFavorite() {
		const moviesWithFavorite = this.state.movies.map(m => {
			m.isFavorite = false;
			return m;
		});
		this.setState({ movies: moviesWithFavorite });
	}

	renderMovies() {
		const movieEls = this.state.movies.map(movie => {
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
		const isThereMovie = this.state.movies.length;
		if (isThereMovie) {
			return (
				<React.Fragment>
					<h3>Showing {this.state.movies.length} movies.</h3>
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
				</React.Fragment>
			);
		} else {
			return <h3>There are no movies in the database!</h3>;
		}
	}

	componentDidMount() {
		this.attachIsFavorite();
	}
}

export default Movies;
