import { Module, ModuleMetadata } from '@nestjs/common';

const metadata: ModuleMetadata = {
  imports: [],
  providers: [],
  controllers: [],
};

@Module(metadata)
export class InfraestructureModule {}
