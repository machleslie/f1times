import axios from "axios";
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getdriversStatus(session_key) {
  try {
    const response = await axios.get(
      "https://api.openf1.org/v1/drivers?session_key=" + session_key
    );
    const driver_info = response.data.map((driver) => ({
      name_acronym: driver.name_acronym,
      team_colour: driver.team_colour,
      driver_number: driver.driver_number,
    }));

    return driver_info;
  } catch (error) {
    console.error("Error fetching drivers status:", error);
    throw error;
  }
}

async function getDriversPosition(driver_number, session_key) {
  try {
    await delay(500)
    const response = await axios.get(
      `https://api.openf1.org/v1/position?driver_number=${driver_number}&session_key=${session_key}`
    );
    const data = response.data;
    const lastData = data.length > 0 ? data[data.length - 1] : null;
    return lastData.position ;

  } catch (error) {
    console.error("Error fetching drivers position:", error);
    throw error;
  }
}

async function getDriversWithInterval(driver_number, session_key) {
  try {
    const response = await axios.get(
      `https://api.openf1.org/v1/intervals?session_key=${session_key}&driver_number=${driver_number}`
    );

    const data = response.data;
    const lastData = data.length > 0 ? data[data.length - 1] : null;
    return lastData.interval ;
  } catch (error) {
    console.error("Error fetching drivers with interval:", error);
    throw error;
  }
}

async function getDriversWithIntervalAndPosition(session_key) {
  try {
    const driverinfo = await getdriversStatus(session_key);
    console.log("Driver Info:", driverinfo);

        const combinedDriverData = [];


    // For each driver, fetch position and interval based on driver_number
     for (const driver of driverinfo) {
      const position = await getDriversPosition(driver.driver_number, session_key);

      const interval = await getDriversWithInterval(driver.driver_number, session_key);

      combinedDriverData.push({
        name_acronym: driver.name_acronym,
        team_colour: driver.team_colour,
        driver_number: driver.driver_number,
        position,
        interval,
      });
    }


    return {combinedDriverData};
  } catch (error) {
    console.error("Error fetching drivers with interval and position:", error);
    throw error;
  }
}

async function getSortedDriversWithIntervalAndPosition(
  driver_number,
  session_key
) {
  try {
    const { position, interval } = await getDriversWithIntervalAndPosition(
      driver_number,
      session_key
    );
    return {
      position,
      interval,
    };
  } catch (error) {
    console.error(
      "Error fetching sorted drivers with interval and position:",
      error
    );
    throw error;
  }
}

function getCurrentyear() {
  const date = new Date();
  return date.getFullYear();
}

function availableYears() {
  const currentYear = getCurrentyear();
  const years = [];
  for (let year = 2023; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
}

async function getMeetings(year) {
  try {
    const response = await axios.get(
      `https://api.openf1.org/v1/meetings?year=${year}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw error;
  }
}

async function getSession(meeting_key) {
  try {
    const response = await axios.get(
      `https://api.openf1.org/v1/sessions?meeting_key=${meeting_key}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
}

export {
  getdriversStatus,
  getDriversPosition,
  getDriversWithInterval,
  availableYears,
  getMeetings,
  getSession,
  getDriversWithIntervalAndPosition,
  getSortedDriversWithIntervalAndPosition,
};
