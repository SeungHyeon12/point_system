export const EventCondition = {
  INVITE_THREE_FRIENDS: 'INVITE_THREE_FRIENDS',
  LOGIN_SEVEN_DAYS: 'LOGIN_SEVEN_DATYS',
  LOTTERY: 'LOTTERY',
} as const;

export type EventCondition =
  (typeof EventCondition)[keyof typeof EventCondition];
