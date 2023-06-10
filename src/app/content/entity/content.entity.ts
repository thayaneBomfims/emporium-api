import { ArticleEntity } from "../../article/entity/article.entity";
import { TrailEntity } from "../../trail/entity/trail.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'contents' })
export class ContentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => TrailEntity, contents => ContentEntity)
    trail: TrailEntity

    @OneToMany(() => ArticleEntity, content => ContentEntity)
    articles: ArticleEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}