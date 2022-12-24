import { ContentEntity } from "src/app/content/entity/content.entity";
import { TrailEntity } from "src/app/trail/entity/trail.entity";
import { UserEntity } from "src/app/user/entity/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'articles' })
export class ArticleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column("text")
    material: string;

    @ManyToOne(() => ContentEntity, articles => ArticleEntity)
    content: ContentEntity

    @ManyToOne(() => UserEntity, articles => ArticleEntity)
    user: UserEntity

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}