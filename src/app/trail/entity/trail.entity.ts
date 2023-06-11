import { TopicEntity } from "../../topic/entity/topic.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContentEntity } from "../../content/entity/content.entity";
import { UserEntity } from "../../user/entity/user.entity";

@Entity({ name: 'trails' })
export class TrailEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => TopicEntity, trails => TrailEntity)
    topic: TopicEntity

    @OneToMany(() => ContentEntity, trail => TrailEntity)
    contents: ContentEntity[];

    @ManyToOne(() => UserEntity, trails => TrailEntity)
    user: UserEntity

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}