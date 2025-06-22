import axios from "axios";
export async function getWeatherconditions() {
    try {
        const response = await axios.get("https://api.openf1.org/v1/weather?session_key=latest");
        return response.data;
    } catch (error) {
        console.error("Error fetching weather conditions:", error);
        throw error;
    }
}
export async function getLatestRaceControl() {
    try {
        const response = await axios.get("https://api.openf1.org/v1/race_control?session_key=latest");
        return response.data;
    } catch (error) {
        console.error("Error fetching latest race control:", error);
        throw error;
    }
}
export async function getDRSStatus() {
  try {
    const response = await axios.get("https://api.openf1.org/v1/race_control?category=Drs&session_key=latest");
    const data = response.data;
    if (!data || data.length === 0) {
      console.log("No DRS status data available.");
      return null;
    }

    const lastEntry = data[data.length - 1]; 

    console.log("Latest DRS Status:");
    console.log(`Message: ${lastEntry.message}`);
    

    return lastEntry;
  } catch (error) {
    console.error("Failed to get DRS status:", error);
  }
}