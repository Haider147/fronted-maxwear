import { api } from '@/lib/api';
import type { RefreshResponse } from '@/lib/auth';

export async function refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
  return api<RefreshResponse>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}
