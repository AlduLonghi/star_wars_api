import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";
export declare class CreateMovie {
    private readonly movieRepository;
    constructor(movieRepository: MovieRepositoryPort);
    create(movie: Movie): Promise<Movie | null>;
}
