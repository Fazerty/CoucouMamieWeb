import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { TagEntity } from '../tag/tag.entity';
import { ArticleEntity } from '../article/article.entity';
import { CommentEntity } from '../article/comment.entity';
import { ProfileEntity } from '../profile/profile.entity';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { Logger } from 'typeorm';
import { Migration1591968905409 } from 'src/migration/1591968905409-Migration';

require('dotenv').config();

class ConfigService {

  private SECRET: string;

  constructor(private env: { [k: string]: string | undefined }) {
    this.SECRET = this.getValue('SECRET');
  }

  public getSecret() {
    return this.SECRET;
  }

  /**
   *
   *
   * @private
   * @param {string} key
   * @param {boolean} [throwOnMissing=true]
   * @returns {string}
   * @memberof ConfigService
   */
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  /**
   *
   *
   * @param {string[]} keys
   * @returns
   * @memberof ConfigService
   */
  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  /**
   *
   *
   * @returns
   * @memberof ConfigService
   */
  public getPort() {
    return this.getValue('PORT', true);
  }

  /**
   *
   *
   * @returns
   * @memberof ConfigService
   */
  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  /**
   *
   *
   * @returns {TypeOrmModuleOptions}
   * @memberof ConfigService
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [UserEntity, TagEntity, ArticleEntity, ProfileEntity, CommentEntity],
      migrationsTableName: 'migration',
      synchronize: false,
      migrationsRun: true,
      logging: 'error' as LoggerOptions,
      logger: 'simple-console' as 'advanced-console' | 'simple-console' | 'file' | 'debug' | Logger,
      migrations: [Migration1591968905409],
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: this.isProduction(),
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ]);

export { configService };
