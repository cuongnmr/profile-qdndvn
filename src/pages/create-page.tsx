import { useEffect, useState } from "react";
import PersonalForm from "./form/personal-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FamilyForm from "./form/family-form";
import { toast } from "sonner";
import { useUserAPI } from "@/hooks/use-user-api";
const CreatePage = () => {
  const { loading, error, createUser, initialize } = useUserAPI();

  const [data, setData] = useState();
  const [tabIndex, setTabIndex] = useState<string>("personal");
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("initialize");
        await initialize();
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    };
    init();
  }, [initialize]);

  const handleCreateUser = async (formData: any) => {
    try {
      console.log("formData", formData);
      // await createUser(formData);
      await window.userAPI.create(formData);
      console.log("🚀 ~ handleCreateUser ~ result:");
      toast.success("User created successfully!");
      // await loadUsers();
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <Tabs value={tabIndex} onValueChange={setTabIndex}>
      <TabsList className="mb-3 w-full">
        <TabsTrigger value="personal">BẢN THÂN</TabsTrigger>
        <TabsTrigger value="family">GIA ĐÌNH</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <PersonalForm
          onFinish={handleCreateUser}
          onNextPage={() => setTabIndex("family")}
        />
      </TabsContent>
      <TabsContent value="family">
        <FamilyForm />
      </TabsContent>
    </Tabs>
  );
};

export default CreatePage;
