"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/utils/db";
import { desc, eq } from "drizzle-orm";
import { AIOutput } from "@/utils/schema";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { TEMPLATE } from "../_components/TemplateListSection";
import { useUser } from "@clerk/nextjs";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

function History() {
  const { user } = useUser();
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedItemId, setCopiedItemId] = useState<number | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      const userEmail = user.primaryEmailAddress.emailAddress;

      try {
        const fetchedHistory = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, userEmail))
          .orderBy(desc(AIOutput.id));

        setHistoryList(fetchedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  // Helper function to get template data
  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | undefined = Templates?.find(
      (item) => item.slug === slug
    );
    return template || { name: "Unknown", icon: "/default-icon.png" }; // Fallback for undefined
  };

  const handleCopy = (item:HISTORY) =>{
    if(item.aiResponse){
      navigator.clipboard.writeText(item.aiResponse);
      setCopiedItemId(item.id);
      setTimeout(()=>{
        setCopiedItemId(null)
      }, 2000);
    }
  }

  if (loading) return <p>Loading history...</p>;

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated AI content</p>

      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESPONSE</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>

      {historyList.length === 0 ? (
        <p className="text-gray-600 mt-4">No history found.</p>
      ) : (
        historyList.map((item: HISTORY, index: number) => (
          <div
            className="grid grid-cols-7 my-5 py-3 px-3 border-b"
            key={index}
          >
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image
                src={GetTemplateName(item?.templateSlug)?.icon || "/default-icon.png"}
                alt="Template Icon"
                width={25}
                height={25}
              />
              {GetTemplateName(item.templateSlug)?.name}
            </h2>
            <h2 className="col-span-2 line-clamp-3">{item?.aiResponse ?? "No Response"}</h2>

            {/* Format date using moment.js */}
            <h2>{item?.createdAt ? moment().format('DD/MM/YYYY') : "Unknown Date"}</h2>

            <h2>{item?.aiResponse?.length || 0}</h2>
            <Button
                variant="ghost"
                className="text-primary"
                onClick={() => handleCopy(item)}
              >
                {copiedItemId === item.id ? "Copied!" : "Copy"}
              </Button>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
