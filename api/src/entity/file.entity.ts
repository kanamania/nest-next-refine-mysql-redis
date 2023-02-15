import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum FileStateType {
  BAD = 'bad',
  GOOD = 'good',
}
export enum FileType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  MEDIA = 'media',
}
@Entity('File')
export class FileEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text' })
  hash: string;
  @Column({ type: 'bigint' })
  size: number;
  @Column({ type: 'text' })
  mime: string;
  @Column({ type: 'text' })
  path: string;
  @Column({ type: 'enum', enum: FileType })
  type: string;
  @Column({ type: 'enum', enum: FileStateType })
  state: string;
  @Column('bigint', { unsigned: true, nullable: true })
  created_by: number;
  @Column('bigint', { unsigned: true, nullable: true })
  modified_by: number;
  @Column('bigint', { unsigned: true, nullable: true })
  deleted_by: number;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date = new Date();
  @Column('timestamp', {
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;
  @Column('timestamp', { nullable: true })
  deleted_at: Date;
}