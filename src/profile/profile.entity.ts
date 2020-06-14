import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('profile')
@ObjectType({ description: 'Profile model' })
export class ProfileEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  followerId: number;

  @Column()
  @Field(() => Int)
  followingId: number;

}
