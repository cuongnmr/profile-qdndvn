import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef, useState } from "react";
import FamilyForm from "./form/family-form";
import PersonalForm from "./form/personal-form";
const CreatePage = () => {
  const [data, setData] = useState();
  const [tabIndex, setTabIndex] = useState<string>("personal");
  const div = useRef<HTMLDivElement>(null);

  function scrollTop() {
    div.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div ref={div} className="-translate-y-4"></div>
      <Tabs value={tabIndex} onValueChange={setTabIndex}>
        <TabsList className="mb-3 w-full">
          <TabsTrigger value="personal">BẢN THÂN</TabsTrigger>
          <TabsTrigger value="family">GIA ĐÌNH</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalForm
            onFinish={(values) => {
              setData(values);
              setTabIndex("family");
              scrollTop();
            }}
            defaultData={data}
          />
        </TabsContent>
        <TabsContent value="family">
          <FamilyForm
            onReturn={() => {
              setTabIndex("personal");
              scrollTop();
            }}
            onFinish={(values) => {
              setData((prev) => Object.assign({}, prev, values));
            }}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CreatePage;
