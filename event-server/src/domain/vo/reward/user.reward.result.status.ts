export const UserRewardResultStatus = {
  REVIEW: 'REVIEW',
  REJECTED: 'REJECTED',
  RECEIVED: 'RECEIVED',
} as const;

export type UserRewardResultStatus =
  (typeof UserRewardResultStatus)[keyof typeof UserRewardResultStatus];
