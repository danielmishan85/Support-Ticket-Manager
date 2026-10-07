import { z } from "zod";

const MAX_TITLE_LENGTH = 100;

export const TicketPriority = {
  schema: z.enum(["LOW", "MEDIUM", "HIGH"]),
};

export type TicketPriority = z.infer<typeof TicketPriority.schema>;

export const TicketStatus = {
  schema: z.enum(["OPEN", "RESOLVED"]),
};

export type TicketStatus = z.infer<typeof TicketStatus.schema>;

const requiredText = z.string().trim().min(1);

export const Ticket = {
  schema: z.object({
    id: z.uuid(),
    title: requiredText.max(MAX_TITLE_LENGTH),
    description: requiredText,
    priority: TicketPriority.schema,
    status: TicketStatus.schema,
    createdAt: z.iso.datetime(),
  }),
};

export type Ticket = z.infer<typeof Ticket.schema>;

export const CreateTicket = {
  schema: Ticket.schema.pick({
    title: true,
    description: true,
    priority: true,
  }),
};

export type CreateTicket = z.infer<typeof CreateTicket.schema>;

export const TicketIdParams = {
  schema: z.object({ id: z.uuid() }),
};

export type TicketIdParams = z.infer<typeof TicketIdParams.schema>;
