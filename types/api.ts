export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  referral_code: string
  wallet_balance: number
  total_referrals: number
  created_at: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface Draw {
  id: string
  draw_type: string
  start_time: string
  end_time: string
  total_pot: number
  total_tickets: number
  status: string
  winning_numbers: number[]
  first_place_winner: Winner | null
  consolation_winners: Winner[]
  platform_earnings: number
  created_at: string
}

export interface Winner {
  user_id: string
  name: string
  prize_amount: number
}

export interface Ticket {
  id: string
  user_id: string
  draw_id: string
  draw_type: string
  ticket_price: number
  selected_numbers: number[]
  match_count: number
  purchase_date: string
  status: string
  is_winner: boolean
  prize_amount: number | null
}

export interface Transaction {
  id: string
  user_id: string
  type: "credit" | "debit"
  amount: number
  description: string
  status: "completed" | "pending" | "failed"
  date: string
  account_name: string | null
  bank_name: string | null
  account_number: string | null
}

export interface WalletDetails {
  balance: number
  transactions: Transaction[]
}

export interface PaystackResponse {
  authorization_url: string
  access_code: string
  reference: string
}
