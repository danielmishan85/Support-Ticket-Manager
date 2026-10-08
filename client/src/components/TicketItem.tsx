import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  type Ticket,
  TicketPriority,
  TicketStatus,
  type TicketPriorityType,
} from "../types/ticket";

type TicketItemProps = {
  ticket: Ticket;
  onResolve: (id: string) => void;
};

const priorityColors: Record<
  TicketPriorityType,
  "success" | "warning" | "error"
> = {
  [TicketPriority.LOW]: "success",
  [TicketPriority.MEDIUM]: "warning",
  [TicketPriority.HIGH]: "error",
};

export function TicketItem({ ticket, onResolve }: TicketItemProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="h6">{ticket.title}</Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={ticket.priority}
                color={priorityColors[ticket.priority]}
                size="small"
              />
              <Chip
                label={ticket.status}
                color={
                  ticket.status === TicketStatus.RESOLVED
                    ? "default"
                    : "primary"
                }
                variant="outlined"
                size="small"
              />
            </Stack>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {ticket.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>

      {ticket.status === TicketStatus.OPEN ? (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="outlined"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => onResolve(ticket.id)}
          >
            Mark as Resolved
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}
