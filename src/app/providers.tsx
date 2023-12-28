import { ExpensesProvider } from "@/contexts/expense-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ExpensesProvider>{children}</ExpensesProvider>;
}
