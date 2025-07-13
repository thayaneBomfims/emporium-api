import { ContentEntity } from '../../content/entity/content.entity';
import { UserEntity } from '../../user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column('text')
  material: string;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(() => ContentEntity, (articles) => ArticleEntity)
  content: ContentEntity;

  @ManyToOne(() => UserEntity, (articles) => ArticleEntity)
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(article?: Partial<ArticleEntity>) {
    this.id = article?.id;
    this.title = article?.title;
    this.subtitle = article?.subtitle;
    this.material = article?.material;
    this.content = article?.content;
    this.user = article?.user;
    this.active = article?.active;
    this.createdAt = article?.createdAt;
    this.updatedAt = article?.updatedAt;
    this.deletedAt = article?.deletedAt;
  }
}
