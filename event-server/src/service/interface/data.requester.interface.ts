export type UserData = {
  email: string;
  userRole: string;
  recommenderId?: string;
  lastLoginDate?: string;
  loginDays: number;
  recommenderCount: number;
};

export interface DataRequester {
  requestUserData(userId: string): Promise<UserData>;
}
