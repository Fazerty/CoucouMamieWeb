import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('profile')
export class ProfileEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;

}
