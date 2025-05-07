import { TimetableStop } from '@/types/Timetable';
import { client } from '@/api';

const busStopsService = {
  getAll: () => {
    return client.get<TimetableStop[]>('/stops');
  },
};

export { busStopsService };
