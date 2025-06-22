import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TimeTable({ laptime }) {
  return (
    <div className="overflow-x-auto w-full mt-6">
  <div className=" border rounded-2xl overflow-hidden">
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left text-white">Metric</TableHead>
          {laptime.map((item, index) => (
            <TableHead key={index} className="px-4 py-2 text-white">Lap {item.lap_number}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-2 text-left font-medium">Lap Duration (s)</TableCell>
          {laptime.map((item, index) => (
            <TableCell key={index} className="px-4 py-2">{item.lap_duration}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  </div>
</div>

  )
}
