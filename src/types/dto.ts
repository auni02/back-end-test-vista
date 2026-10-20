// ---- Requests (what the client sends) ----
export interface CreateCompanyDto {
  name: string;
  registrationNumber: string;
}

export interface CreateServiceDto {
    companyId: number;
    name: string;
    description: string;
    price: number;
  // ✍️ YOUR TURN: which 4 fields does the client send to create a service?
}

// ---- Responses (what the API sends back) ----
export interface ServiceResponseDto {
  id: number;
  companyId: number;
  name: string;
  description: string;
  price: number;            // number, not Decimal
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyResponseDto {
  id: number;
  name: string;
  registrationNumber: string;
  services: ServiceResponseDto[];   // GET /companies includes the services
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorResponseDto {
  message: string;
  errors?: { field: string; message: string }[];   // per-field validation errors
}
