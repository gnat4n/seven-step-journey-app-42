
import { User } from '@/types';

const demoData = {
  user: {
    id: 'demo-user-id',
    email: 'demo@7steps.com',
    name: 'Usuária Demo',
    xp_total: 50,
    current_step: 1,
    avatar_status: 1,
    is_admin: false,
    created_at: new Date().toISOString(),
  } as User,
};

export default demoData;
