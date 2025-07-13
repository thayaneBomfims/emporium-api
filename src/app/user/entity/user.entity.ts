import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ArticleEntity } from '../../article/entity/article.entity';
import { TopicEntity } from '../../topic/entity/topic.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RegExHelper } from '../../../helpers/regex.helper';
import { MessagesHelper } from '../../../helpers/messages.helper';
import { ContentEntity } from '../../content/entity/content.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  public_name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;

  @IsUrl()
  @Column({ nullable: true })
  @IsOptional()
  instagram: string;

  @IsUrl()
  @Column({ nullable: true })
  @IsOptional()
  facebook: string;

  @Column()
  @IsUrl()
  telegram: string;

  @Column({ default: false })
  active: boolean;

  @Column({ default: false })
  admin: boolean;

  @Column()
  description: string;

  @ManyToMany(() => TopicEntity)
  @JoinTable()
  topics: TopicEntity[];

  @OneToMany(() => ArticleEntity, (user) => UserEntity)
  articles: ArticleEntity[];

  @OneToMany(() => ContentEntity, (user) => UserEntity)
  contents: ContentEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(user?: Partial<UserEntity>) {
    this.id = user?.id;
    this.name = user?.name;
    this.public_name = user?.public_name;
    this.email = user?.email;
    this.password = user?.password;
    this.instagram = user?.instagram;
    this.facebook = user?.facebook;
    this.telegram = user?.telegram;
    this.active = user?.active;
    this.admin = user?.admin;
    this.description = user?.description;
    this.topics = user?.topics;
    this.articles = user?.articles;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
    this.deletedAt = user?.deletedAt;
  }
}
