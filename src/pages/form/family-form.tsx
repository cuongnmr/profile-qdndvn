import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  hotenbo: z.string().min(1).optional(),
  namsinhbo: z.string().min(1).optional(),
  sdtbo: z.string().min(1).optional(),
  nghenghiepbo: z.string().min(1).optional(),
  nammatbo: z.string().min(1).optional(),
  quequanbo: z.string().min(1).optional(),
  truquanbo: z.string().min(1).optional(),
  hotenme: z.string().min(1).optional(),
  namsinhme: z.string().min(1).optional(),
  sdtme: z.string().min(1).optional(),
  nghenghiepme: z.string().min(1).optional(),
  nammatme: z.string().min(1).optional(),
  quequanme: z.string().min(1).optional(),
  truquanme: z.string().min(1).optional(),
  con: z.string().optional(),
  anhchiem: z.string().optional(),
});

const placeholder = "Nhập thông tin";

interface Props {
  onReturn: () => void;
  onFinish: (data: any) => void;
}

export default function FamilyForm({ onReturn, onFinish }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      onFinish(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-lg space-y-4"
      >
        {/* dad */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="hotenbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên bố</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="namsinhbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sinh</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="sdtbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SĐT</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <FormField
              control={form.control}
              name="nghenghiepbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nghề nghiệp</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <FormField
              control={form.control}
              name="nammatbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm mất?</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="quequanbo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quê quán</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Xóm, xã, tỉnh</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="truquanbo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trú quán</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* mom */}

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="hotenme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên mẹ</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="namsinhme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sinh</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="sdtme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SĐT</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <FormField
              control={form.control}
              name="nghenghiepme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nghề nghiệp</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder} type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <FormField
              control={form.control}
              name="nammatme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm mất?</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="quequanme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quê quán</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Xóm, xã, tỉnh</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="truquanme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trú quán</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* siblings */}
        <FormField
          control={form.control}
          name="anhchiem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thông tin anh chị em trong gia đình</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Họ tên, năm sinh, nghề nghiệp"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ví dụ: Anh trai Nguyễn Văn A, 1996, Công nhân
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* child */}
        <FormField
          control={form.control}
          name="con"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thông tin con</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Họ tên, năm sinh"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ví dụ: Con trai Nguyễn Văn A, 2020
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" onClick={onReturn} variant="outline">
            Quay lại
          </Button>
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </Form>
  );
}
