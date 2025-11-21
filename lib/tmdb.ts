const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3/';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genres?: Genre[];
  budget?: number;
  revenue?: number;
  runtime?: number;
  status?: string;
  homepage?: string;
  production_companies?: ProductionCompany[];
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  overview: string;
  genres?: Genre[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  last_episode_to_air?: {
    name: string;
    air_date: string;
  };
  status?: string;
  homepage?: string;
  production_companies?: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface APIResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function fetchAPIData<T>(endpoint: string): Promise<T> {
  // Check if endpoint already has query parameters
  const separator = endpoint.includes('?') ? '&' : '?'
  const url = `${API_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`
  
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}

export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) {
    return '/images/no-image.jpg';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

