import Ticket from "../../models/Ticket";
import AppError from "../../errors/AppError";

const FindTicketsByContactIdService = async (contactId: string | number): Promise<Ticket[]> => {
  console.log("Searching for tickets with contactId:", contactId);

  // Obtener todos los tickets de la base de datos
  const tickets = await Ticket.findAll();

  // Filtrar los tickets que coinciden con el contactId
  const ticketFund = tickets.filter(ticket => ticket.userId === contactId);

  console.log("Tickets found:", ticketFund);

  // Verificar si se encontró al menos un ticket
  if (ticketFund.length === 0) {
      throw new AppError("ERR_NO_TICKET_FOUND", 404);
  }

  return ticketFund; // Devolver todos los tickets encontrados
};

export default FindTicketsByContactIdService;
