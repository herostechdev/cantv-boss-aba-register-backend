import { SetMetadata } from '@nestjs/common';
import { Permission } from '../security/insurables/permission-constants';

export const REQUIRE_PERMISSIONS_KEY = 'requirePermissions';
export const RequirePermissions = (...requirePermissions: Permission[]) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, requirePermissions);
