export interface User {
  id: number;
  full_name: string;
  email: string;
  password: string;
  created_at: Date | null;
}
