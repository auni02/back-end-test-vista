import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { toServiceDto } from "./company.controller";      // reuse, don't redefine
import { CreateServiceDto, ServiceResponseDto } from "../types/dto";

type ErrorBody = { message: string };

export async function createService(
  req: Request<{}, {}, CreateServiceDto>,
  res: Response<ServiceResponseDto | ErrorBody>
) {
  const { name, description, price, companyId } = req.body;

  // 1. Does the company exist?
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) {
    return res.status(404).json({ message: `Company with id ${companyId} not found` });
  }

  // 2. Create the service
  const service = await prisma.service.create({
    data: { name, description, price, companyId },
  });

  return res.status(201).json(toServiceDto(service));
}

export async function getServiceById(
  req: Request<{ id: string }>,                 // params type: :id comes in as a string
  res: Response<ServiceResponseDto | ErrorBody>
) {
  const id = Number(req.params.id);             // the validator checked it's an integer

  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    return res.status(404).json({ message: `Service with id ${id} not found` });
  }

  return res.status(200).json(toServiceDto(service));
}
