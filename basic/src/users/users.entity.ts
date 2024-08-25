import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  // 사용자 속성

  // PK
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  /* Hook */
  // Insert 시점에 작동
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with this.id', this.id)
  }

  // Update 시점에 작동
  @AfterUpdate()
  logUopdate() {
    console.log('Updated User with id', this.id)
  }

  // Delete 시점에 작동
  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id)
  }
} 