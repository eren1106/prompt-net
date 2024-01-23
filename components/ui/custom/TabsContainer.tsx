import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface TabsContainerProp {
  tabs: ITabProp[];
}

interface ITabProp {
  value: string;
  title: string;
  content: ReactNode;
}

export const TabsContainer = ({ tabs }: TabsContainerProp) => {
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
