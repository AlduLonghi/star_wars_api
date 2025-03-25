import { OnModuleDestroy } from '@nestjs/common';
import { MovieRepositoryPort } from '../../domain/ports';
export declare class ExternalStarWarsService implements OnModuleDestroy {
    private readonly movieRepository;
    private readonly logger;
    private readonly starWarsApiUrl;
    private readonly SEED_INTERVAL;
    private seedInterval;
    constructor(movieRepository: MovieRepositoryPort);
    fetchMoviesFromApi(): Promise<any>;
    saveMoviesToDatabase(movies: any[]): Promise<void>;
    seedMoviesOnce(): Promise<void>;
    startRecurringMovieSeeding(): void;
    onModuleDestroy(): void;
}
