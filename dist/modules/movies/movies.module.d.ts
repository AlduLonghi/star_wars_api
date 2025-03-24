import { OnModuleInit } from '@nestjs/common';
import { ExternalStarWarsSeeder } from './infraestructure/external/stars-wars.api';
export declare class MoviesModule implements OnModuleInit {
    private readonly movieService;
    constructor(movieService: ExternalStarWarsSeeder);
    onModuleInit(): Promise<void>;
}
