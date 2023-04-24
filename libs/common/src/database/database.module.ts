import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "apps/film/src/country/entity/Country";
import { Film } from "apps/film/src/entity/Film";
import { Genre } from "apps/film/src/genre/entity/Genre";
import { Person } from "apps/person/src/entity/Person";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal : true,
            envFilePath : "../../../../.env"
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 3008,
            username: 'postgres',
            password: "170801nsrm",
            database: "backend",
            entities : [Film, Genre, Country, Person],
            synchronize: true,
            logging: false,
            autoLoadEntities: true,
            migrations: [],
            subscribers: [],
          }),
    ],
    exports : [DatabaseModule, TypeOrmModule]
  })

  export class DatabaseModule{}