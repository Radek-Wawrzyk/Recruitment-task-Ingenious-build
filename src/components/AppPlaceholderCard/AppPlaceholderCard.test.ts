import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppPlaceholderCard from './AppPlaceholderCard.vue';

describe('AppPlaceholderCard', () => {
  it('renders placeholder content when hasContent is false', () => {
    const wrapper = mount(AppPlaceholderCard, {
      props: {
        placeholder: 'Brak danych',
        hasContent: false,
      },
    });
    expect(wrapper.find('.app-placeholder-card__holder').exists()).toBe(true);
    expect(wrapper.find('.app-placeholder-card__holder-image').exists()).toBe(true);
    expect(wrapper.find('.app-placeholder-card__content-title').text()).toBe('Brak danych');
  });

  it('renders slot content when hasContent is true', () => {
    const wrapper = mount(AppPlaceholderCard, {
      props: {
        placeholder: 'Nie powinno być widoczne',
        hasContent: true,
      },
      slots: {
        default: '<div class="test-slot">Slot Content</div>',
      },
    });
    expect(wrapper.find('.app-placeholder-card__holder').exists()).toBe(false);
    expect(wrapper.find('.test-slot').exists()).toBe(true);
    expect(wrapper.find('.test-slot').text()).toBe('Slot Content');
  });
});
