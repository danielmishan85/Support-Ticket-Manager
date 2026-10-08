export const TicketStatus = {
  OPEN: "OPEN",
  RESOLVED: "RESOLVED",
} as const;

export type TicketStatusType = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TicketPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type TicketPriorityType =
  (typeof TicketPriority)[keyof typeof TicketPriority];

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityType;
  status: TicketStatusType;
  createdAt: string;
}

export interface CreateTicketDTO {
  title: string;
  description: string;
  priority: TicketPriorityType;
}

export const StatusFilter = {
  OPEN: "OPEN",
  RESOLVED: "RESOLVED",
  ALL: "ALL",
} as const;

export type StatusFilterType = (typeof StatusFilter)[keyof typeof StatusFilter];
