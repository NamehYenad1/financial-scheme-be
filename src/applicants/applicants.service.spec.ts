import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantsService } from './applicants.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Applicant } from './entities/applicant.entity';
import { Repository } from 'typeorm';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { EmploymentStatus, MaritalStatus } from './applicant-status.enum';

describe('ApplicantsService', () => {
  let service: ApplicantsService;
  let mockRepository: Partial<Record<keyof Repository<Applicant>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantsService,
        {
          provide: getRepositoryToken(Applicant),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ApplicantsService>(ApplicantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of applicants', async () => {
      mockRepository.find.mockResolvedValue([]);
      expect(await service.findAll()).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['householdMembers'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single applicant', async () => {
      const applicantId = 'some-id';
      mockRepository.findOne.mockResolvedValue(new Applicant());
      expect(await service.findOne(applicantId)).toBeDefined();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: applicantId },
        relations: ['householdMembers'],
      });
    });
  });

  describe('create', () => {
    it('should create a new applicant', async () => {
      const createApplicantDto: CreateApplicantDto = {
        name: 'John Doe',
        employmentStatus: EmploymentStatus.Employed,
        maritalStatus: MaritalStatus.Single,
        sex: 'male',
        dateOfBirth: new Date('1990-01-01'),
      };
      mockRepository.create.mockReturnValue(new Applicant());
      mockRepository.save.mockResolvedValue(new Applicant());
      await service.create(createApplicantDto);
      expect(mockRepository.create).toHaveBeenCalledWith(createApplicantDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing applicant', async () => {
      const applicantId = 'some-id';
      const updateApplicantDto: UpdateApplicantDto = {
        name: 'Jane Doe',
        employmentStatus: EmploymentStatus.Unemployed,
        maritalStatus: MaritalStatus.Married,
        sex: 'female',
        dateOfBirth: new Date('1985-05-15'),
      };
      mockRepository.preload.mockResolvedValue(new Applicant());
      mockRepository.save.mockResolvedValue(new Applicant());
      await service.update(applicantId, updateApplicantDto);
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id: applicantId,
        ...updateApplicantDto,
      });
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove an applicant', async () => {
      const applicantId = 'some-id';
      const applicant = new Applicant();
      mockRepository.findOne.mockResolvedValue(applicant);

      await service.remove(applicantId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: applicantId },
        relations: ['householdMembers'],
      });
      expect(mockRepository.remove).toHaveBeenCalledWith(applicant);
    });
  });
});
