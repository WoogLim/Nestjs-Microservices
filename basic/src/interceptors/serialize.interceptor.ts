import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
  // 모든 클래스
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor{

  constructor(private dto: any) {}

  // NestInterceptor 인터페이스를 구현합니다.
  intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {

    return handler.handle().pipe(
      map((data: any) => {
        // user 인스턴스를 UserDto 인스턴스로 변환하고 Json 객체로 직렬화 합니다.
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        })
      })
    )
  }
}