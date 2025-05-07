interface TimetableStop {
  line: number;
  stop: string;
  order: number;
  time: string;
}

interface TimetableModuleState {
  stops: TimetableStop[];
  error: boolean;
  loading: boolean;
}

export { TimetableStop, TimetableModuleState };
