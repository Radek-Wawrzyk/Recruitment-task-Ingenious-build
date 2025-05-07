import { SortingOrder } from '@/types/Sorting';

interface FiltersSettings {
  query?: string;
  sortingOrder?: SortingOrder;
}

interface FiltersLinesSettings extends FiltersSettings {
  stop: string;
  line: number;
}

export { FiltersSettings, FiltersLinesSettings };
