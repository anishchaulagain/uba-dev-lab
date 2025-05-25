import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Role, RoleType } from '../entities/Role';
import { hashPassword } from '../../utils/auth.utils';

export const seedAdminUser = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);
  
  // Check if admin user already exists
  const existingAdmin = await userRepository
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.roles', 'role')
    .where('role.name = :roleName', { roleName: RoleType.ADMIN })
    .getOne();
  
  if (existingAdmin) {
    console.log('Admin user already exists, skipping...');
    return;
  }

  // Find the admin role
  const adminRole = await roleRepository.findOne({ where: { name: RoleType.ADMIN } });
  
  if (!adminRole) {
    console.error('Admin role not found. Please run the role seeder first.');
    return;
  }
const plainPassword = process.env.ADMIN_PASSWORD;
if (!plainPassword) {
  throw new Error('Missing ADMIN_PASSWORD in environment variables');
}
  // Create default admin user
  const adminUser = userRepository.create({
    firstName: 'Anish',
    lastName: 'Chaulagain',
    email: 'anishadmin@example.com',
    password: await hashPassword(plainPassword), 
    roles: [adminRole]
  });

  await userRepository.save(adminUser);
  console.log('Admin user seeded successfully');
};