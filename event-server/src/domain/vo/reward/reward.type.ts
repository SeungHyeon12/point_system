export const RewardType = {
  POINT: 'POINT',
  COUPON: 'COUPON',
  INGAME_ITEM: 'INGAME_ITEM',
} as const;

export type RewardType = (typeof RewardType)[keyof typeof RewardType];
