import CONSTANTS from '../constants/constants';

export const convertTimestampToDate = dateTimestamp => {
  let dateLabel;
  const date = new Date(dateTimestamp);

  dateLabel = date.getDate() < 10 ? '0' : '';
  dateLabel += date.getDate() + '/';
  dateLabel += date.getMonth() + 1 < 10 ? '0' : '';
  dateLabel += date.getMonth() + 1 + '/';
  dateLabel += date.getFullYear();

  return dateLabel;
};

export const convertMilissecondsToHour = dateTimestamp => {
  const dateLabel = ((dateTimestamp + 1) / CONSTANTS.TIME.HOUR).toFixed(1);
  return dateLabel;
};

export const convertTimestampToHourMinute = dateTimestamp => {
  const hours = Math.floor(dateTimestamp / CONSTANTS.TIME.HOUR);
  const minutes = Math.round((dateTimestamp % CONSTANTS.TIME.HOUR) / CONSTANTS.TIME.MINUTE);

  return {
    hours,
    minutes
  };
};

export const convertTimestampToHourOfTheDay = dateTimestamp => {
  let dateLabel;

  if (dateTimestamp === null || dateTimestamp === undefined) {
    return;
  }

  const time = convertTimestampToHourMinute(dateTimestamp);
  if (isNaN(time.hours) || isNaN(time.minutes)) {
    return;
  }

  dateLabel = time.hours < 10 ? '0' : '';
  dateLabel += time.hours + ':';
  dateLabel += time.minutes < 10 ? '0' : '';
  dateLabel += time.minutes;

  return dateLabel;
};

/* Get Current Date in the format dd/mm/YYYY */
export const getShortDateNow = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${dd}/${mm}/${yyyy}`;
};
