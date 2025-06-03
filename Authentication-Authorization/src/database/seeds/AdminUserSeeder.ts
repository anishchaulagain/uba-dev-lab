import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Role, RoleType } from '../entities/Role';
import { hashPassword } from '../../utils/auth.utils';
import { userRepo } from '../../repositories/user.repository';
import { roleRepo } from '../../repositories/role.repository';

export const seedAdminUser = async (dataSource: DataSource): Promise<void> => {
 
  
  // Check if admin user already exists
  const existingAdmin = await userRepo
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.roles', 'role')
    .where('role.name = :roleName', { roleName: RoleType.ADMIN })
    .getOne();
  
  if (existingAdmin) {
    console.log('Admin user already exists, skipping...');
    return;
  }

  // Find the admin role
  const adminRole = await roleRepo.findOne({ where: { name: RoleType.ADMIN } });
  
  if (!adminRole) {
    console.error('Admin role not found. Please run the role seeder first.');
    return;
  }
const plainPassword = process.env.ADMIN_PASSWORD;
if (!plainPassword) {
  throw new Error('Missing ADMIN_PASSWORD in environment variables');
}

const email = process.env.EMAIL
  // Create default admin user
  const adminUser = userRepo.create({
    firstName: 'Anish',
    lastName: 'Chaulagain',
    email: email,
    password: await hashPassword(plainPassword), 
    roles: [adminRole]
  });

  await userRepo.save(adminUser);
  console.log('Admin user seeded successfully');
};