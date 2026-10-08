import { faker } from "@faker-js/faker";
import {
  TicketPriority,
  TicketStatus,
  type Ticket,
} from "../schemas/tickets.schema";

export const tickets: Ticket[] = [
  {
    id: faker.string.uuid(),
    title: "Cannot connect to database",
    description: "Getting connection timeout errors in production.",
    priority: TicketPriority.schema.enum.HIGH,
    status: TicketStatus.schema.enum.OPEN,
    createdAt: new Date().toISOString(),
  },
  {
    id: faker.string.uuid(),
    title: "UI styling fix on navbar",
    description: "Logo is slightly misaligned on mobile devices.",
    priority: TicketPriority.schema.enum.LOW,
    status: TicketStatus.schema.enum.RESOLVED,
    createdAt: new Date().toISOString(),
  },
  {
    id: faker.string.uuid(),
    title: "UI styling fix on navbar",
    description: "Logo is slightly misaligned on mobile devices.",
    priority: TicketPriority.schema.enum.MEDIUM,
    status: TicketStatus.schema.enum.RESOLVED,
    createdAt: new Date().toISOString(),
  },
];
