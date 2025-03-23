export abstract class LoginPort {
  abstract execute(email: string, password: string): Promise<{ accessToken: string }>;
}

export abstract class RegisterPort {
  abstract execute(email: string, password: string, role: string): Promise<unknown>;
}
