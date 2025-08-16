import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  form: any;
}

export default function MyForm({ form }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <FormField
          control={form.control}
          name="sohieuqn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số hiệu quân nhân</FormLabel>
              <FormControl>
                <Input placeholder="Nhập thông tin" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-6">
        <FormField
          control={form.control}
          name="capbacheso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cấp bậc, hệ số</FormLabel>
              <FormControl>
                <Input placeholder="Nhập thông tin" type="text" {...field} />
              </FormControl>
              <FormDescription>Tháng năm nhận</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
