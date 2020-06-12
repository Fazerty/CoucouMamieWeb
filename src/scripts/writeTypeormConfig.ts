import { configService } from '../config/config.service';
import fs = require('fs');

const typeormConfig = { ...configService.getTypeOrmConfig() };

// TODO: find a better way.
typeormConfig.entities = ["./src/user/user.entity.ts", "./src/article/article.entity.ts", "./src/article/comment.entity.ts", "./src/profile/profile.entity.ts", "./src/tag/tag.entity.ts",]
typeormConfig.migrations = ["./src/migration/*.ts"]

fs.writeFileSync('ormconfig.json',
  JSON.stringify(typeormConfig, null, 2)
);