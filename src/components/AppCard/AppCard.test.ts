import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppCard from './AppCard.vue';

describe('AppCard', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(AppCard, {
      slots: {
        default: 'Card Content',
      },
    });

    expect(wrapper.find('.app-card').exists()).toBe(true);
    expect(wrapper.find('.app-card__title').exists()).toBe(false);
    expect(wrapper.find('.app-card__content').exists()).toBe(true);
    expect(wrapper.text()).toBe('Card Content');
  });

  it('renders title when provided', () => {
    const title = 'Test Title';
    const wrapper = mount(AppCard, {
      props: {
        title,
      },
      slots: {
        default: 'Card Content',
      },
    });

    expect(wrapper.find('.app-card__title').exists()).toBe(true);
    expect(wrapper.find('.app-card__title').text()).toBe(title);
  });

  it('applies no-padding class when noPaddingContent is true', () => {
    const wrapper = mount(AppCard, {
      props: {
        noPaddingContent: true,
      },
      slots: {
        default: 'Card Content',
      },
    });

    expect(wrapper.find('.app-card__content--no-padding').exists()).toBe(true);
  });

  it('does not apply no-padding class when noPaddingContent is false', () => {
    const wrapper = mount(AppCard, {
      props: {
        noPaddingContent: false,
      },
      slots: {
        default: 'Card Content',
      },
    });

    expect(wrapper.find('.app-card__content--no-padding').exists()).toBe(false);
  });

  it('renders slot content correctly', () => {
    const slotContent = 'Custom Card Content';
    const wrapper = mount(AppCard, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.find('.app-card__content').text()).toBe(slotContent);
  });

  it('renders both title and content correctly', () => {
    const title = 'Card Title';
    const content = 'Card Content';
    const wrapper = mount(AppCard, {
      props: {
        title,
      },
      slots: {
        default: content,
      },
    });

    expect(wrapper.find('.app-card__title').text()).toBe(title);
    expect(wrapper.find('.app-card__content').text()).toBe(content);
  });
});
