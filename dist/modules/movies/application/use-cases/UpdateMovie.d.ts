import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";
export declare class UpdateMovie {
    private readonly movieRepository;
    constructor(movieRepository: MovieRepositoryPort);
    update(id: string, movie: Partial<Movie>): Promise<Movie | null>;
}
