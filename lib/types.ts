export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  icon: string;
  link: string;
  imageSrc?: string;
  github?: string;
  status: string;
  date: string;
}

export interface AboutData {
  name: string;
  role: string;
  description: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
}

export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}
