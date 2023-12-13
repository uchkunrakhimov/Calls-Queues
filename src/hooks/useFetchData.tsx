import { useEffect, useState } from "react";
import axios from "axios";
import { storedActiveTabKey } from "../hooks";

interface FetchDataResult {
  allQueueData: any;
  fetchDisasterData: any;
  greetingFiles: any;
  greetingSettings: any;
  error: string | null;
}

const useFetchData = (): FetchDataResult => {
  const [allQueueData, setAllQueueData] = useState<any>(null);
  const [greetingFiles, setGreetingFiles] = useState<any>(null);
  const [greetingSettings, setGreetingSettings] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all queue data from the main API
  const fetchAllQueueData = () => {
    axios
      .get(import.meta.env.VITE_API_URL)
      .then((res: any) => {
        setAllQueueData(res.data.data);
      })
      .catch((err: any) => {
        setError(err.message);
      });
  };

  // Function to fetch disaster data based on the active tab key
  const fetchDisasterData = () => {
    axios
      .get(import.meta.env.VITE_GREETINGS_API_URL + storedActiveTabKey)
      .then((res: any) => {
        const { greetingFiles, greetingSettings } = res.data.data;
        greetingFiles
          ? setGreetingFiles(greetingFiles)
          : setGreetingSettings(greetingSettings);
      })
      .catch((err: any) => {
        setError(err.message);
      });
  };

  // Effect to fetch all queue data initially and set up periodic fetching
  useEffect(() => {
    fetchAllQueueData();
    const intervalId = setInterval(() => {
      fetchAllQueueData();
    }, 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Effect to fetch greeting and disaster data when the active tab key changes
  useEffect(() => {
    fetchDisasterData();
  }, [storedActiveTabKey]);

  return {
    allQueueData,
    fetchDisasterData,
    greetingFiles,
    greetingSettings,
    error,
  };
};

export { useFetchData };
