export class GetUserInfoResponseDTO {
  email: string;
  userRole: string;
  recommenderId?: string;
  lastLoginDate?: string;
  loginDays: number;
  recommenderCount: number;

  constructor(args: {
    email: string;
    userRole: string;
    recommenderId?: string;
    lastLoginDate?: string;
    loginDays: number;
    recommenderCount: number;
  }) {
    this.email = args.email;
    this.userRole = args.userRole;
    this.recommenderId = args.recommenderId;
    this.lastLoginDate = args.lastLoginDate;
    this.loginDays = args.loginDays;
    this.recommenderCount = args.recommenderCount;
  }
}
