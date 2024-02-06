import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface TabsContainerProps {
  tabs: ITabProps[];
}

interface ITabProps {
  value: string;
  title: string;
  content: ReactNode;
}

export const TabsContainer = ({ tabs }: TabsContainerProps) => {
  return tabs.length < 1 ? <></> :
    (
      <Tabs defaultValue={tabs[0].value} className="">
        <TabsList className="flex">
          {
            tabs.map((tab) =>
              <TabsTrigger
                value={tab.value}
                key={tab.value}
                className="flex-1"
              >{tab.title}</TabsTrigger>)
          }
        </TabsList>
        {
          tabs.map((tab) =>
            <TabsContent value={tab.value} key={tab.value}>
              <Card>
                {tab.content}
              </Card>
            </TabsContent>)
        }
      </Tabs>
    )
}
