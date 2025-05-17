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
  id: string;

  @Prop({
    required: true,
    type: String,
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

  createdAt: Date;

  updatedAt: Date;

  toDomain() {
    return new User({
      id: this.id,
      email: this.email,
      password: this.password,
      userRole: this.userRole,
      recommenderId: this.recommenderId,
    });
  }
}

export type UserSchema = HydratedDocument<UserDocument, UserSchemaMethod>;
export const UserSchema = SchemaFactory.createForClass(UserDocument);
