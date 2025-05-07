<template>
  <div class="app-input">
    <div class="app-input__content">
      <label
        :for="name"
        class="app-input__placeholder"
        :class="{ 'app-input__placeholder--is-active': isActive }"
        v-if="placeholder"
      >
        {{ placeholder }}
      </label>

      <input
        :type="type"
        :id="name"
        class="app-input__control"
        :value="modelValue"
        @input="onInput($event)"
        @focus="focused = true"
        @blur="focused = modelValue !== ''"
      />

      <div class="app-input__icon">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputHTMLAttributes, defineProps, defineEmits, withDefaults, ref, computed } from 'vue';
import { getUUID } from '@/utils/';

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'onInput', event: Event): void;
}>();

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    name?: string;
    type?: InputHTMLAttributes['type'];
    label?: string;
    placeholder?: string;
  }>(),
  {
    modelValue: '',
    name: getUUID(),
    type: 'text',
    label: '',
    placeholder: '',
  },
);

const focused = ref(false);
const isActive = computed(() => focused.value || props.modelValue !== '');

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits('onInput', event);
  emits('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped src="./AppInput.scss" />
