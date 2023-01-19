import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/seeders/*{.js,.ts}'],
  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
