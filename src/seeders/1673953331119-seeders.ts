import { User } from '../entity/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { Roles, userRoleId } from 'src/types/type';
import { UserRole } from '../entity/user_role.entity';
import * as bcryptjs from 'bcryptjs';
import { config } from 'dotenv';
config();
export class seeders1673953331119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role_one = new UserRole();
    role_one.type = Roles.SUPERADMIN;

    const role_two = new UserRole();
    role_two.type = Roles.ADMIN;

    const role_tree = new UserRole();
    role_tree.type = Roles.COMPANY_SUPER_ADMIN;

    const role_quad = new UserRole();
    role_quad.type = Roles.COMPANY_ADMIN;

    const role_penta = new UserRole();
    role_penta.type = Roles.COMPANY_DRIVER;

    const user = new User();

    user.name = process.env.SEEDER_USER_NAME;
    user.surname = process.env.SEEDER_USER_SURNAME;
    user.email = process.env.SEEDER_USER_EMAIL;
    user.address = '';
    user.password = await bcryptjs.hash(process.env.SEEDER_USER_PASSWORD, 10);
    user.phone_number = process.env.SEEDER_USER_PHONENUMBER;
    user.role_id = userRoleId.get(Roles.SUPERADMIN) as any;
    queryRunner.manager
      .save<UserRole>([role_one, role_two, role_tree, role_quad, role_penta])
      .then(async () => await queryRunner.manager.save<User>(user));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('Delete From users where id=1');
  }
}
