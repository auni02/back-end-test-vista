import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { toServiceDto } from "./company.controller";
import { CreateServiceDto, ServiceResponseDto } from "../types/dto";

type ErrorBody = { message: string };

export async function createService(
  req: Request<{}, {}, CreateServiceDto>,
  res: Response<ServiceResponseDto | ErrorBody>
) {
  const { name, description, price, companyId } = req.body;

  // Check company wujud dulu. Kalau tak, bagi 404 yang clear, bukan error foreign key yang pelik
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) {
    return res.status(404).json({ message: `Company with id ${companyId} not found` });
  }

  const service = await prisma.service.create({
    data: { name, description, price, companyId },
  });

  return res.status(201).json(toServiceDto(service));
}

export async function getServiceById(
  req: Request<{ id: string }>,
  res: Response<ServiceResponseDto | ErrorBody>
) {
  // :id dari URL sentiasa string. Validator dah confirm dia integer, so Number() ni safe
  const id = Number(req.params.id);

  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    return res.status(404).json({ message: `Service with id ${id} not found` });
  }

  return res.status(200).json(toServiceDto(service));
}
