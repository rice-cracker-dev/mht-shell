import { Variable } from 'astal';

export const time = Variable<Date>(new Date()).poll(
  1000,
  ['date', '+%s'],
  (t) => new Date(Number(t) * 1000)
);

export const formatTime = (time: Date): string => {
  const intl = new Intl.DateTimeFormat(undefined, {
    hour12: false,
    second: undefined,
    hour: '2-digit',
    minute: '2-digit',
    dateStyle: undefined
  });

  return intl.format(time)
}
