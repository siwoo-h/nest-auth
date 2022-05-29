import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@src/auth/auth.module';
import { typeORMConfig } from '@src/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule],
})
export class AppModule {}
