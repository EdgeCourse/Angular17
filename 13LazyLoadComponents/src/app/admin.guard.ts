// src/app/admin.guard.ts
import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  // Replace this with your actual logic (e.g., checking an auth service)
  const isAdmin = /* your admin check here */ true;
  if (isAdmin) {
    return true;
  }
  // If not authorized, you can redirect or simply return false
  return false;
};
