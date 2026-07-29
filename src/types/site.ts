export type PolicySectionData = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type PolicyData = {
  slug: string;
  title: string;
  description: string;
  sections: PolicySectionData[];
};

export type Plan = {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  portSpeed: string;
  storage: string;
  price: string;
  period: string;
  status: string;
  popular?: boolean;
};
