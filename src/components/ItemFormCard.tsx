import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { categories } from "./ItemList";

//スキーマを定義
const formSchema = z.object({
  name: z.string(),
  unit: z.string(),
  category: z.string(),
});
export type ItemForm = z.infer<typeof formSchema>;

export default function ItemFormCard({
  defaultCategory,
  handleAddItem,
  isSubmitting,
}: {
  defaultCategory: string;
  handleAddItem: (item: ItemForm) => void;
  isSubmitting: boolean;
}) {
  //フォームを定義
  const initValues = {
    name: "",
    unit: "",
    category: defaultCategory,
  };
  const form = useForm<ItemForm>({
    resolver: zodResolver(formSchema),
    defaultValues: initValues,
  });
  async function onSubmit(values: ItemForm) {
    await handleAddItem(values);
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Item Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="Item Unit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category of an item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="bg-accent">
          Submit
        </Button>
      </form>
    </Form>
  );
}
