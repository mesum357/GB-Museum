const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Get or create client ID for tracking likes
const getClientId = (): string => {
  const storageKey = 'gbMuseum_clientId';
  let clientId = localStorage.getItem(storageKey);
  
  if (!clientId) {
    // Generate a unique client ID
    clientId = `client_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(storageKey, clientId);
  }
  
  return clientId;
};

// Blog API
export const blogAPI = {
  getAll: async () => {
    return apiRequest<{ success: boolean; data: any[]; pagination: any }>('/blogs');
  },
  getById: async (id: string) => {
    return apiRequest<{ success: boolean; data: any }>(`/blogs/${id}`);
  },
  addComment: async (blogId: string, commentData: { userName: string; email?: string; content: string }) => {
    return apiRequest<{ success: boolean; data: any }>(`/blogs/${blogId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },
  toggleLike: async (blogId: string) => {
    const clientId = getClientId();
    return apiRequest<{ success: boolean; data: { liked: boolean; likeCount: number } }>(`/blogs/${blogId}/like`, {
      method: 'POST',
      body: JSON.stringify({ clientId }),
    });
  },
  getLikeStatus: async (blogId: string) => {
    const clientId = getClientId();
    return apiRequest<{ success: boolean; data: { liked: boolean; likeCount: number } }>(`/blogs/${blogId}/like-status?clientId=${clientId}`);
  },
};

// Library API
export const libraryAPI = {
  getAll: async () => {
    return apiRequest<{ success: boolean; data: any[]; pagination: any }>('/library');
  },
  getById: async (id: string) => {
    return apiRequest<{ success: boolean; data: any }>(`/library/${id}`);
  },
  getByCategory: async (category: string) => {
    return apiRequest<{ success: boolean; data: any[] }>(`/library/category/${category}`);
  },
  addReview: async (bookId: string, reviewData: { userName: string; email?: string; rating: number; comment: string }) => {
    return apiRequest<{ success: boolean; data: any }>(`/library/${bookId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
};

// Gallery API
export const galleryAPI = {
  getAll: async () => {
    return apiRequest<{ success: boolean; data: any[]; pagination: any }>('/gallery/items');
  },
  getById: async (id: string) => {
    return apiRequest<{ success: boolean; data: any }>(`/gallery/items/${id}`);
  },
  getCategories: async () => {
    return apiRequest<{ success: boolean; data: any[] }>('/gallery/categories');
  },
  getByCategory: async (categoryId: string) => {
    return apiRequest<{ success: boolean; data: any[] }>(`/gallery/items/category/${categoryId}`);
  },
  search: async (query: string) => {
    return apiRequest<{ success: boolean; data: any[] }>(`/gallery/items/search?q=${encodeURIComponent(query)}`);
  },
};

export default apiRequest;

