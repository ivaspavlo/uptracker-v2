
import { AuthEffects } from './auth.effects';
import { CorePageEffects } from './core-page.effects';
import { UserEffects } from './user.effects';
import { AccountEffects } from './account.effects';
import { LocationsEffects } from './locations.effects';

export * from './auth.effects';

export const CORE_EFFECTS = [
  AuthEffects,
  CorePageEffects,
  UserEffects,
  AccountEffects,
  LocationsEffects
];
