export const UserRole = {
  USER: 'USER',
  OPERATOR: 'OPERATOR',
  AUDITOR: 'AUDITOR',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
