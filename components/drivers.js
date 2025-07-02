"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getdriversStatus,
  getDriversWithIntervalAndPosition,
} from "@/lib/driversStatus";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Drivers({ selectedSession }) {
  // const [drivers, setDrivers] = useState([]);

  // useEffect(() => {
  //   async function fetchDrivers() {
  //     try {
  //       console.log("data fetched");
  //       const data = await getDriversWithIntervalAndPosition(selectedSession);
  //       setDrivers(data);
  //     } catch (error) {
  //       console.error("Error fetching drivers:", error);
  //     }
  //   }

  //   if (selectedSession) {
  //     fetchDrivers();
  //   }
  // }, [selectedSession]);

  const { data } = useQuery({
    queryKey: ["drivers", selectedSession],
    queryFn: () => getDriversWithIntervalAndPosition(selectedSession),
    enabled: !!selectedSession,
  });
  const drivers = data?.combinedDriverData || [];
  console.log("Drivers data:", drivers);

  return (
    <div className="drivers-container  mx-5 w-full text-white border rounded-2xl p-4">
      <h1 className="text-xl ">Drivers</h1>
      <Table className={"text-white"}>
        <TableCaption>Drivers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-white"}>Position</TableHead>
            <TableHead className={"text-white"}>Team Color</TableHead>
            <TableHead className={"text-white"}>Driver</TableHead>
            <TableHead className={"text-white"}>Interval</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers &&
            drivers.map((driver, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="col-span-1 flex items-center gap-2">
                    <span className="text-lg font-bold">{driver.position}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `#${driver.team_colour}` }}
                  ></div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {driver.name_acronym}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-500">
                    {driver.interval ? `+${driver.interval}` : "LEADER"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
