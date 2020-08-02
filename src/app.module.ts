import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
// import { ProfileResolver } from './profile/profile.resolver';
import { TagModule } from './tag/tag.module';
import { GraphQLModule } from '@nestjs/graphql';
import { WinstonModule, utilities as nestWinstonModuleUtilities, } from 'nest-winston';
import winston, {format, transports} from 'winston';

const loggerOptions: winston.LoggerOptions = {
  //levels?: Config.AbstractConfigSetLevels;
  silent: false,
  // format?: logform.Format;
  // level?: string;
  // exitOnError?: Function | boolean;
  // defaultMeta?: any;
  // transports?: Transport[] | Transport;

  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('Coucou back'),
      ),
    }),
    // other transports...
  ],
  // other options

  // handleExceptions?: boolean;
  // exceptionHandlers?: any;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debugPlugin = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext: any) {
    console.log('Request started! Query:\n' +
      requestContext.request.query);

    return {

      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      parsingDidStart(_requestContext: any) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validationDidStart(_requestContext: any) {
        console.log('Validation started!');
      },

      didEncounterErrors(
        requestContext: any,
      ) {
        console.log('errrrooooor!');
        console.log(requestContext);
      }
    }
  },
};

@Module({
  imports: [
    WinstonModule.forRoot(
      // options
      loggerOptions
    ),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      plugins: [debugPlugin],

      autoSchemaFile: true, // path.join(process.cwd(), 'src/gql/schema.gql'),
    }
    ),
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }


