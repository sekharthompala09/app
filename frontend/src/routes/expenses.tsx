import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"



export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

async function getAllExpenses() {
//    await new Promise((r) =>  setTimeout(r, 2000));
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return data;
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['"get-all-expenses"'],
    queryFn: getAllExpenses,
  });

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of your recent Expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                    </TableCell>
                  <TableCell>
                  <Skeleton className="h-4" />
                    </TableCell>
                </TableRow>
              ))
            : data.expenses.map((expense) => (
                <TableRow  key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
