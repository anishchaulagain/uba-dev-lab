import { internshipRepo } from '../../repositories/internship.repository';
import { userRepo } from '../../repositories/user.repository';
import * as internshipService from '../../services/internship.service';
import { Internship } from '../../database/entities/Internship';

jest.mock('../../repositories/internship.repository');
jest.mock('../../repositories/user.repository');

describe('Internship Service', () => {
  const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', createdAt: new Date(), internships: [] };
  const mockInternship: Partial<Internship> = {
    id: 1,
    joinedDate: new Date('2024-01-01'),
    completionDate: null,
    isCertified: false,
    mentorName: 'Jane Smith',
    user: mockUser,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createInternshipService', () => {
    it('should create and save an internship', async () => {
      (userRepo.findOneByOrFail as jest.Mock).mockResolvedValue(mockUser);
      (internshipRepo.create as jest.Mock).mockReturnValue(mockInternship);
      (internshipRepo.save as jest.Mock).mockResolvedValue(mockInternship);

      const data = {
        joinedDate: new Date('2024-01-01'),
        completionDate: null,
        isCertified: false,
        mentorName: 'Jane Smith',
        userId: 1,
      };

      const result = await internshipService.createInternshipService(data);

      expect(userRepo.findOneByOrFail).toHaveBeenCalledWith({ id: data.userId });
      expect(internshipRepo.create).toHaveBeenCalledWith({ ...data, user: mockUser });
      expect(internshipRepo.save).toHaveBeenCalledWith(mockInternship);
      expect(result).toEqual(mockInternship);
    });

    it('should throw if userRepo.findOneByOrFail throws', async () => {
      const error = new Error('User not found');
      (userRepo.findOneByOrFail as jest.Mock).mockRejectedValue(error);

      await expect(
        internshipService.createInternshipService({
          joinedDate: new Date(),
          completionDate: null,
          isCertified: false,
          mentorName: 'Mentor',
          userId: 999,
        })
      ).rejects.toThrow('User not found');
    });
  });

  describe('updateInternshipService', () => {
    it('should update and save the internship', async () => {
      const existingInternship = { ...mockInternship };
      (internshipRepo.findOne as jest.Mock).mockResolvedValue(existingInternship);
      (internshipRepo.merge as jest.Mock).mockImplementation((entity, data) => Object.assign(entity, data));
      (internshipRepo.save as jest.Mock).mockResolvedValue(existingInternship);

      const updatedData = {
        isCertified: true,
        mentorName: 'Updated Mentor',
      };

      const result = await internshipService.updateInternshipService(1, updatedData);

      expect(internshipRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['user'] });
      expect(internshipRepo.merge).toHaveBeenCalledWith(existingInternship, updatedData);
      expect(internshipRepo.save).toHaveBeenCalledWith(existingInternship);
      expect(result).toEqual(existingInternship);
      expect(result.isCertified).toBe(true);
      expect(result.mentorName).toBe('Updated Mentor');
    });

    it('should throw error if internship not found', async () => {
      (internshipRepo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(internshipService.updateInternshipService(999, {})).rejects.toThrow('Internship not found');
    });
  });

  describe('deleteInternshipService', () => {
    it('should delete the internship if found', async () => {
      (internshipRepo.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      await expect(internshipService.deleteInternshipService(1)).resolves.toBeUndefined();

      expect(internshipRepo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error if internship not found', async () => {
      (internshipRepo.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      await expect(internshipService.deleteInternshipService(999)).rejects.toThrow('Internship not found');
    });
  });
});
