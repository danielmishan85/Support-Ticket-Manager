import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Box,
  ThemeProvider,
  createTheme,
  Stack,
} from "@mui/material";
import {
  StatusFilter,
  type CreateTicketDTO,
  type StatusFilterType,
  type Ticket,
} from "./types/ticket";
import { fetchTickets, createTicket, resolveTicket } from "./api/tickets";
import { CreateTicketForm } from "./components/CreateTicketForm";
import { StatusToggle } from "./components/StatusToggle";
import { TicketItem } from "./components/TicketItem";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<StatusFilterType>(StatusFilter.ALL);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    fetchTickets()
      .then((data) => {
        if (!cancelled) {
          setTickets(data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateTicket = async (data: CreateTicketDTO) => {
    const newTicket = await createTicket(data);
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleResolveTicket = async (id: string) => {
    const updatedTicket = await resolveTicket(id);
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === id ? updatedTicket : ticket)),
    );
  };

  const visibleTickets =
    filter === StatusFilter.ALL
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="column" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Support Ticket Manager
        </Typography>
        <Stack direction="row" spacing={4}>
          <CreateTicketForm onSubmit={handleCreateTicket} />
          <Stack direction="column" spacing={1}>
            <Typography variant="h5">Tickets</Typography>
            <StatusToggle
              selectedFilter={filter}
              onFilterChange={(nextFilter) => setFilter(nextFilter)}
            />
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : visibleTickets.length === 0 ? (
              <Typography color="text.secondary">No tickets found.</Typography>
            ) : (
              visibleTickets.map((ticket) => (
                <TicketItem
                  key={ticket.id}
                  ticket={ticket}
                  onResolve={handleResolveTicket}
                />
              ))
            )}
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
