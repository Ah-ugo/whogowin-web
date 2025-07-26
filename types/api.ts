/** @format */

// types/api.ts
export type UserRole = 'admin' | 'user';
export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  referral_code: string;
  wallet_balance: number;
  total_referrals: number;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export type DrawType = 'daily' | 'weekly' | 'monthly';
export type DrawStatus = 'active' | 'completed' | 'pending';

export interface Draw {
  id: string;
  draw_type: DrawType;
  start_time: string;
  end_time: string;
  total_pot: number;
  total_tickets: number;
  status: DrawStatus;
  winning_numbers: number[];
  first_place_winner: Winner | null;
  consolation_winners: Winner[];
  platform_earnings: number;
  created_at: string;
}

export interface Winner {
  user_id: string;
  name: string;
  prize_amount: number;
  ticket_id?: string;
  match_count?: number;
  selected_numbers?: number[];
}

export type TicketStatus = 'active' | 'completed';

export interface Ticket {
  id: string;
  user_id: string;
  draw_id: string;
  draw_type: DrawType;
  ticket_price: number;
  selected_numbers: number[];
  match_count: number;
  purchase_date: string;
  status: TicketStatus;
  is_winner: boolean;
  prize_amount: number | null;
  user_name?: string | null;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: TransactionStatus;
  date: string;
  account_name: string | null;
  bank_name: string | null;
  account_number: string | null;
}

export interface WalletDetails {
  balance: number;
  transactions: Transaction[];
}

export interface PaystackResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

// Extended interfaces for API responses
export interface DrawWithTickets extends Draw {
  tickets?: Ticket[];
}

export interface TicketWithDraw extends Ticket {
  draw?: Draw;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
