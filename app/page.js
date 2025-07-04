"use client";
import Drivers from "@/components/drivers";
import Racecharts from "@/components/Racecharts";
import Racestatus from "@/components/Racestatus";
import SelectRace from "@/components/Selectrace";
import { availableYears } from "@/lib/driversStatus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex  flex-col gap-4">
        <SelectRace
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
        />
        <div className="bg-grey-700 flex flex-row ">
          <Drivers
            selectedSession={selectedSession}
            setselectedDriver={setSelectedDriver}
          />
          <Racecharts
            selectedSession={selectedSession}
            driver_number={selectedDriver}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
}
