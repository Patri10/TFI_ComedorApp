/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import type { PurchaseRepository } from '../domain/contract/purchase.respository';
import type { PurchaseDetailsRepository } from '../domain/contract/purchase_details.repository';
import Purchase from '../domain/model/purchase';
import PurchaseDetail from '../domain/model/purchase_details';
import UpdatePurchaseCommandDto from './dto/UpdatePurchaseCommand.dto';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let purchaseRepository: jest.Mocked<PurchaseRepository>;
  let purchaseDetailsRepository: jest.Mocked<PurchaseDetailsRepository>;

  beforeEach(async () => {
    const mockPurchaseRepository: jest.Mocked<PurchaseRepository> = {
      createPurchase: jest.fn(),
      findAllPurchases: jest.fn(),
      updatePurchase: jest.fn(),
      deletePurchase: jest.fn(),
    };

    const mockPurchaseDetailsRepository: jest.Mocked<PurchaseDetailsRepository> =
      {
        createPurchaseDetail: jest.fn(),
        findPurchaseDetailById: jest.fn(),
        findAllPurchaseDetails: jest.fn(),
        updatePurchaseDetail: jest.fn(),
        deletePurchaseDetail: jest.fn(),
      };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        {
          provide: 'PurchaseRepository',
          useValue: mockPurchaseRepository,
        },
        {
          provide: 'PurchaseDetailsRepository',
          useValue: mockPurchaseDetailsRepository,
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    purchaseRepository = module.get('PurchaseRepository');
    purchaseDetailsRepository = module.get('PurchaseDetailsRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPurchase', () => {
    it('should create a purchase', async () => {
      const purchaseDetails: PurchaseDetail[] = [
        new PurchaseDetail('purchase-1', 'food-1', 10, 5.5),
      ];
      const mockPurchase = new Purchase(
        'supplier-1',
        'fund-1',
        new Date(),
        55,
        'INV-001',
        purchaseDetails,
        'purchase-1',
      );

      purchaseRepository.createPurchase.mockResolvedValue(mockPurchase);

      const result = await service.createPurchase(
        'supplier-1',
        'fund-1',
        55,
        'INV-001',
        purchaseDetails,
      );

      expect(result).toBe(mockPurchase);
      expect(purchaseRepository.createPurchase).toHaveBeenCalledWith(
        expect.objectContaining({
          getSupplierId: expect.any(Function),
          getFundId: expect.any(Function),
          getTotalAmount: expect.any(Function),
          getInvoiceNumber: expect.any(Function),
        }),
      );
    });
  });

  describe('findAllPurchases', () => {
    it('should return all purchases', async () => {
      const mockPurchases = [
        new Purchase(
          'supplier-1',
          'fund-1',
          new Date(),
          55,
          'INV-001',
          [],
          'purchase-1',
        ),
      ];

      purchaseRepository.findAllPurchases.mockResolvedValue(mockPurchases);

      const result = await service.findAllPurchases();

      expect(result).toBe(mockPurchases);
      expect(purchaseRepository.findAllPurchases).toHaveBeenCalled();
    });
  });

  describe('updatePurchase', () => {
    it('should update a purchase', async () => {
      const updateDto = new UpdatePurchaseCommandDto(
        'purchase-1',
        'supplier-1',
        'fund-1',
        new Date(),
        100,
        'INV-002',
      );
      const mockUpdatedPurchase = new Purchase(
        'supplier-1',
        'fund-1',
        new Date(),
        100,
        'INV-002',
        [],
        'purchase-1',
      );

      purchaseRepository.updatePurchase.mockResolvedValue(mockUpdatedPurchase);

      const result = await service.updatePurchase(updateDto);

      expect(result).toBe(mockUpdatedPurchase);
      expect(purchaseRepository.updatePurchase).toHaveBeenCalledWith(updateDto);
    });
  });

  describe('deletePurchase', () => {
    it('should delete a purchase', async () => {
      purchaseRepository.deletePurchase.mockResolvedValue(undefined);

      await service.deletePurchase('purchase-1');

      expect(purchaseRepository.deletePurchase).toHaveBeenCalledWith(
        'purchase-1',
      );
    });
  });

  describe('createPurchaseDetail', () => {
    it('should create a purchase detail', async () => {
      const mockDetail = new PurchaseDetail(
        'purchase-1',
        'food-1',
        10,
        5.5,
        'detail-1',
      );

      purchaseDetailsRepository.createPurchaseDetail.mockResolvedValue(
        mockDetail,
      );

      const result = await service.createPurchaseDetail(mockDetail);

      expect(result).toBe(mockDetail);
      expect(
        purchaseDetailsRepository.createPurchaseDetail,
      ).toHaveBeenCalledWith(mockDetail);
    });
  });

  describe('findPurchaseDetailById', () => {
    it('should find a purchase detail by id', async () => {
      const mockDetail = new PurchaseDetail(
        'purchase-1',
        'food-1',
        10,
        5.5,
        'detail-1',
      );

      purchaseDetailsRepository.findPurchaseDetailById.mockResolvedValue(
        mockDetail,
      );

      const result = await service.findPurchaseDetailById('detail-1');

      expect(result).toBe(mockDetail);
      expect(
        purchaseDetailsRepository.findPurchaseDetailById,
      ).toHaveBeenCalledWith('detail-1');
    });

    it('should return null if purchase detail not found', async () => {
      purchaseDetailsRepository.findPurchaseDetailById.mockResolvedValue(null);

      const result = await service.findPurchaseDetailById('non-existent');

      expect(result).toBeNull();
      expect(
        purchaseDetailsRepository.findPurchaseDetailById,
      ).toHaveBeenCalledWith('non-existent');
    });
  });

  describe('findAllPurchaseDetails', () => {
    it('should return all purchase details', async () => {
      const mockDetails = [
        new PurchaseDetail('purchase-1', 'food-1', 10, 5.5, 'detail-1'),
        new PurchaseDetail('purchase-1', 'food-2', 5, 3.5, 'detail-2'),
      ];

      purchaseDetailsRepository.findAllPurchaseDetails.mockResolvedValue(
        mockDetails,
      );

      const result = await service.findAllPurchaseDetails();

      expect(result).toBe(mockDetails);
      expect(
        purchaseDetailsRepository.findAllPurchaseDetails,
      ).toHaveBeenCalled();
    });
  });

  describe('updatePurchaseDetail', () => {
    it('should update a purchase detail', async () => {
      const mockDetail = new PurchaseDetail(
        'purchase-1',
        'food-1',
        15,
        6.0,
        'detail-1',
      );

      purchaseDetailsRepository.updatePurchaseDetail.mockResolvedValue(
        mockDetail,
      );

      const result = await service.updatePurchaseDetail(mockDetail);

      expect(result).toBe(mockDetail);
      expect(
        purchaseDetailsRepository.updatePurchaseDetail,
      ).toHaveBeenCalledWith(mockDetail);
    });
  });

  describe('deletePurchaseDetail', () => {
    it('should delete a purchase detail', async () => {
      purchaseDetailsRepository.deletePurchaseDetail.mockResolvedValue(
        undefined,
      );

      await service.deletePurchaseDetail('detail-1');

      expect(
        purchaseDetailsRepository.deletePurchaseDetail,
      ).toHaveBeenCalledWith('detail-1');
    });
  });
});
