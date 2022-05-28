import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '@src/auth/dto/auth-credential.dto';
import { User } from '@src/auth/entities/user.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // unique 설정된 칼럼이 중복되어 저장되려고 하는 경우
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
