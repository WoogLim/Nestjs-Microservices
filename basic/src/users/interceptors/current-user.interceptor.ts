import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from '@nestjs/common'
import { UsersService } from '../users.service'
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  // UsersService를 주입받아 사용하기 위해 생성자를 통해 주입합니다.
  constructor(private uesrsService: UsersService) {}

  // 인터셉터는 요청이 컨트롤러로 전달되기 전에 실행됩니다.
  async intercept(context: ExecutionContext, handler: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.uesrsService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}