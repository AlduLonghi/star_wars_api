export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}
