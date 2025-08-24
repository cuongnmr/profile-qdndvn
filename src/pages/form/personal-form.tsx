import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createUser } from "@/helpers/user-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const error = "Chưa đủ thông tin",
  placeholder = "Nhập thông tin";

const formSchema = z.object({
  hoten: z.string({
    error,
  }),
  ngaysinh: z.string({ error }),
  nhapngu: z.string({ error }).min(6, { error }),
  capbac: z.string({ error }),
  chucvu: z.string({ error }),
  donvi: z.string({ error }),
  vanhoa: z.string().min(2, { error }),
  vaodoan: z.string({ error }).optional(),
  vaodang: z.string({ error }).optional(),
  dantoc: z.string({ error }),
  tongiao: z.string({ error }),
  khokhan: z.string().optional(),
  doandang: z.string().optional(),
  sohieuqn: z.string({ error }).optional(),
  capbacheso: z.string({ error }).optional(),
  thanhphan: z.string({ error }),
  thuongtru: z.string({ error }),
  sothedang: z.string().optional(),
  truocnhapngu: z.string({ error }),
  truongquandoi: z.string({ error }).optional(),
  nuocngoai: z.string({ error }).optional(),
  sotruong: z.string({ error }).optional(),
  laodongchinh: z.boolean().default(false).optional(),
  nguoithandinuocngoai: z.string().optional(),
  bomebichatdocdacam: z.string().optional(),
  conguoitrongquandoi: z.string().optional(),
  phatgiamcaitao: z.string().optional(),
  tomtatcongtac: z.string().optional(),
});

interface Props {
  onFinish: (data: any) => void;
  defaultData: any;
}

const dateToString = (value?: string) => {
  if (value) return String(new Date(value).getTime());
  return undefined;
};

export default function PersonalForm({ onFinish, defaultData }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vanhoa: "12",
      tongiao: "Không",
      doandang: "doanvien",
      dantoc: "Kinh",
      donvi: "c4",
      thanhphan: "Bần nông",
      nuocngoai: "Không",
      nguoithandinuocngoai: "Không",
      bomebichatdocdacam: "Không",
      conguoitrongquandoi: "không",
      phatgiamcaitao: "Không",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (defaultData && defaultData.id) {
        onFinish((prev: any) => ({ ...prev, ...values }));
      } else {
        const user = await createUser(
          Object.assign(values, {
            ngaysinh: dateToString(values.ngaysinh),
            vaodoan: dateToString(values.vaodoan),
            vaodang: dateToString(values.vaodang),
          }),
        );
        onFinish((prev: any) => ({ ...prev, ...values, id: user.id }));
      }
      toast.success("Lưu thành công");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const doanvien = form.watch("doandang") === "doanvien";

  useEffect(() => {
    if (defaultData && Object.keys(defaultData).length > 0) {
      form.reset(defaultData);
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (inValid) => {
          console.log(inValid);
        })}
        className="mx-auto w-full max-w-lg space-y-4"
      >
        <FormField
          control={form.control}
          name="hoten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ngaysinh"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="sohieuqn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số hiệu quân nhân</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capbacheso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cấp bậc, hệ số</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormDescription>Tháng năm nhận</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 items-start gap-4">
          <FormField
            control={form.control}
            name="dantoc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dân tộc</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    type="text"
                    list="dantoc"
                    id="dantoc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tongiao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tôn giáo</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="nhapngu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập ngũ</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Tháng / năm</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 items-start gap-3">
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
                    <SelectItem value="H3">H3</SelectItem>
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
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    type="text"
                    {...field}
                    list="chucvus"
                  />
                </FormControl>
                <datalist id="chucvus">
                  <option value="ct" />
                  <option value="ctv" />
                  <option value="cp" />
                  <option value="ctvp" />
                  <option value="bt" />
                  <option value="cs" />
                </datalist>
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
                  <Input placeholder={placeholder} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="vanhoa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Văn hóa</FormLabel>
              <FormControl>
                <InputOTP maxLength={2} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <span>/</span>
                  <div className="text-sm">12</div>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thanhphan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thành phần gia đình</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thuongtru"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nơi ở hiện nay</FormLabel>
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

        <FormField
          control={form.control}
          name="vaodoan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày vào đoàn</FormLabel>
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

        {!doanvien && (
          <div className="grid grid-cols-2 items-start gap-4">
            <FormField
              control={form.control}
              name="vaodang"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày vào Đảng</FormLabel>
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
            <FormField
              control={form.control}
              name="sothedang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số thẻ đảng</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
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
          </div>
        )}

        <FormField
          control={form.control}
          name="truocnhapngu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trước khi nhập ngũ làm gì, ở đâu</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="truongquandoi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Học qua trường nào trong Quân đội</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Thời gian học</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nuocngoai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Đã từng đi nước ngoài</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Thời gian đi</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sotruong"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sở trường</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="laodongchinh"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Là lao động chính?</FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nguoithandinuocngoai"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Có người thân đi nước ngoài không?</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bomebichatdocdacam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bố mẹ bị chất độc da cam không?</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conguoitrongquandoi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gia đình có người trong quân đội không?</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormDescription>Cấp bậc, chức vụ, đơn vị</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phatgiamcaitao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gia đình có ai bị phạt giam cải tạo không</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tomtatcongtac"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tóm tắt quá trình công tác trong quân đội</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="khokhan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hoàn cảnh khó khăn?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả hoàn cảnh khó khăn"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit">Lưu</Button>
        </div>
      </form>
    </Form>
  );
}
