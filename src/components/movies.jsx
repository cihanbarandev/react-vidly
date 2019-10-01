import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Favorite from './common/favorite';
import Pagination from './common/pagination';
import Paginate from '../utils/paginate';
import ListGroup from './common/listGroup';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1
	};

	componentDidMount() {
		const genres = [{ name: 'All Genres' }, ...getGenres()];

		this.setState({ movies: getMovies(), genres });
	}

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

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	renderMovies(movies) {
		const moviesEl = movies.map(movie => {
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
		return moviesEl;
	}

	render() {
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			genres,
			selectedGenre
		} = this.state;

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;

		const paginatedMovies = Paginate(filteredMovies, currentPage, pageSize);
		const allMoviesCount = allMovies.length;
		const filteredMoviesCount = filteredMovies.length;
		const paginatedMoviesCount = paginatedMovies.length;

		if (allMoviesCount) {
			return (
				<div className="row">
					<div className="col-2">
						<ListGroup
							items={genres}
							onItemSelect={this.handleGenreSelect}
							selectedItem={selectedGenre}
						/>
					</div>
					<div className="col-10">
						<h3>Showing {filteredMoviesCount} movies in the database.</h3>
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
							<tbody>{this.renderMovies(paginatedMovies)}</tbody>
						</table>
						<Pagination
							itemsCount={allMoviesCount}
							currentlyDisplayedItemsCount={paginatedMoviesCount}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			);
		} else {
			return <h3>There are no movies in the database!</h3>;
		}
	}
}

export default Movies;
