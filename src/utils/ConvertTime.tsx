export const ConvertTime = (milliseconds: number) => {
  const currentUnixTimeInSeconds = Math.floor(Date.now() / 1000);
  const elapsedSeconds = currentUnixTimeInSeconds - milliseconds;

  const elapsedDateTime = new Date(elapsedSeconds * 1000);
  const elapsedHours = elapsedDateTime.getUTCHours();
  const elapsedMinutes = elapsedDateTime.getUTCMinutes();
  const elapsedSecondsOnly = elapsedDateTime.getUTCSeconds();

  const formatTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  return `${formatTwoDigits(elapsedHours)}:${formatTwoDigits(elapsedMinutes)}:${formatTwoDigits(elapsedSecondsOnly)}`;
};

export const secondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};