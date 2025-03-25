import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";
export declare class GetMovieByTitle {
    private readonly movieRepository;
    constructor(movieRepository: MovieRepositoryPort);
    find(title: string): Promise<Movie | null>;
}
