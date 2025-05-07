import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import AppLoader from './AppLoader.vue';
import { useLoading } from '@/composables/useLoading';

describe('AppLoader', () => {
  it('does not render loader when isLoading is false', () => {
    const { setLoading } = useLoading();
    setLoading(false);

    const wrapper = mount(AppLoader);
    expect(wrapper.find('.app-loader').exists()).toBe(false);
  });

  it('renders loader when isLoading is true', async () => {
    const { setLoading } = useLoading();
    setLoading(true);

    const wrapper = mount(AppLoader);
    await nextTick();

    expect(wrapper.find('.app-loader').exists()).toBe(true);
    expect(wrapper.find('.app-loader__spinner').exists()).toBe(true);
    expect(wrapper.find('.app-loader__text').text()).toBe('Loading...');
  });
});
