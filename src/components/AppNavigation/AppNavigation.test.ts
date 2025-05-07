import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AppNavigation from './AppNavigation.vue';

// Mock ROUTING_NAVIGATION
vi.mock('@/constants/Routing', () => ({
  ROUTING_NAVIGATION: [
    { name: 'home', label: 'Home' },
    { name: 'about', label: 'About' },
  ],
}));

// Mock router-link globally
const global = {
  stubs: {
    'router-link': {
      template: '<a><slot /></a>',
      props: ['to'],
    },
  },
};

describe('AppNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation links from ROUTING_NAVIGATION', () => {
    const wrapper = mount(AppNavigation, { global });
    const items = wrapper.findAll('.app-navigation__item');
    expect(items.length).toBe(2);
    expect(items[0].text()).toBe('Home');
    expect(items[1].text()).toBe('About');
  });
});
