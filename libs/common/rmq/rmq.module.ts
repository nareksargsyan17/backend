import { DynamicModule, Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

interface RmqModuleOptions {
    name: string
}

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule {
    static register({ name }: RmqModuleOptions):DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: ['amqp://guest:guest@localhost:5672'],
                                queue: configService.get<string>(`RABBITMQ_${name}_QUEUE`),
                                queueOptions : {
                                    durable : false
                                }
                            },
                        }),
                        inject: [ConfigService]
                    },
                ])
            ],
            exports: [ClientsModule]
        }
    }
}