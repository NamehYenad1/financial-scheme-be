import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserRole } from '../users/user-role.enum';

dotenv.config(); // Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
});

export const seedUsers = async () => {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);

  // Check if admin user already exists
  const existingAdmin = await userRepository.findOneBy({ username: 'admin' });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password1', salt);

    const adminUser = userRepository.create({
      username: 'admin',
      password: hashedPassword,
      role: UserRole.Admin, // Assigning Admin role
    });

    await userRepository.save(adminUser);
    console.log('Admin user seeded!');
  } else {
    console.log('Admin user already exists.');
  }

  // Check if normal user already exists
  const existingUser = await userRepository.findOneBy({ username: 'user' });
  if (!existingUser) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password2', salt);

    const normalUser = userRepository.create({
      username: 'user',
      password: hashedPassword,
      role: UserRole.User, // Assigning User role
    });

    await userRepository.save(normalUser);
    console.log('Normal user seeded!');
  } else {
    console.log('Normal user already exists.');
  }

  await AppDataSource.destroy(); // Close the connection after seeding
};

// Run the seeding function
seedUsers().catch((error) => console.log('Seeding failed:', error));
