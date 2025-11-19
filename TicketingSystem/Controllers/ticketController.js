const { getTickets, saveTickets } = require("../Models/TicketModel");

exports.getAllTickets = async (req, res) => {
  const tickets = await getTickets();
  res.status(200).json(tickets);
};

exports.getTicketById = async (req, res) => {
  const tickets = await getTickets();
  const ticket = tickets.find(t => t.id == req.params.id);

  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  res.json(ticket);
};
exports.createTicket = async (req, res) => {
  const tickets = await getTickets();
  
  const newTicket = {
    id: tickets.length ? tickets[tickets.length - 1].id + 1 : 1,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    user: req.body.user,
    status: "pending"
  };

  tickets.push(newTicket);
  await saveTickets(tickets);

  res.status(201).json(newTicket);
};

exports.updateTicket = async (req, res) => {
  const tickets = await getTickets();
  const ticket = tickets.find(t => t.id == req.params.id);

  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.title = req.body.title ?? ticket.title;
  ticket.description = req.body.description ?? ticket.description;
  ticket.priority = req.body.priority ?? ticket.priority;

  await saveTickets(tickets);

  res.json(ticket);
};

exports.deleteTicket = async (req, res) => {
  let tickets = await getTickets();
  const exists = tickets.some(t => t.id == req.params.id);

  if (!exists) return res.status(404).json({ error: "Ticket not found" });

  tickets = tickets.filter(t => t.id != req.params.id);

  await saveTickets(tickets);

  res.json({ message: "Ticket deleted" });
};
exports.resolveTicket = async (req, res) => {
  const tickets = await getTickets();
  const ticket = tickets.find(t => t.id == req.params.id);

  if (!ticket) return res.status(404).json({ error: "Ticket not found" });

  ticket.status = "resolved";
  await saveTickets(tickets);

  res.json(ticket);
};
