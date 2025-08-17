import { useEffect, useState } from "react";
import PersonalForm from "./form/personal-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FamilyForm from "./form/family-form";
const CreatePage = () => {
  const [data, setData] = useState();
  const [tabIndex, setTabIndex] = useState<string>("personal");
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Tabs value={tabIndex} onValueChange={setTabIndex}>
      <TabsList className="mb-3 w-full">
        <TabsTrigger value="personal">BẢN THÂN</TabsTrigger>
        <TabsTrigger value="family">GIA ĐÌNH</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <PersonalForm
          onFinish={setData}
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
