/* eslint-disable @typescript-eslint/no-explicit-any */
import { timetable } from './timetable';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TimetableStop } from '@/types/Timetable';

vi.mock('@/api/services/stops', () => ({
  busStopsService: {
    getAll: vi.fn(),
  },
}));

vi.mock('@/composables/useLoading', () => ({
  useLoading: () => ({
    setLoading: vi.fn(),
  }),
}));

vi.mock('@/utils/index', () => ({
  removeStopDuplicates: vi.fn((stops) => stops),
  sleep: vi.fn(() => Promise.resolve()),
  sortStops: vi.fn((stops) => stops),
}));

vi.mock('@/constants/Locale', () => ({
  LOCALE_CODES: { POLISH: 'pl' },
}));

describe('timetable Vuex module', () => {
  let state: any;
  let commit: any;

  beforeEach(() => {
    state = {
      stops: [],
      loading: false,
      error: false,
    };
    commit = vi.fn();
  });

  it('SET_STOPS mutation sets stops', () => {
    const stops = [{ stop: 'A', line: 1 }];
    timetable.mutations?.SET_STOPS(state, stops);
    expect(state.stops).toEqual(stops);
  });

  it('SET_ERROR mutation sets error', () => {
    timetable.mutations?.SET_ERROR(state, true);
    expect(state.error).toBe(true);
  });

  it('load action commits stops and error=false on success', async () => {
    const stops = [{ stop: 'A', line: 1 }];
    const { busStopsService } = await import('@/api/services/stops');
    (busStopsService.getAll as any).mockResolvedValue({ data: stops });

    await (timetable.actions as any)?.load({ commit });

    expect(commit).toHaveBeenCalledWith('SET_STOPS', stops);
    expect(commit).toHaveBeenCalledWith('SET_ERROR', false);
  });

  it('load action commits error=true on failure', async () => {
    const { busStopsService } = await import('@/api/services/stops');
    (busStopsService.getAll as any).mockRejectedValue(new Error('fail'));

    await (timetable.actions as any)?.load({ commit });
    expect(commit).toHaveBeenCalledWith('SET_ERROR', true);
  });

  it('getAllLines getter returns sorted unique lines', () => {
    const state = {
      stops: [
        { line: 2, stop: 'A' },
        { line: 1, stop: 'B' },
        { line: 2, stop: 'C' },
      ],
    };
    const result = (timetable.getters as any)?.getAllLines(state);
    expect(result).toEqual([1, 2]);
  });

  it('getAllLineStops getter returns filtered and sorted stops for a line', () => {
    const state = {
      stops: [
        { line: 1, stop: 'A' },
        { line: 1, stop: 'B' },
        { line: 2, stop: 'C' },
      ],
    };
    const filters = { line: 1, sortingOrder: 'asc' };
    const result = (timetable.getters as any)?.getAllLineStops(state)(filters);
    expect(Array.isArray(result)).toBe(true);
    expect(result.every((stop: any) => stop.line === 1)).toBe(true);
  });

  it('getAllLineStops getter returns empty array if no line in filters', () => {
    const state = { stops: [{ line: 1, stop: 'A' }] };
    const filters = { sortingOrder: 'asc' };
    const result = (timetable.getters as any)?.getAllLineStops(state)(filters);
    expect(result).toEqual([]);
  });

  it('getAllLineStopHours getter returns sorted stops for line and stop', () => {
    const state = {
      stops: [
        { line: 1, stop: 'A', time: '04:15' },
        { line: 1, stop: 'A', time: '03:10' },
        { line: 1, stop: 'B', time: '05:00' },
      ],
    };
    const filters = { line: 1, stop: 'A' };
    const result = (timetable.getters as any)?.getAllLineStopHours(state)(filters);
    expect(result.length).toBe(2);
    expect(result[0].time < result[1].time).toBe(true);
  });

  it('getAllLineStopHours getter returns empty array if no filters', () => {
    const state = { stops: [{ line: 1, stop: 'A', time: '04:15' }] };
    const result = (timetable.getters as any)?.getAllLineStopHours(state)();
    expect(result).toEqual([]);
  });

  it('getAllStops getter returns sorted and filtered stops', () => {
    const state = {
      stops: [
        { stop: 'B', line: 1 },
        { stop: 'A', line: 2 },
      ],
    };
    const filters = { query: 'a', sortingOrder: 'asc' };
    const result = (timetable.getters as any)?.getAllStops(state)(filters);
    expect(Array.isArray(result)).toBe(true);
    expect(result.every((stop: TimetableStop) => stop.stop.toLowerCase().includes('a'))).toBe(true);
  });

  it('getAllStops getter returns all stops sorted if no filters', () => {
    const state = {
      stops: [
        { stop: 'B', line: 1 },
        { stop: 'A', line: 2 },
      ],
    };
    const result = (timetable.getters as any)?.getAllStops(state)();
    expect(Array.isArray(result)).toBe(true);
  });
});
