import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { ArticleEntity } from '../article/article.entity';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];

  @OneToMany(() => ArticleEntity, article => article.author)
  articles: ArticleEntity[];
}
