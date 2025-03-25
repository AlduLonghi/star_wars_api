// src/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export class Roles {
  static setRoles(...roles: string[]) {
    return SetMetadata('roles', roles); // This is how we set metadata using a class
  }
}

