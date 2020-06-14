import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeUpdate } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@Entity('article')
@ObjectType({ description: 'Article model' })
export class ArticleEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  slug: string;

  @Column()
  @Field({ nullable: false })
  title: string;

  @Column({default: ''})
  @Field({ nullable: false })
  description: string;

  @Column({default: ''})
  @Field({ nullable: false })
  body: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  @Field({ nullable: false })
  created: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  @Field({ nullable: false })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updated = new Date;
  }

  @Column('simple-array')
  @Field(() => [String])
  tagList: string[];

  @ManyToOne(() => UserEntity, user => user.articles)
  @Field(() => UserEntity)
  author: UserEntity;

  @OneToMany(() => CommentEntity, comment => comment.article, {eager: true})
  @JoinColumn()
  @Field(() => [CommentEntity], { nullable: 'items' })
  comments: CommentEntity[];

  @Column({default: 0})
  @Field({ nullable: true })
  favoriteCount: number;
}