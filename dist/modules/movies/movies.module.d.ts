import { OnModuleInit } from '@nestjs/common';
import { ExternalStarWarsService } from './infraestructure/external/external-stars-wars.service';
export declare class MoviesModule implements OnModuleInit {
    private readonly movieService;
    constructor(movieService: ExternalStarWarsService);
    onModuleInit(): Promise<void>;
}
