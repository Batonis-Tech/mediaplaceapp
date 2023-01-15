import moment from 'moment';

export const useMoment = (date: string) => {
  return moment(new Date(date)).format('DD.MM.YY');
};
