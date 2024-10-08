import { createFileRoute , useNavigate} from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { api } from "@/lib/api";

export const Route = createFileRoute("/creaete-expense")({
  component: CreateExpense,
});

function CreateExpense() {
    const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
        await new Promise((r) =>  setTimeout(r, 2000));

        const response = await api.expenses.$post({json: value});
        if(!response.ok){
            throw new Error(response.statusText);
        }
        navigate({ to: '/expenses'})
    },
  });

  return (
    <div className="p-2">
      <h2> Create Expense</h2>
      <form
        className=" max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => {
            return (
              <>
                <Label htmlFor="title">Title</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
                {field.state.meta.isValidating ? "Validating..." : null}
              </>
            );
          }}
        />
         <form.Field
          name="amount"
          children={(field) => {
            return (
              <>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
                {field.state.meta.isValidating ? "Validating..." : null}
              </>
            );
          }}
        />
         <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
                <Button className="mt-4"  type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
          />
      </form>
    </div>
  );
}
