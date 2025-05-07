import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppBadge from './AppBadge.vue';

describe('AppBadge', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(AppBadge, {
      slots: {
        default: 'Test Badge',
      },
    });

    expect(wrapper.find('.app-badge').exists()).toBe(true);
    expect(wrapper.find('.app-badge__button').exists()).toBe(true);
    expect(wrapper.text()).toBe('Test Badge');
    expect(wrapper.find('.app-badge__button--is-active').exists()).toBe(false);
  });

  it('applies active class when isActive prop is true', () => {
    const wrapper = mount(AppBadge, {
      props: {
        isActive: true,
      },
      slots: {
        default: 'Active Badge',
      },
    });

    expect(wrapper.find('.app-badge__button--is-active').exists()).toBe(true);
  });

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(AppBadge, {
      slots: {
        default: 'Clickable Badge',
      },
    });

    await wrapper.find('.app-badge__button').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('renders slot content correctly', () => {
    const slotContent = 'Custom Badge Content';
    const wrapper = mount(AppBadge, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.text()).toBe(slotContent);
  });
});
