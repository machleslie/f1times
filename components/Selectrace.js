"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { availableYears, getMeetings, getSession } from "@/lib/driversStatus";

export default function SelectRace({selectedSession, setSelectedSession}) {
  const [selectedYear, setSelectedYear] = useState(null);
  const years = availableYears();
  const [meetings, setMeetings] = useState();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    async function fetchMeetings() {
      try {
        const data = await getMeetings(selectedYear);
        setMeetings(data);
        setSelectedEvent(""); // Reset selected event when year changes
      } catch (error) {
        console.error("Failed to load meetings", error);
      }
    }

    fetchMeetings();
    // console.log("Selected Year:", selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    async function fetchSessions() {
      if (selectedEvent) {
        try {
        console.log("data fetched")
          const data = await getSession(selectedEvent);
          setSessions(data);
          setSelectedSession(""); // Reset selected session when event changes
        } catch (error) {
          console.error("Failed to load sessions", error);
        }
      }
    }
    fetchSessions();
    // console.log("Selected Event:", selectedEvent);
  }, [selectedEvent,setSelectedSession]);

  // console.log("Selected Session:", selectedSession);
  // console.log("events:", meetings);
  // console.log("Available Years:", selectedYear);
  return (
    <div className="text-white">
      <div className="text-white">
        <Select
          onValueChange={(value) => setSelectedYear(value)}
          value={selectedYear || undefined}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select the year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="">
        <Select
          disabled={!selectedYear}
          value={selectedEvent || undefined}
          onValueChange={setSelectedEvent}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select the event" />
          </SelectTrigger>
          <SelectContent>
            {selectedYear &&
              meetings.map((events, id) => (
                <SelectItem key={id} value={String(events.meeting_key)}>
                  {events.meeting_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="">{selectedEvent}</div>
      <div className="">
        <Select
          disabled={!selectedEvent}
          value={selectedSession || undefined}
          onValueChange={setSelectedSession}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select the session" />
          </SelectTrigger>
          <SelectContent>
            {selectedEvent &&
              sessions.map((session, id) => (
                <SelectItem key={id} value={String(session.session_key)}>
                  {session.session_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
