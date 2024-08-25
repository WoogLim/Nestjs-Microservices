import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

// _scrypt는 콜백 기반의 함수이므로, promisify를 사용하여 Promise 기반으로 변환합니다.
// 이를 통해 async/await 문법을 사용해 비동기적으로 처리할 수 있게 됩니다.
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * @desc 회원가입
   */ 
  async signup(email: string, password: string) {
    // 이메일이 존재하는지 검증
    const users = await this.usersService.find(email);

    if(users.length) {
      throw new BadRequestException('email is use');
    }

    // 비밀번호 암호화

    // 8바이트 크기의 무작위 데이터를 생성하고 이를 16진수 문자열로 변환합니다. 문자열은 16자 생성
    const salt = randomBytes(8).toString('hex');

    // 평문과 salt 문자열을 섞은 32바이트 생성
    // typescript의 경우 scrypt의 반환 타입은 unknown으로 인식하기 때문에 Buffer 타입으로 명시
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 32바이트를 16진수로 변환하고 salt.해시 문자열 변환
    const result = salt + '.' + hash.toString('hex');

    // 유저 레코드 저장
    const user = await this.usersService.create(email, result);

    // 생성된 유저 데이터 반환
    return user;
  }

  async signin(email: string, password: string) {
    // 인증
    const [user] = await this.usersService.find(email);

    if(!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = await (scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')){
      throw new BadRequestException('bad password');
    }
    
    return user;
  }
}