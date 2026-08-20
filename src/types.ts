export type NavPage = 'home' | 'news' | 'sports' | 'as-e-dey-hot' | 'contact';

export type NewsCategory =
  | 'news'
  | 'politics'
  | 'money'
  | 'naija-life'
  | 'world'
  | 'sports'
  | 'as-e-dey-hot'
  | 'entertainment';

export interface CommentItem {
  id: string;
  author: string;
  avatar?: string;
  location?: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface NewsArticle {
  id: string;
  title: string; // Catchy Pidgin headline
  summary: string; // 1-2 sentence Pidgin summary
  content: string[]; // Full article paragraphs in Pidgin
  category: NewsCategory;
  categoryLabel: string; // e.g. "Tori News", "Sports Gist", "As E Dey Hot", "Money Matter"
  imageUrl: string;
  imageCaption?: string;
  videoUrl?: string; // Real-time video
  videoDuration?: string;
  isVideo?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  isBreaking?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  locationTag: string;
  tags: string[];
  comments: CommentItem[];
}

export interface VideoStory {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  category: string;
  timeAgo: string;
  reporter: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phoneOrEmail: string;
  state: string;
  subject: string;
  category: string;
  message: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  timestamp: string;
}
