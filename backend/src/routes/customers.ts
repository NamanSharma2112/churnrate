import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/database.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(authenticate);

router.get("/", async (req, res) => {
  try {
    const { page = "1", limit = "20", sort = "churnRisk", order = "desc", search } = req.query;
    const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
    const take = parseInt(limit as string, 10);

    const where = {
      tenantId: req.user!.tenantId,
      ...(search
        ? {
            OR: [
              { name: { contains: search as string, mode: "insensitive" as const } },
              { email: { contains: search as string, mode: "insensitive" as const } },
              { company: { contains: search as string, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip,
        take,
        orderBy: { [sort as string]: order as string },
      }),
      prisma.customer.count({ where }),
    ]);

    res.json({ customers, total, page: parseInt(page as string, 10), totalPages: Math.ceil(total / take) });
  } catch (err) {
    console.error("List customers error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id as string;
    const customer = await prisma.customer.findFirst({
      where: { id, tenantId: req.user!.tenantId },
      include: {
        predictions: { orderBy: { createdAt: "desc" }, take: 10 },
        events: { orderBy: { createdAt: "desc" }, take: 20 },
      },
    });

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    res.json({ customer });
  } catch (err) {
    console.error("Get customer error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  plan: z.enum(["free", "starter", "pro", "enterprise"]).default("free"),
  mrr: z.number().min(0).default(0),
});

router.post("/", validate(createCustomerSchema), async (req, res) => {
  try {
    const customer = await prisma.customer.create({
      data: { ...req.body, tenantId: req.user!.tenantId },
    });

    await prisma.event.create({
      data: {
        type: "signup",
        message: `New customer ${customer.name} onboarded`,
        customerId: customer.id,
        tenantId: req.user!.tenantId,
      },
    });

    res.status(201).json({ customer });
  } catch (err) {
    console.error("Create customer error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateCustomerSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  company: z.string().optional(),
  plan: z.enum(["free", "starter", "pro", "enterprise"]).optional(),
  mrr: z.number().min(0).optional(),
});

router.patch("/:id", validate(updateCustomerSchema), async (req, res) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.customer.findFirst({
      where: { id, tenantId: req.user!.tenantId },
    });

    if (!existing) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: req.body,
    });

    res.json({ customer });
  } catch (err) {
    console.error("Update customer error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.customer.findFirst({
      where: { id, tenantId: req.user!.tenantId },
    });

    if (!existing) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    await prisma.customer.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("Delete customer error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
