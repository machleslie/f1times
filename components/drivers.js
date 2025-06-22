import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default function Drivers() {
  const drivers = [{
    broadcast_name: "M VERSTAPPEN",
    country_code: "NED",
    driver_number: 1,
    first_name: "Max",
    full_name: "Max VERSTAPPEN",
    headshot_url:
      "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png",
    last_name: "Verstappen",
    meeting_key: 1219,
    name_acronym: "VER",
    session_key: 9158,
    team_colour: "3671C6",
    team_name: "Red Bull Racing",
    position: 2,
    interval: 0.003,
  }];
  return (
    <div className="drivers-container  mx-5 w-full text-white border rounded-2xl p-4"> 
      <h1 className="text-xl ">Drivers</h1>
      <Table className={"text-white"}>
        <TableCaption>Drivers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={'text-white'}>Position</TableHead>
            <TableHead className={'text-white'}>Team Color</TableHead>
            <TableHead className={'text-white'}>Driver</TableHead>
            <TableHead className={'text-white'}>Interval</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver, index) => (
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
                  
                  <span className="text-lg font-bold">{driver.name_acronym}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-500">
                  {driver.interval ? `+${driver.interval}` : 'LEADER'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    
    </div>
  );
}
