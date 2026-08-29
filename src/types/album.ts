export interface DigitalAlbum {
  id: string;
  slug: string;
  title: string;
  couple: string;
  subtitle?: string;
  date: string;
  location: string;
  coverImage: string;
  description: string;
  pages: string[]; // Array of image URLs
  isPublished: boolean;
  isPrivate: boolean;
  password?: string;
  backgroundMusic?: string;
  watermarkEnabled?: boolean;
  downloadAllowed?: boolean;
  expiryDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AlbumPageItem {
  pageNumber: number;
  imageUrl: string;
  caption?: string;
}

export interface AlbumFilterState {
  searchQuery: string;
  locationFilter: string;
  categoryFilter: string;
}
