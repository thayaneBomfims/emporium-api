
import { IsEmail, IsFQDN, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";
import { ArticleEntity } from "src/app/article/entity/article.entity";
import { TopicEntity } from "src/app/topic/entity/topic.entity";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RegExHelper } from '../../../helpers/regex.helper'
import { MessagesHelper } from "src/helpers/messages.helper";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
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

    @Column()
    @IsUrl()
    instagram: string;

    @Column()
    @IsUrl()
    facebook: string;

    @Column()
    @IsUrl()
    telegram: string;

    @Column({ default: false })
    active: boolean;

    @ManyToMany(() => TopicEntity)
    @JoinTable()
    topics: TopicEntity[]

    @OneToMany(() => ArticleEntity, user => UserEntity)
    articles: ArticleEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 18);
    }
}