import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import ElegantTemplate from './ElegantTemplate';
import TechTemplate from './TechTemplate';
import BoldTemplate from './BoldTemplate';
import InfographicTemplate from './InfographicTemplate';
import TimelineTemplate from './TimelineTemplate';
import CardsTemplate from './CardsTemplate';
import SidebarTemplate from './SidebarTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import TwoColumnTemplate from './TwoColumnTemplate';
import PortfolioTemplate from './PortfolioTemplate';
import { ResumeData } from '../types/resume';

const templateMap: Record<string, React.FC<{ data: ResumeData }>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  professional: ExecutiveTemplate,
  elegant: ElegantTemplate,
  tech: TechTemplate,
  bold: BoldTemplate,
  infographic: InfographicTemplate,
  timeline: TimelineTemplate,
  cards: CardsTemplate,
  sidebar: SidebarTemplate,
  minimalist: MinimalistTemplate,
  twocolumn: TwoColumnTemplate,
  portfolio: PortfolioTemplate,
};

export function getTemplateComponent(id: string) {
  return templateMap[id] || ModernTemplate;
}

export { 
  ModernTemplate, ClassicTemplate, MinimalTemplate, CreativeTemplate, 
  ExecutiveTemplate, ElegantTemplate, TechTemplate, BoldTemplate,
  InfographicTemplate, TimelineTemplate, CardsTemplate, SidebarTemplate,
  MinimalistTemplate, TwoColumnTemplate, PortfolioTemplate
};
