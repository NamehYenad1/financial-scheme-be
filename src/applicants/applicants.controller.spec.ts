import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant } from './entities/applicant.entity';

describe('ApplicantsController', () => {
  let controller: ApplicantsController;
  let mockApplicantsService: Partial<
    Record<keyof ApplicantsService, jest.Mock>
  >;

  beforeEach(async () => {
    mockApplicantsService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantsController],
      providers: [
        {
          provide: ApplicantsService,
          useValue: mockApplicantsService,
        },
      ],
    }).compile();

    controller = module.get<ApplicantsController>(ApplicantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of applicants', async () => {
      const result: Applicant[] = [];
      mockApplicantsService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single applicant', async () => {
      const result = new Applicant();
      const id = 'some-id';
      mockApplicantsService.findOne.mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
      expect(mockApplicantsService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create a new applicant', async () => {
      const dto = new CreateApplicantDto();
      const result = new Applicant();
      mockApplicantsService.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toBe(result);
      expect(mockApplicantsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update an applicant', async () => {
      const dto = new UpdateApplicantDto();
      const result = new Applicant();
      const id = 'some-id';
      mockApplicantsService.update.mockResolvedValue(result);
      expect(await controller.update(id, dto)).toBe(result);
      expect(mockApplicantsService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove an applicant', async () => {
      const id = 'some-id';
      mockApplicantsService.remove.mockResolvedValue(undefined);

      await controller.remove(id);

      expect(mockApplicantsService.remove).toHaveBeenCalledWith(id);

      expect(mockApplicantsService.findOne).not.toHaveBeenCalled();
    });
  });
});
