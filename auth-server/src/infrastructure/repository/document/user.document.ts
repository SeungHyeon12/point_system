import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/domain/user';
import { UserRole } from 'src/domain/vo/user.role';

interface UserSchemaMethod {
  toEntity(): User;
}

@Schema({ timestamps: true })
export class UserDocument {
  @Prop({
    required: true,
    type: String,
  })
  _id: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    require: true,
    type: String,
    enum: UserRole,
  })
  userRole: UserRole;

  @Prop({
    type: String,
  })
  recommenderId?: string;

  @Prop({
    type: String,
  })
  lastLoginDate?: string;

  @Prop({
    required: true,
    type: Number,
  })
  loginDays: number;

  createdAt: Date;

  updatedAt: Date;

  toDomain() {
    return new User({
      id: this._id,
      email: this.email,
      password: this.password,
      userRole: this.userRole,
      recommenderId: this.recommenderId,
      lastLoginDate: this.lastLoginDate,
      loginDays: this.loginDays,
    });
  }
}

export type UserSchema = HydratedDocument<UserDocument, UserSchemaMethod>;
export const UserSchema = SchemaFactory.createForClass(UserDocument);
