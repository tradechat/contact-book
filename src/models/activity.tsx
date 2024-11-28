export interface Activity {
  contact: string;
  timestamp: string; // or `Date` if you're parsing it
  action: string;
  by: string;
  status?: string; // Optional if not always present
}
