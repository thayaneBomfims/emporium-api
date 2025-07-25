import { IsNotEmpty } from 'class-validator';
import { ContentEntity } from '../../content/entity/content.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateArticleDto {
  /**
   * Article short title
   * @example Quem foi Nicolas Tesla?
   */
  @IsNotEmpty()
  title: string;

  /**
   * Article long subtitle
   * @example Vida e obra detalhadas
   */
  subtitle: string;

  /**
   * Link in aws bucket of the material
   * @example https://bucket.s3.amazonaws.com/article.json
   */
  material: string;

  /**
   * Content id
   * @example 117b820b-02ed-4aee-be11-0db7b2c01b51
   */
  @IsNotEmpty()
  content: ContentEntity;

  /**
   * User id
   * @example 117b820b-02ed-4aee-be11-0db7b2c01b51
   */
  user: UserEntity;
}

export class UpdateArticleDto {
  /**
   * Article short title
   * @example Quem foi Nicolas Tesla?
   */
  title: string;

  /**
   * Article long subtitle
   * @example Vida e obra detalhadas
   */
  subtitle: string;

  /**
   * Link in aws bucket of the material
   * @example https://bucket.s3.amazonaws.com/article.json
   */
  material: string;

  /**
   * User active
   * @example true
   */
  active?: boolean
}
