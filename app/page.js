import Drivers from "@/components/drivers";
import Racecharts from "@/components/Racecharts";
import Racestatus from "@/components/Racestatus";
import SelectRace from "@/components/Selectrace";
import {availableYears} from "@/lib/driversStatus"

export default function Home() {
  return (
    <div className="flex  flex-col gap-4">
      {/* <Racestatus /> */}<SelectRace  />
      <div className="bg-grey-700 flex flex-row ">
        <Drivers />
        <Racecharts />
      </div>
    </div>
  );
}
