import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('tag')
@ObjectType({ description: 'Tag model' })
export class TagEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  tag: string;

}
