import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('comment')
@ObjectType()
export class CommentEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  body: string;

  @ManyToOne(() => ArticleEntity, article => article.comments)
  article: ArticleEntity;
}