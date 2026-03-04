export type Genre =
  | 'comedia'
  | 'drama'
  | 'musical'
  | 'infantil'
  | 'suspenso'
  | 'clasico'
  | 'experimental';

export type Circuit = 'comercial' | 'independiente';

export type DayOfWeek = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export type Zone =
  | 'Corrientes'
  | 'Abasto'
  | 'San Telmo'
  | 'Palermo'
  | 'Recoleta'
  | 'Almagro'
  | 'Villa Crespo'
  | 'Caballito';

export type TargetAudience = 'adultos' | 'familiar' | 'infantil' | 'adolescentes';

export interface Schedule {
  day: DayOfWeek;
  time: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Play {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  genre: Genre;
  circuit: Circuit;
  zone: Zone;
  targetAudience: TargetAudience;
  price: PriceRange;
  schedules: Schedule[];
  theater: string;
  duration: number;
  rating: number;
  rankingPosition?: number;
  isFeatured: boolean;
  tags: string[];
  startDate: string;
  endDate: string;
}
