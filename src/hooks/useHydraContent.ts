/**
 * React Query hooks for Hydra API (Client-side)
 * Using axios client directly for client-side calls
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hydra } from '@/lib/hydra-client';
import type { ContentListRequest } from '@/schemas';

// Note: These hooks use axios which works in both server and client
// But should primarily be used in client components

export function useContentList(params?: Partial<ContentListRequest>) {
  const defaultParams: ContentListRequest = {
    page: 1,
    limit: 20,
    sort: 'relevance',
  };
  
  const finalParams = { ...defaultParams, ...params };
  
  return useQuery({
    queryKey: ['content', 'list', finalParams],
    queryFn: () => hydra.content.list(finalParams),
  });
}

export function useContentDetail(slug: string, enabled = true) {
  return useQuery({
    queryKey: ['content', 'detail', slug],
    queryFn: () => hydra.content.getBySlug(slug),
    enabled: enabled && !!slug,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => hydra.genre.list(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useRecordView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => hydra.content.recordView(slug),
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: ['content', 'detail', slug] });
    },
  });
}

export function useRecordStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, rating }: { slug: string; rating: number }) => 
      hydra.content.recordStar(slug, rating),
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries({ queryKey: ['content', 'detail', slug] });
    },
  });
}

export function useRecordBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => hydra.content.recordBookmark(slug),
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: ['content', 'detail', slug] });
    },
  });
}

