import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    // User 엔티티에 대한 Repository를 주입받아서 repo 변수에 할당하는 생성자 함수입니다.
  }

  create(email: string, password: string) {
    // user 인스턴스를 새로 생성합니다. 만일 user.entity 안에 IsString 등 유효성 메타데이터가 있다면
    // 인스턴스 생성시 유효성 검사를 수행합니다.
    const user = this.repo.create({email, password})

    // user 인스턴스를 저장합니다.
    return this.repo.save(user);

    // 인스턴스를 사용하지 않고 Dto 자체를 저장할 수도 있습니다.
    // return this.repo.save({...user});
  }

  findOne(id: number) {

    if(!id) {
      return null;
    }

    return this.repo.findOne({
      where: {id}
    })
  }

  find(email: string) {
    return this.repo.find({
      where: {email}
    })
  }

  async update(id: number, attrs: Partial<User>) {
    // Partial<User>은 해당 클래스의 필드 무엇이든 받을 수 있는 인자이다. 해당 클래스에 존재하지 않는 필드를 인자로 넘길 경우 에러 발생
  
    // 유저 인스턴스를 가져옵니다.
    const user = await this.findOne(id);
    
    if(!user) {
      throw new NotFoundException();
    }

    // user 인스턴스에 변경된 부분만을 붙여넣어 재정의합니다.
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if(!user) {
      throw new NotFoundException();
    }

    return this.repo.remove(user);
  }
}

// const usersSrevice = new UsersService({} as any);

// usersSrevice.update(1, {email: ''});