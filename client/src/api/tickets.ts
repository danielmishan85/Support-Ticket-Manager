import {
  type CreateTicketDTO,
  type Ticket,
} from "../types/ticket";

const API_BASE_URL = "http://localhost:5001/api/tickets";

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return res.json();
}

export async function createTicket(data: CreateTicketDTO): Promise<Ticket> {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create ticket");
  }
  return res.json();
}

export async function resolveTicket(id: string): Promise<Ticket> {
  const res = await fetch(`${API_BASE_URL}/${id}/resolve`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to resolve ticket");
  }
  return res.json();
}
