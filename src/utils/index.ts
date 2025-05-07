import { LOCALE_CODES } from '@/constants/Locale';
import { TimetableStop } from '@/types/Timetable';
import { SortingOrder, SortingOrderKeys } from '@/types/Sorting';

const getUUID = () => Math.random().toString(16).slice(2);

const removeStopDuplicates = (stops: TimetableStop[]) => {
  return stops.reduce((acc: TimetableStop[], current) => {
    const found = acc.find((item) => item.stop === current.stop);
    return !found ? acc.concat([current]) : acc;
  }, []);
};

const sortStops = (
  stops: TimetableStop[],
  sortingOrder: SortingOrder = SortingOrderKeys.ASC,
  key: keyof TimetableStop,
) => {
  return stops.sort((a, b) => {
    return sortingOrder === SortingOrderKeys.DESC
      ? b[key].toString().localeCompare(a[key].toString(), LOCALE_CODES.POLISH)
      : a[key].toString().localeCompare(b[key].toString(), LOCALE_CODES.POLISH);
  });
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { getUUID, removeStopDuplicates, sortStops, sleep };
