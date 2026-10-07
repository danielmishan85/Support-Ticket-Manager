import { faker } from "@faker-js/faker";
import { tickets } from "../data/initialData";
import {
  TicketStatus,
  type CreateTicket,
  type Ticket,
} from "../schemas/tickets.schema";

export abstract class TicketsService {
  static getAll() {
    return tickets;
  }

  static create(data: CreateTicket) {
    const ticket: Ticket = {
      id: faker.string.uuid(),
      ...data,
      status: TicketStatus.schema.enum.OPEN,
      createdAt: new Date().toISOString(),
    };

    tickets.unshift(ticket);
    return ticket;
  }

  static resolve(id: string) {
    const ticket = tickets.find((item) => item.id === id);

    if (!ticket) {
      return undefined;
    }

    ticket.status = TicketStatus.schema.enum.RESOLVED;
    return ticket;
  }
}
