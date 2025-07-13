import { TrailEntity } from '../../trail/entity/trail.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'topics' })
export class TopicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  scientific: boolean;

  @OneToMany(() => TrailEntity, (topic) => TopicEntity)
  trails: TrailEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(topic?: Partial<TopicEntity>) {
    this.id = topic?.id;
    this.name = topic?.name;
    this.scientific = topic?.scientific;
    this.trails = topic?.trails;
    this.createdAt = topic?.createdAt;
    this.updatedAt = topic?.updatedAt;
    this.deletedAt = topic?.deletedAt;
  }
}
