import { CreateMovie } from 'src/modules/movies/application/use-cases/CreateMovie';
import { GetMovieByTitle } from 'src/modules/movies/application/use-cases/GetMovieByTitle';
import { GetMovies } from 'src/modules/movies/application/use-cases/GetMovies';
import { UpdateMovie } from 'src/modules/movies/application/use-cases/UpdateMovie';
import { Movie } from 'src/modules/movies/domain/entities/movie';
import { MovieInput, MovieUpdateInput } from './dtos';
export declare class MovieResolver {
    private readonly createMovieUseCase;
    private readonly getMovieByTitleUseCase;
    private readonly getMoviesUseCase;
    private readonly updateMovieUseCase;
    constructor(createMovieUseCase: CreateMovie, getMovieByTitleUseCase: GetMovieByTitle, getMoviesUseCase: GetMovies, updateMovieUseCase: UpdateMovie);
    createMovie(movie: MovieInput): Promise<Movie | null>;
    getMovieByTitle(title: string): Promise<Movie | null>;
    getMovies(): Promise<Movie[] | null>;
    updateMovie(id: string, movie: MovieUpdateInput): Promise<Movie | null>;
}
