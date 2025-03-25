import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";
export declare class GetMovies {
    private readonly movieRepository;
    constructor(movieRepository: MovieRepositoryPort);
    find(): Promise<Movie[] | null>;
}
