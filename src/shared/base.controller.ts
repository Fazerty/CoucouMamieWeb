import * as jwt from 'jsonwebtoken';
import { configService } from 'src/config/config.service';

export class BaseController {

  constructor() {
    //
  }

  protected getUserIdFromToken(authorization: string): string | number {
    if (!authorization) return null;

    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, configService.getSecret());
    return decoded.id;
  }
}