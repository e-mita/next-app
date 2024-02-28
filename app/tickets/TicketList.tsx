import Link from "next/link";
import React from "react";

interface Ticket {
  id: string;
  title: string;
  body: string;
  priority: string;
  user_email: string;
}

async function getTickets(): Promise<Ticket[]> {
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // using 0 so we don't use cache
    },
  });
  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <>
      {tickets.map((ticket: Ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">No tickets available</p>
      )}
    </>
  );
}
