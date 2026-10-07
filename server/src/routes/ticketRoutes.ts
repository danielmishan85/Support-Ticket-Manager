import { Router } from "express";
import {
  createTicket,
  getTickets,
  resolveTicket,
} from "../controllers/tickets.controller";

const router = Router();

router.get("/", getTickets);
router.post("/", createTicket);
router.patch("/:id/resolve", resolveTicket);

export default router;
