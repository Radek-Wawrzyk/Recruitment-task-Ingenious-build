import { describe, it, expect } from 'vitest';
import { getUUID, removeStopDuplicates, sortStops, sleep } from './index';
import { TimetableStop } from '@/types/Timetable';

describe('utils', () => {
  it('getUUID returns a string', () => {
    const uuid = getUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBeGreaterThan(0);
  });

  it('removeStopDuplicates removes duplicates by stop', () => {
    const stops: TimetableStop[] = [
      { stop: 'A', line: 1, order: 1, time: '04:35' },
      { stop: 'B', line: 2, order: 2, time: '04:45' },
      { stop: 'A', line: 3, order: 3, time: '04:55' },
    ];
    const result = removeStopDuplicates(stops);
    expect(result.length).toBe(2);
    expect(result.some((s: TimetableStop) => s.stop === 'A')).toBe(true);
    expect(result.some((s: TimetableStop) => s.stop === 'B')).toBe(true);
  });

  it('sortStops sorts ascending by default', () => {
    const stops: TimetableStop[] = [
      { stop: 'B', line: 2, order: 1, time: '04:35' },
      { stop: 'A', line: 1, order: 2, time: '04:45' },
    ];

    const result = sortStops([...stops], 'asc', 'stop');
    expect(result[0].stop).toBe('A');
    expect(result[1].stop).toBe('B');
  });

  it('sortStops sorts descending', () => {
    const stops: TimetableStop[] = [
      { stop: 'A', line: 1, order: 1, time: '04:35' },
      { stop: 'B', line: 2, order: 2, time: '04:45' },
    ];

    const result = sortStops([...stops], 'desc', 'stop');
    expect(result[0].stop).toBe('B');
    expect(result[1].stop).toBe('A');
  });

  it('sleep resolves after given ms', async () => {
    const start = Date.now();
    await sleep(50);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(50);
  });
});
