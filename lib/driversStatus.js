import axios from "axios";

async function getdriversStatus() {
  try {
    const response = await axios.get(
      "https://api.openf1.org/v1/drivers?meeting_key=latest"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers status:", error);
    throw error;
  }
}

async function getDriversPosition(driver_number) {
  try {
    const response = await axios.get(
      `https://api.openf1.org/v1/position?driver_number=${driver_number}&session_key=latest`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers position:", error);
    throw error;
  }
}

async function getDriversWithInterval(driver_number) {
  try {
    const response = await axios.get(
      `https://api.openf1.org/v1/intervals?session_key=latest&driver_number=${driver_number}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers with interval:", error);
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
};
