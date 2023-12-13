import { useState } from "react";
import axios from "axios";
import { storedActiveTabKey } from "../hooks";

interface FetchDataResult {
  fetchDisasterData: any;
  greetingFiles: any;
  greetingSettings: any;
  error: string | null;
}

const useFetchGreeting = (): FetchDataResult => {
  const [greetingFiles, setGreetingFiles] = useState<any>(null);
  const [greetingSettings, setGreetingSettings] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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

  return {
    fetchDisasterData,
    greetingFiles,
    greetingSettings,
    error,
  };
};

export { useFetchGreeting };
