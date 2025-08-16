import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SqQNCNForm from "./form/sq-qncn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  hoten: z.string().min(1),
  dob: z.string(),
  nhapngu: z.string().min(6),
  capbac: z.string(),
  chucvu: z.string(),
  donvi: z.string(),
  vanhoa: z.number().min(1).max(12),
  vaodoan: z.string(),
  vaodang: z.string(),
  dantoc: z.string().min(1),
  tongiao: z.string().min(1),
  hotenbo: z.string().min(1),
  hotenme: z.string().min(1),
  quequan: z.string().min(1),
  sdtnguoithan: z.string().min(1).optional(),
  khokhan: z.boolean().default(false).optional(),
  bomat: z.boolean().default(false).optional(),
  memat: z.boolean().default(false).optional(),
  doandang: z.string().optional(),
  motakhokhan: z.string().optional(),
  type: z.string().optional(),
  sohieuqn: z.string().min(1).optional(),
  capbacheso: z.string().min(1).optional(),
});

export default function CreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: new Date().toString(),
      vaodoan: new Date().toString(),
      vaodang: new Date().toString(),
      vanhoa: 12,
      tongiao: "Không",
      doandang: "doanvien",
      dantoc: "Kinh",
      donvi: "c4",
      type: "bs",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
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

  const doanvien = form.watch("doandang") === "doanvien";
  const isBs = form.watch("type") === "bs";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="hoten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên *</FormLabel>
              <FormControl>
                <Input placeholder="Họ và tên" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Loại công tác</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  value={field.value}
                >
                  {[
                    ["Cán bộ", "canbo"],
                    ["QNCN", "qncn"],
                    ["HSQ-BS", "bs"],
                  ].map((option) => (
                    <FormItem
                      className="flex items-center space-y-0 space-x-3"
                      key={option[1]}
                    >
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isBs && <SqQNCNForm form={form} />}

        <FormField
          control={form.control}
          name="nhapngu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập ngũ</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <span>/</span>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="capbac"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cấp bậc</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Cấp bậc" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="B1">B1</SelectItem>
                    <SelectItem value="B2">B2</SelectItem>
                    <SelectItem value="H1">H1</SelectItem>
                    <SelectItem value="H2">H2</SelectItem>
                    <SelectItem value="1/">1/</SelectItem>
                    <SelectItem value="2/">2/</SelectItem>
                    <SelectItem value="3/">3/</SelectItem>
                    <SelectItem value="4/">4/</SelectItem>
                    <SelectItem value="1//">1//</SelectItem>
                    <SelectItem value="2//">2//</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chucvu"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Chức vụ</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Chức vụ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ct">ct</SelectItem>
                    <SelectItem value="ctv">ctv</SelectItem>
                    <SelectItem value="cp">cp</SelectItem>
                    <SelectItem value="ctvp">ctvp</SelectItem>
                    <SelectItem value="bt">bt</SelectItem>
                    <SelectItem value="cs">cs</SelectItem>
                    <SelectItem value="lx">lx</SelectItem>
                    <SelectItem value="lm">lm</SelectItem>
                    <SelectItem value="tsc">tsc</SelectItem>
                    <SelectItem value="ent">ent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="donvi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đơn vị</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập thông tin" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </div>

        <FormField
          control={form.control}
          name="vanhoa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Văn hóa</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    {...field}
                    className="w-28"
                  />
                  <span>/12</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doandang"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Đoàn đảng</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  value={field.value}
                >
                  {[
                    ["Đoàn viên", "doanvien"],
                    ["Đảng viên", "dangvien"],
                  ].map((option) => (
                    <FormItem
                      className="flex items-center space-y-0 space-x-3"
                      key={option[1]}
                    >
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="vaodoan"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Vào đoàn</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="vaodang"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Vào đảng</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={doanvien}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="dantoc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dân tộc</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập thông tin"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="tongiao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tôn giáo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập thông tin"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 items-end gap-4">
          <div className="col-span-9">
            <FormField
              control={form.control}
              name="hotenbo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên bố</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập thông tin"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="bomat"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mất?</FormLabel>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 items-end gap-4">
          <div className="col-span-9">
            <FormField
              control={form.control}
              name="hotenme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên mẹ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập thông tin"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="memat"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mất?</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="sdtnguoithan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại người thân</FormLabel>
              <FormControl>
                <Input placeholder="Nhập thông tin" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quequan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quê quán</FormLabel>
              <FormControl>
                <Input placeholder="Nhập thông tin" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="khokhan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex-1 space-y-1 leading-none">
                <FormLabel>Hoàn cảnh khó khăn?</FormLabel>
                <FormField
                  control={form.control}
                  name="motakhokhan"
                  render={({ field: field1 }) => (
                    <FormItem className={field.value ? "w-full" : "hidden"}>
                      <FormControl>
                        <Textarea
                          placeholder="Mô tả hoàn cảnh khó khăn"
                          className="w-full resize-none"
                          {...field1}
                          value={field.value ? field1.value : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Thêm</Button>
      </form>
    </Form>
  );
}
