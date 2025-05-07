import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import AppInput from './AppInput.vue';

vi.mock('@/utils/', () => ({
  getUUID: vi.fn(() => 'test-uuid-123'),
}));

describe('AppInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders properly with default props', () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
      },
    });

    expect(wrapper.find('.app-input').exists()).toBe(true);
    expect(wrapper.find('.app-input__control').exists()).toBe(true);
    expect(wrapper.find('.app-input__placeholder').exists()).toBe(false);
    expect(wrapper.find('.app-input__icon').exists()).toBe(true);
  });

  it('renders placeholder when provided', () => {
    const placeholder = 'Test Placeholder';
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        placeholder,
      },
    });

    expect(wrapper.find('.app-input__placeholder').exists()).toBe(true);
    expect(wrapper.find('.app-input__placeholder').text()).toBe(placeholder);
  });

  it('applies active class to placeholder when input has value', () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: 'test value',
        placeholder: 'Test Placeholder',
      },
    });

    expect(wrapper.find('.app-input__placeholder--is-active').exists()).toBe(true);
  });

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('.app-input__control');
    await input.setValue('new value');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
  });

  it('emits onInput event when typing', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('.app-input__control');
    await input.trigger('input');

    expect(wrapper.emitted('onInput')).toBeTruthy();
  });

  it('renders icon slot content', () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
      },
      slots: {
        icon: '<span class="test-icon">Icon</span>',
      },
    });

    expect(wrapper.find('.test-icon').exists()).toBe(true);
    expect(wrapper.find('.test-icon').text()).toBe('Icon');
  });

  it('applies correct input type', () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        type: 'email',
      },
    });

    expect(wrapper.find('.app-input__control').attributes('type')).toBe('email');
  });

  it('uses mocked UUID for input and label', () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        placeholder: 'Test Placeholder',
      },
    });

    const inputId = wrapper.find('.app-input__control').attributes('id');
    const labelFor = wrapper.find('.app-input__placeholder').attributes('for');

    expect(inputId).toBe('test-uuid-123');
    expect(labelFor).toBe('test-uuid-123');
  });

  it('handles focus and blur events correctly', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: '',
        placeholder: 'Test Placeholder',
      },
    });

    const input = wrapper.find('.app-input__control');

    expect(wrapper.find('.app-input__placeholder--is-active').exists()).toBe(false);

    await input.trigger('focus');
    expect(wrapper.find('.app-input__placeholder--is-active').exists()).toBe(true);

    await input.trigger('blur');
    expect(wrapper.find('.app-input__placeholder--is-active').exists()).toBe(false);

    await input.setValue('test');
    await input.trigger('blur');

    await nextTick();
    expect(wrapper.find('.app-input__placeholder--is-active').exists()).toBe(false);
  });
});
