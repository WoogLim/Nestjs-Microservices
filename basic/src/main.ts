import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    // 쿠키에 저장된 세션 데이터를 암호화하는 데 사용되는 키입니다.
    // 배열로 여러 키를 제공할 수 있으며, 이를 통해 키 회전을 구현할 수 있습니다.
    // 여기서는 'dsaf4382d1'이라는 문자열을 암호화 키로 사용합니다.
    keys: ['dsaf4382d1']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      /**
       * whitelist
       * dto에 작성되어 있는 요청 키-값만 허용합니다. 
       * 만일 그외 키-값이 Body에 포함된다면 해당 속성은 서버에서 무시합니다.
       */
    }),
  )
  await app.listen(3000);
}
bootstrap();
