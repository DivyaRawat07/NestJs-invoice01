import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerModel } from './customer/customer.model';
import { InvoiceModel } from './invoice/invoice.model';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), TypeOrmModule.forFeature([CustomerModel, InvoiceModel,User]),
    InvoiceModule,
    UsersModule,
    AuthModule,
    CustomerModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),


  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
