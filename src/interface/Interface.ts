export interface HomeDataInterface {
  id: number;
  title: string;
  description: string;
  subDescription: string;
  image: string;
  isLast?: boolean;
  isFullPage?: boolean;
  pageUrl?: string;
}

export interface BodyWrapper {
  children: JSX.Element[] | JSX.Element;
}

export interface SkillSetTypes {
  name: string;
  duration: string;
  persentage: number;
  image: string;
}



export interface ArticleTypes {
  title: string;
  dateAndTimeSpent: string;
  image: string;
  link: string;
}

export interface TypesFOrArticleWrapper {
  items: any
}

