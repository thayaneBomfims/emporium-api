
import { IsEmail, IsFQDN, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ArticleEntity } from "src/app/article/entity/article.entity";
import { TopicEntity } from "src/app/topic/entity/topic.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Senha muito fraca' })
    password: string;

    @Column()
    @IsFQDN()
    instagram: string;

    @Column()
    @IsFQDN()
    facebook: string;

    @Column()
    @IsFQDN()
    telegram: string;

    @Column()
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
}