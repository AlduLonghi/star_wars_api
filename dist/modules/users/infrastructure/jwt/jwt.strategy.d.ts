import { ConfigService } from '@nestjs/config';
import { User } from '../../domain/entities/user';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<Partial<User>>;
}
export {};
