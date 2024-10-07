import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ConfigService } from '@nestjs/config';

export const databaseConfig = async (configService: ConfigService): Promise<PostgresConnectionOptions> => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT')),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false,
});