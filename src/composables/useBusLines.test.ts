import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBusLines } from './useBusLines';

vi.mock('vuex', () => ({
  useStore: () => ({
    getters: {
      'timetable/getAllLines': [1, 2],
      'timetable/getAllLineStops': vi.fn(() => [
        { stop: 'A', line: 1, time: '04:00' },
        { stop: 'B', line: 1, time: '04:10' },
      ]),
      'timetable/getAllLineStopHours': vi.fn(() => [
        { stop: 'A', line: 1, time: '04:00' },
        { stop: 'A', line: 1, time: '04:10' },
      ]),
    },
  }),
}));

vi.mock('@/utils/', () => ({
  getUUID: vi.fn(() => 'uuid-mock'),
}));

describe('useBusLines composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns lines from store getter', () => {
    const { lines } = useBusLines();
    expect(Array.isArray(lines.value)).toBe(true);
    expect(lines.value).toEqual([1, 2]);
  });

  it('hasLines is true if lines exist', () => {
    const { hasLines } = useBusLines();
    expect(hasLines.value).toBe(true);
  });

  it('getSelectedLineStops returns stops for active line', () => {
    const { getSelectedLineStops } = useBusLines();
    expect(Array.isArray(getSelectedLineStops.value)).toBe(true);
    expect(getSelectedLineStops.value.length).toBe(2);
  });

  it('getActiveStops returns stops for active stop', () => {
    const { getActiveStops } = useBusLines();
    expect(Array.isArray(getActiveStops.value)).toBe(true);
    expect(getActiveStops.value.length).toBe(2);
  });

  it('tableStopsRows returns mapped stops', () => {
    const { tableStopsRows } = useBusLines();
    expect(Array.isArray(tableStopsRows.value)).toBe(true);
    expect(tableStopsRows.value[0].key).toBe('A');
    expect(tableStopsRows.value[0].value).toBe('A');
  });

  it('tableActiveStopsRows returns mapped active stops with uuid keys', () => {
    const { tableActiveStopsRows } = useBusLines();
    expect(Array.isArray(tableActiveStopsRows.value)).toBe(true);
    expect(tableActiveStopsRows.value[0].key).toBe('uuid-mock');
    expect(tableActiveStopsRows.value[0].value).toBe('04:00');
  });

  it('setActiveLine sets activeLine and resets activeStop', () => {
    const { activeLine, activeStop, setActiveLine } = useBusLines();
    activeStop.value = { stop: 'A', line: 1, order: 1, time: '04:00' };
    setActiveLine(2);
    expect(activeLine.value).toBe(2);
    expect(activeStop.value).toBe(null);
  });

  it('setActiveStop sets activeStop', () => {
    const { activeStop, setActiveStop } = useBusLines();
    setActiveStop({
      data: { stop: 'B', line: 1, time: '04:10', order: 1 },
      key: 'uuid-mock',
      value: '04:10',
    });
    expect(activeStop.value).toEqual({ stop: 'B', line: 1, time: '04:10', order: 1 });
  });

  it('setSortingOrder updates sortingOrder in filters', () => {
    const { filters, setSortingOrder } = useBusLines();
    setSortingOrder('desc');
    expect(filters.value.sortingOrder).toBe('desc');
    setSortingOrder('asc');
    expect(filters.value.sortingOrder).toBe('asc');
  });

  it('getActiveLineText and getActiveStopText return correct strings', () => {
    const { activeLine, activeStop, getActiveLineText, getActiveStopText } = useBusLines();
    activeLine.value = 5;
    activeStop.value = { stop: 'C', line: 5, order: 1, time: '05:00' };
    expect(getActiveLineText.value).toBe('Bus Line: 5');
    expect(getActiveStopText.value).toBe('Bus Stop: C');
  });
});
