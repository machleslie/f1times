"use client";
import { useEffect, useState } from "react";

export default function Racestatus() {
  const [safetycar, setSafetycar] = useState(false);
  const [DRS, setDRS] = useState(false);
  const [virtualSafetyCar, setVirtualSafetyCar] = useState(false);
  const [redFlag, setRedFlag] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("Live");
  const [cheakerdFlag, setCheakerFlag] = useState(false);
  const weatherconditions = [
    {
      air_temperature: 27.8,
      date: "2023-05-07T18:42:25.233000+00:00",
      humidity: 58,
      pressure: 1018.7,
      rainfall: 0,
      track_temperature: 52.5,
      wind_direction: 136,
      wind_speed: 2.4,
    },
  ];

  const racecontrol = [
    {
      meeting_key: 1262,
      session_key: 9971,
      date: "2025-06-01T14:28:21+00:00",
      driver_number: null,
      lap_number: 60,
      category: "Flag",
      flag: "CLEAR",
      scope: "Track",
      sector: null,
      message: "TRACK CLEAR",
    },
  ];

  useEffect(() => {
    const safetyCarEvent = racecontrol.find(
      (event) => event.message === "SAFETY CAR DEPLOYED"
    );
    if (safetyCarEvent) {
      setSafetycar(true);
      setSessionStatus("Safety Car");
    }

    const drsEvent = racecontrol.find(
      (event) => event.message === "DRS ENABLED"
    );
    if (drsEvent) {
      setDRS(true);
    }

    const virtualSafetyCarEvent = racecontrol.find(
      (event) => event.message === "VIRTUAL SAFETY CAR"
    );
    if (virtualSafetyCarEvent) {
      setVirtualSafetyCar(true);
      setSessionStatus("Virtual Safety Car");
    }

    const redFlagEvent = racecontrol.find(
      (event) => event.message === "RED FLAG"
    );
    if (redFlagEvent) {
      setRedFlag(true);
      setSessionStatus("Red Flag");
    }

    const trackClearEvent = racecontrol.find(
      (event) => event.message === "TRACK CLEAR"
    );
    if (trackClearEvent) {
      setSafetycar(false);
      setDRS(false);
      setVirtualSafetyCar(false);
      setRedFlag(false);
      setSessionStatus("Live");
    }
    const cheakerFlagEvent = racecontrol.find(
      (event) => event.message === "CHEQUERED FLAG"
    );
    if (cheakerFlagEvent) {
      setCheakerFlag(true);
      setSessionStatus("Chequered Flag");
    }
  }, [racecontrol]);

  return (
    <div className="racestatus-container mx-5 w-full flex flex-row gap-4 ">
      <div className="weatherconditions bg-gray-800/50 p-4 rounded-lg text-white">
        <h1 className="text-lg font-semibold text-center text-slate-400">
          Weather Conditions
        </h1>
        {weatherconditions.map((condition, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <div className="flex flex-col justify-center items-center bg-slate-500 p-2 rounded-lg">
              <p className="text-slate-800 font-semibold">Temperature </p>
              <span>{condition.air_temperature}°C</span>
            </div>
            <div className="flex flex-col justify-center items-center bg-slate-500 p-2 rounded-lg">
              <p className="text-slate-800 font-semibold">Humidity </p>
              <span>{condition.humidity}%</span>
            </div>
            <div className="flex flex-col justify-center items-center bg-slate-500 p-2 rounded-lg">
              <p className="text-slate-800 font-semibold">Wind Speed </p>
              <span>{condition.wind_speed} m/s</span>
            </div>
          </div>
        ))}
      </div>

      <div className="racecontrol">
        <h2 className="text-lg font-semibold text-slate-400">
          Race Control Message
        </h2>
        {racecontrol.map((race, index) => (
          <div
            key={index}
            className="bg-gray-800/50 p-4 rounded-lg text-white mb-4 flex flex-col-3 gap-2"
          >
            <div className="flex flex-col justify-center items-center bg-slate-500 p-2 rounded-lg w-30">
              <p className="text-slate-800 font-semibold">Lap </p>
              <span>{race.lap_number}</span>
            </div>
            <div className="flex flex-col justify-center items-center bg-slate-500 p-2 rounded-lg w-30">
              <p className="text-slate-800 font-semibold">DRS </p>
              <span>{DRS ? "Enabled" : "Disabled"}</span>
            </div>
            <div className="flex flex-col justify-center items-center bg-slate-500 p-2 rounded-lg">
              <p className="text-slate-800 font-semibold">Session Status </p>
              <span>{sessionStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
