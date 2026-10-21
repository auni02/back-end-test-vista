export interface CreateCompanyDto {
  name: string;
  registrationNumber: string;
}

export interface CreateServiceDto {
  companyId: number;
  name: string;
  description: string;
  price: number;
}

export interface ServiceResponseDto {
  id: number;
  companyId: number;
  name: string;
  description: string;
  price: number; // DB simpan Decimal, tapi JSON kita hantar number (tengok toServiceDto)
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyResponseDto {
  id: number;
  name: string;
  registrationNumber: string;
  services: ServiceResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorResponseDto {
  message: string;
  errors?: { field: string; message: string }[];
}
