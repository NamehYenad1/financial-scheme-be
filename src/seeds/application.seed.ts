import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Applicant } from '../applicants/entities/applicant.entity';
import { HouseholdMember } from '../applicants/entities/household-member.entity';
import { Application } from '../applications/entities/application.entity';
import {
  EmploymentStatus,
  MaritalStatus,
} from '../applicants/applicant-status.enum';
import { Scheme } from '../schemes/entities/scheme.entity';
import { Benefit } from '../../src/schemes/entities/benefit.entity';

dotenv.config(); // Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Applicant, HouseholdMember, Application, Scheme, Benefit],
  synchronize: true,
});

export const seedData = async () => {
  await AppDataSource.initialize();
  const applicantRepository = AppDataSource.getRepository(Applicant);
  const householdMemberRepository =
    AppDataSource.getRepository(HouseholdMember);
  const schemeRepository = AppDataSource.getRepository(Scheme);
  const applicationRepository = AppDataSource.getRepository(Application);

  const schemes = await schemeRepository.find(); // Fetch all available schemes

  for (let i = 1; i <= 100; i++) {
    const employmentStatus =
      i % 2 === 0 ? EmploymentStatus.Employed : EmploymentStatus.Unemployed;

    const maritalStatus = (() => {
      switch (i % 4) {
        case 0:
          return MaritalStatus.Single;
        case 1:
          return MaritalStatus.Married;
        case 2:
          return MaritalStatus.Widowed;
        case 3:
          return MaritalStatus.Divorced;
      }
    })();

    // Create and save HouseholdMembers
    const householdMembers: HouseholdMember[] = [];

    if (maritalStatus === MaritalStatus.Married) {
      const spouse = householdMemberRepository.create({
        name: `Spouse ${i}`,
        relationship: 'spouse',
        dateOfBirth: new Date(`1980-01-${(i % 28) + 1}`),
      });
      await householdMemberRepository.save(spouse);
      householdMembers.push(spouse);

      if (i % 3 !== 0) {
        const child1 = householdMemberRepository.create({
          name: `Child ${i}-1`,
          relationship: 'child',
          dateOfBirth: new Date(`2010-01-${(i % 28) + 1}`),
        });
        await householdMemberRepository.save(child1);
        householdMembers.push(child1);
      }

      if (i % 4 === 0) {
        const child2 = householdMemberRepository.create({
          name: `Child ${i}-2`,
          relationship: 'child',
          dateOfBirth: new Date(`2015-01-${(i % 28) + 1}`),
        });
        await householdMemberRepository.save(child2);
        householdMembers.push(child2);
      }
    } else if (i % 5 !== 0) {
      const child = householdMemberRepository.create({
        name: `Child ${i}-1`,
        relationship: 'child',
        dateOfBirth: new Date(`2012-01-${(i % 28) + 1}`),
      });
      await householdMemberRepository.save(child);
      householdMembers.push(child);
    }

    // Create and save Applicant with household members
    const applicant = applicantRepository.create({
      name: `Applicant ${i}`,
      employmentStatus: employmentStatus,
      maritalStatus: maritalStatus,
      householdMembers,
      sex: i % 2 === 0 ? 'male' : 'female',
      dateOfBirth: new Date(`1990-01-${(i % 28) + 1}`),
    });
    await applicantRepository.save(applicant);

    // Create and save Applications for the applicant
    for (const scheme of schemes) {
      // Determine if the applicant is eligible for the scheme
      const isEligible = checkEligibility(applicant, scheme.criteria);

      if (isEligible) {
        const application = applicationRepository.create({
          applicant: applicant,
          scheme: scheme,
          status: 'Pending',
          applicationDate: new Date(),
        });
        await applicationRepository.save(application);
      }
    }
  }

  console.log(
    'Data seeded with 100 applicants, their household members, and applications!',
  );

  await AppDataSource.destroy(); // Close the connection after seeding
};

// Function to check eligibility based on the scheme's criteria
function checkEligibility(applicant: Applicant, criteria: any): boolean {
  if (
    criteria.employment_status &&
    criteria.employment_status !== applicant.employmentStatus
  ) {
    return false;
  }

  if (criteria.has_children && criteria.has_children.school_level) {
    const hasSchoolChild = applicant.householdMembers.some(
      (member) =>
        member.relationship === 'child' &&
        new Date().getFullYear() - member.dateOfBirth.getFullYear() >= 6, // Assuming primary school starts at age 6
    );
    if (!hasSchoolChild) {
      return false;
    }
  }

  return true;
}

// Run the seeding function
seedData().catch((error) => console.log('Seeding failed:', error));
