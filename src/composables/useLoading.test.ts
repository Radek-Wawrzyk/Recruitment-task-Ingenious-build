import { describe, it, expect } from 'vitest';
import { useLoading } from './useLoading';
import { Ref } from 'vue';

const getValue = (computedRef: Ref<boolean>) => computedRef.value;

describe('useLoading composable', () => {
  it('returns isLoading as true by default', () => {
    const { isLoading } = useLoading();
    expect(getValue(isLoading)).toBe(true);
  });

  it('setLoading changes isLoading value', () => {
    const { isLoading, setLoading } = useLoading();
    setLoading(false);
    expect(getValue(isLoading)).toBe(false);
    setLoading(true);
    expect(getValue(isLoading)).toBe(true);
  });

  it('is reactive between multiple calls', () => {
    const { setLoading } = useLoading();
    const { isLoading } = useLoading();
    setLoading(false);
    expect(isLoading.value).toBe(false);
    setLoading(true);
    expect(isLoading.value).toBe(true);
  });
});
