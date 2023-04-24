import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqContext, RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class RmqService {
    constructor (private readonly configService: ConfigService) {}

    getOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: ['amqps://cfuifrls:7tObqMvVSD9jH47jJWy-3sZOMwfwfcMN@jackal.rmq.cloudamqp.com/cfuifrls'],
                queue: this.configService.get<string>(`RABBITMQ_${queue}_QUEUE`),
                noAck,
                persistent: true
            }
        }
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef()
        const message = context.getMessage()
        channel.ack(message)
    }
}