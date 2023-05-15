import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm';

export default abstract class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findOne(options?: FindOneOptions<T>): Promise<T | undefined> {
    return this.repository.findOne(options);
  }

  async find(options?: FindOneOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findById(
    id: number | string,
    options?: FindOneOptions<T> | any,
  ): Promise<T | undefined> {
    return this.repository.findOne({ where: { id }, ...(options || {}) });
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async update(
    id: number | string,
    entity: Partial<T>,
  ): Promise<T | undefined> {
    const existingEntity = await this.findById(id);
    if (!existingEntity) {
      return undefined;
    }

    const updatedEntity = { ...existingEntity, ...entity };
    await this.repository.save(updatedEntity);
    return updatedEntity;
  }

  async delete(id: number | string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
