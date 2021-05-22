import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';
import { MoviesController } from './controllers'

/**export function ListMovies() {
    return useSWR('/movies', MoviesController.list);
}*/

class MoviesList extends Component {

    constructor(props) {
        super(props);
        this.state = {movies: []};
        this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        /**fetch('/movies')
            .then(response => response.json())
            .then(data => this.setState({movies: data}));*/
        const response = await MoviesController.list();
        this.setState({movies: response.data});
        
    }

    async remove(title) {
        /**await fetch(`/movies/${title}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedMovies = [...this.state.movies].filter(i => i.title !== title);
            this.setState({movies: updatedMovies});
        });*/
        await MoviesController.delete(title).then(() => {
            let updatedMovies = [...this.state.movies].filter(i => i.title !== title);
            this.setState({movies: updatedMovies});
        });
    }

    render() {
        const {movies} = this.state;

        const moviesList = movies.map(movie => {
            return <tr key={movie.id}>
                <td fortesting='titel-movie' style={{whiteSpace: 'nowrap'}}>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.director}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={`/${movie.title}`}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(movie.title)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/new">Add Movie</Button>
                    </div>
                    <h3>Movies</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Title</th>
                            <th width="30%">Description</th>
                            <th width="30%">Director</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {moviesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default MoviesList;