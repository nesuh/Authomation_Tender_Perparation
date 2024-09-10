import { Module } from '@nestjs/common';
// import { OneModule } from './One_Tender/one.module';

import { allprModule } from './PrPreparation/allpr/allpr.module';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';


@Module({
  imports: [
  allprModule,
  // OneModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
