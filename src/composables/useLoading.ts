import { computed, reactive } from 'vue';

const state = reactive({
  loading: true,
});

const useLoading = () => {
  const setLoading = (payload: boolean) => {
    state.loading = payload;
  };

  const isLoading = computed(() => state.loading);

  return {
    isLoading,
    setLoading,
  };
};

export { useLoading };
