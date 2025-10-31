/**
 * React Query hooks for Hydra Episode API (Client-side)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hydra } from '@/lib/hydra-client';

export function useEpisode(slug: string, no: number, enabled = true) {
  return useQuery({
    queryKey: ['episode', slug, no],
    queryFn: () => hydra.episode.getBySlugAndNo(slug, no),
    enabled: enabled && !!slug && !!no,
  });
}

export function useRecordEpisodeView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, no }: { slug: string; no: number }) =>
      hydra.episode.recordView(slug, no),
    onSuccess: (_, { slug, no }) => {
      queryClient.invalidateQueries({ queryKey: ['episode', slug, no] });
    },
  });
}

