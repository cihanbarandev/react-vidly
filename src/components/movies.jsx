import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import Paginate from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' }
	};

	componentDidMount() {
		const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = movie => {
		let movies = this.state.movies.filter(m => m._id !== movie._id);

		this.setState({ movies }, () => {
			const pagesCount = Math.ceil(this.state.movies.length / this.state.pageSize);
			console.log(pagesCount);
			this.setState({ currentPage: pagesCount});
		});
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

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	render() {
		console.count('rendered');
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			genres,
			selectedGenre,
			sortColumn
		} = this.state;

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;

		const sortedMovies = _.orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		);

		const paginatedMovies = Paginate(sortedMovies, currentPage, pageSize);
		const allMoviesCount = allMovies.length;
		const filteredMoviesCount = filteredMovies.length;

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
						<MoviesTable
							movies={paginatedMovies}
							onDelete={this.handleDelete}
							onFavorite={this.handleFavorite}
							sortColumn={sortColumn}
							onSort={this.handleSort}
						></MoviesTable>
						<Pagination
							itemsCount={allMoviesCount}
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
