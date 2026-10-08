import { useState, type FormEvent } from "react";
import {
  Card,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Alert,
  Stack,
} from "@mui/material";
import {
  TicketPriority,
  type CreateTicketDTO,
  type TicketPriorityType,
} from "../types/ticket";

type CreateTicketFormProps = {
  onSubmit: (data: CreateTicketDTO) => Promise<void>;
};

export function CreateTicketForm({ onSubmit }: CreateTicketFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TicketPriorityType>(
    TicketPriority.MEDIUM,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await onSubmit({ title, description, priority });

      setTitle("");
      setDescription("");

      setPriority(TicketPriority.MEDIUM);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ width: "400px", padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h6">Create New Ticket</Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              label="Priority"
              onChange={(e) =>
                setPriority(e.target.value as TicketPriorityType)
              }
            >
              <MenuItem value={TicketPriority.LOW}>Low</MenuItem>
              <MenuItem value={TicketPriority.MEDIUM}>Medium</MenuItem>
              <MenuItem value={TicketPriority.HIGH}>High</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ alignSelf: "flex-start" }}
          >
            {loading ? "Creating..." : "Create Ticket"}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
