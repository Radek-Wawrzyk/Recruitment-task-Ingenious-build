import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBusStops } from './useBusStops';

vi.mock('vuex', () => ({
  useStore: () => ({
    getters: {
      'timetable/getAllStops': vi.fn(() => [
        { stop: 'A', line: 1 },
        { stop: 'B', line: 2 },
      ]),
    },
  }),
}));

vi.mock('@/utils/index', () => ({
  getUUID: vi.fn(() => 'uuid-mock'),
}));

describe('useBusStops composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns stops from store getter', () => {
    const { stops } = useBusStops();
    expect(Array.isArray(stops.value)).toBe(true);
    expect(stops.value.length).toBe(2);
    expect(stops.value[0].stop).toBe('A');
  });

  it('returns tableStops with uuid keys and correct values', () => {
    const { tableStops } = useBusStops();
    expect(Array.isArray(tableStops.value)).toBe(true);
    expect(tableStops.value.length).toBe(2);
    expect(tableStops.value[0].key).toBe('uuid-mock');
    expect(tableStops.value[0].value).toBe('A');
    expect(tableStops.value[0].data).toEqual({ stop: 'A', line: 1 });
  });

  it('filters is a ref with default values', () => {
    const { filters } = useBusStops();
    expect(filters.value.query).toBe('');
    expect(filters.value.sortingOrder).toBe('asc');
  });

  it('setSortingOrder updates sortingOrder in filters', () => {
    const { filters, setSortingOrder } = useBusStops();
    setSortingOrder('desc');
    expect(filters.value.sortingOrder).toBe('desc');
    setSortingOrder('asc');
    expect(filters.value.sortingOrder).toBe('asc');
  });
});
