import type { Request, Response } from "express";
import { CreateTicket, TicketIdParams } from "../schemas/tickets.schema";
import { TicketsService } from "../services/tickets.service";

export function getTickets(_req: Request, res: Response) {
  try {
    const response = TicketsService.getAll();
    res.json(response);
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
}

export function createTicket(req: Request, res: Response) {
  const result = CreateTicket.schema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid ticket data",
      issues: result.error.issues,
    });
    return;
  }

  try {
    const ticket = TicketsService.create(result.data);
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Failed to create ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
}

export function resolveTicket(req: Request, res: Response) {
  const result = TicketIdParams.schema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      error: "Invalid ticket ID",
      issues: result.error.issues,
    });
    return;
  }

  try {
    const ticket = TicketsService.resolve(result.data.id);

    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    res.json(ticket);
  } catch (error) {
    console.error("Failed to resolve ticket:", error);
    res.status(500).json({ error: "Failed to resolve ticket" });
  }
}
