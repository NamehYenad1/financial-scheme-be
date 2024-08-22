import { DataSource } from 'typeorm';
import { Scheme } from '../schemes/entities/scheme.entity';
import { Benefit } from '../schemes/entities/benefit.entity';
import { Application } from '../../src/applications/entities/application.entity';
import { Applicant } from '../../src/applicants/entities/applicant.entity';
import { HouseholdMember } from '../../src/applicants/entities/household-member.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Scheme, Benefit, Application, Applicant, HouseholdMember],
  synchronize: true,
});

export const seedSchemes = async () => {
  try {
    const schemeRepository = AppDataSource.getRepository(Scheme);
    const benefitRepository = AppDataSource.getRepository(Benefit);

    const schemes = [
      {
        name: 'Retrenchment Assistance Scheme',
        criteria: {
          employment_status: 'unemployed',
        },
        benefits: [
          {
            name: 'SkillsFuture Credits',
            amount: 500.0,
          },
        ],
      },
      {
        name: 'Family Assistance Scheme',
        criteria: {
          employment_status: 'unemployed',
          has_children: {
            school_level: 'primary',
          },
        },
        benefits: [
          {
            name: 'School Meal Vouchers',
            amount: 200.0,
          },
          {
            name: 'CDC Vouchers',
            amount: 100.0,
          },
        ],
      },
    ];

    for (const schemeData of schemes) {
      const benefits = schemeData.benefits.map((benefit) =>
        benefitRepository.create(benefit),
      );
      const scheme = schemeRepository.create({
        name: schemeData.name,
        criteria: schemeData.criteria,
        benefits,
      });
      await schemeRepository.save(scheme);
    }

    console.log('Schemes and benefits have been seeded successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

seedSchemes().catch((error) => console.log('Seeding failed:', error));
