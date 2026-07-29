export type Plan = {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  bandwidth: string;
  storage: string;
  price: string;
  period: string;
  status: string;
  popular?: boolean;
};

export type Faq = {
  question: string;
  answer: string;
};
