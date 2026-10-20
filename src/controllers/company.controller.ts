import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { CreateCompanyDto, CompanyResponseDto, ServiceResponseDto } from "../types/dto";

// Converts a Prisma Service (price = Decimal) into the API shape (price = number)
export function toServiceDto(s: Prisma.ServiceGetPayload<{}>): ServiceResponseDto {
  return { ...s, price: s.price.toNumber() };
}

export async function createCompany(
  req: Request<{}, {}, CreateCompanyDto>,      // <params, resBody, reqBody>: types req.body!
  res: Response<CompanyResponseDto | { message: string }>
) {
  const { name, registrationNumber } = req.body;

  try {
    const company = await prisma.company.create({
      data: { name, registrationNumber },
    });
    return res.status(201).json({ ...company, services: [] });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return res.status(409).json({
        message: `Company with registration number ${registrationNumber} already exists`,
      });
    }
    throw err;   // anything unexpected → let Express handle it (500)
  }
}

export async function getCompanies(req: Request, res: Response<CompanyResponseDto[]>) {
  const companies = await prisma.company.findMany({
    include: { services: true },     // JOIN the services
    orderBy: { createdAt: "desc" },       // newest first
  });

  res.status(200).json(
    companies.map((c) => ({ ...c, services: c.services.map(toServiceDto) }))
  );
}
