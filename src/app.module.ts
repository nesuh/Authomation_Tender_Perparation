import { Module } from '@nestjs/common';
import { allprModule } from './PrPreparation/allpr/allpr.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { FakeModule } from './PrPreparation/pidentification/fake.module';


@Module({
  imports: [
  allprModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
