/** @format */

import { api } from './api';
import type { Ticket } from '@/types/api';

export const ticketsService = {
  async buyTicket(
    drawId: string,
    ticketPrice: number,
    selectedNumbers: number[]
  ): Promise<Ticket> {
    const response = await api.post('/tickets/buy', {
      draw_id: drawId,
      ticket_price: ticketPrice,
      selected_numbers: selectedNumbers,
    });
    return response.data;
  },

  async getMyTickets(): Promise<Ticket[]> {
    const response = await api.get('/tickets/my-tickets');
    return response.data;
  },

  async getTicket(ticketId: string): Promise<Ticket> {
    const response = await api.get(`/tickets/${ticketId}`);
    return response.data;
  },

  async getAllTickets(): Promise<Ticket[]> {
    const response = await api.get('/tickets/list/all');
    return response.data;
  },

  async getTicketsByDraw(drawId: string): Promise<Ticket[]> {
    const response = await api.get(`/tickets/draw/${drawId}`);
    console.log(response.data, 'resp===');
    return response.data;
  },
};
