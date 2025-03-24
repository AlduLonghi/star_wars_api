import { Model } from 'mongoose';
import { MovieRepositoryPort } from 'src/modules/movies/domain/ports';
import { Movie } from 'src/modules/movies/domain/entities/movie';
export declare class MovieRepository implements MovieRepositoryPort {
    private movieModel;
    constructor(movieModel: Model<Movie>);
    create(movie: Movie): Promise<Movie | null>;
    findById(id: string): Promise<Movie | null>;
    findAll(filter?: Partial<Movie>): Promise<Movie[] | null>;
    update(id: string, movie: Partial<Movie>): Promise<Movie | null>;
}
