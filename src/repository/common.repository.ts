import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions, ObjectLiteral } from 'typeorm';

@Injectable()
export class CommonRepository {
  constructor(private dataSource: DataSource) {}
  async paginate(
    repositoryName: string,
    page?: number,
    perPage?: number,
    findManyOptions?: FindManyOptions<ObjectLiteral>,
  ): Promise<{ data: any[]; totalCount: number }> {
    const options = findManyOptions || {};
    const repository = this.dataSource.getRepository(repositoryName);
    const skip = (page - 1) * perPage;
    options.skip = skip || 0;
    options.take = perPage || 20;
    const [data, totalCount] = await repository.findAndCount(findManyOptions);
    return { data, totalCount };
  }
}
