import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { CreateCompanyDto, CompanyResponseDto, ServiceResponseDto } from "../types/dto";

// Prisma bagi price as Decimal object, JSON tak reti handle, so convert jadi number dulu
export function toServiceDto(s: Prisma.ServiceGetPayload<{}>): ServiceResponseDto {
  return { ...s, price: s.price.toNumber() };
}

export async function createCompany(
  req: Request<{}, {}, CreateCompanyDto>, // <params, resBody, reqBody>, so req.body ada type, bukan any
  res: Response<CompanyResponseDto | { message: string }>
) {
  const { name, registrationNumber } = req.body;

  try {
    const company = await prisma.company.create({
      data: { name, registrationNumber },
    });
    return res.status(201).json({ ...company, services: [] });
  } catch (err) {
    // P2002 = @unique fail, registrationNumber dah wujud. Validator tak tahu isi DB, so DB je boleh tangkap
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(409).json({
        message: `Company with registration number ${registrationNumber} already exists`,
      });
    }
    throw err; // error lain biar errorHandler settle (500)
  }
}

export async function getCompanies(req: Request, res: Response<CompanyResponseDto[]>) {
  const companies = await prisma.company.findMany({
    include: { services: true }, // tarik services sekali, macam JOIN dalam SQL
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(
    companies.map((c) => ({ ...c, services: c.services.map(toServiceDto) }))
  );
}
