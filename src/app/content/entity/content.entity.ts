import { ArticleEntity } from '../../article/entity/article.entity';
import { TrailEntity } from '../../trail/entity/trail.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity({ name: 'contents' })
export class ContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => TrailEntity, (contents) => ContentEntity)
  trail: TrailEntity;

  @OneToMany(() => ArticleEntity, (content) => ContentEntity)
  articles: ArticleEntity[];

  @ManyToOne(() => UserEntity, (contents) => ContentEntity)
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(content?: Partial<ContentEntity>) {
    this.id = content?.id;
    this.name = content?.name;
    this.trail = content?.trail;
    this.articles = content?.articles;
    this.user = content?.user;
    this.createdAt = content?.createdAt;
    this.updatedAt = content?.updatedAt;
    this.deletedAt = content?.deletedAt;
  }
}
