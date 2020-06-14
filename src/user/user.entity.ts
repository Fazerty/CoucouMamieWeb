import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { ArticleEntity } from '../article/article.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('user')
@ObjectType({ description: 'User model' })
export class UserEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  username: string;

  @Column()
  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @Column({ default: '' })
  @Field({ nullable: false })
  bio: string;

  @Column({ default: '' })
  @Field({ nullable: false })
  image: string;

  @Column()
  @Field({ nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  @Field(() => [ArticleEntity], { nullable: 'items' })
  favorites: ArticleEntity[];

  @OneToMany(() => ArticleEntity, article => article.author)
  @Field(() => [ArticleEntity], { nullable: 'items' })
  articles: ArticleEntity[];
}
