"use client";
import React, { useContext, useEffect } from "react";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { AIOutput } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import { HISTORY } from "../history/page";

const UsageTracker = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetData();
    }
  }, [user]);

  const GetData = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error("User email is undefined.");
      setTotalUsage(0);
      return;
    }

    try {
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, email || ""))
      if (result.length > 0) {
        GetTotalUsage(result);
      } else {
        setTotalUsage(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total: number = 0;
    result.forEach((element) => {
      total += Number(element.aiResponse?.length || 0);
    });
    setTotalUsage(total);
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(totalUsage / 10000) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/10,000 Credit Used</h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTracker;
