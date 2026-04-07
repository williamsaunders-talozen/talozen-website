import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const linkGroupSchema = z.object({
  title: z.string(),
  links: z.array(linkSchema),
});

const cardSchema = z.object({
  title: z.string(),
  body: z.string(),
  icon: z.string().optional(),
});

const quoteSchema = z.object({
  quote: z.string(),
  name: z.string(),
  title: z.string(),
  company: z.string(),
  avatar: z.string().optional(),
  featured: z.boolean().optional(),
});

const pricingItemSchema = z.union([
  z.string(),
  z.object({ text: z.string().optional(), bold: z.string().optional() }),
]);

const tierSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  cta: z.string(),
  ctaHref: z.string().optional(),
  items: z.array(pricingItemSchema),
});

const logoSchema = z.object({
  name: z.string(),
  image: z.string().optional(),
});

const featureItemSchema = z.object({
  title: z.string(),
  body: z.string(),
});

const comparisonSideSchema = z.object({
  title: z.string(),
  body: z.string(),
  icon: z.string().optional(),
});

const comparisonRowSchema = z.object({
  before: comparisonSideSchema,
  after: comparisonSideSchema,
});

const sectionSchema = z.object({
  id: z.string(),
  component: z.enum([
    'HeroSection', 'TestimonialGrid', 'DemoEmbed', 'IconCardGrid',
    'LogoBar', 'ImpactCalculator', 'FeaturePanel', 'PricingGrid',
    'BeforeAfterComparison', 'SiteFooter',
  ]),
  figma: z.string().optional(),
  // Hero
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  cta: z.string().optional(),
  ctaSecondary: z.string().optional(),
  image: z.string().optional(),
  // Testimonials
  quotes: z.array(quoteSchema).optional(),
  // Demo / Feature
  embedUrl: z.string().optional(),
  embedTitle: z.string().optional(),
  aspectRatio: z.string().optional(),
  imagePosition: z.enum(['left', 'right']).optional(),
  mediaType: z.enum(['embed', 'wireframe', 'mandate', 'tenant']).optional(),
  items: z.array(featureItemSchema).optional(),
  // Icon grid
  cards: z.array(cardSchema).optional(),
  variant: z.enum(['default', 'muted']).optional(),
  tone: z.enum(['default', 'warning', 'positive']).optional(),
  // Logo bar
  logos: z.array(logoSchema).optional(),
  // Pricing
  tiers: z.array(tierSchema).optional(),
  // Before/After comparison
  beforeLabel: z.string().optional(),
  afterLabel: z.string().optional(),
  rows: z.array(comparisonRowSchema).optional(),
  // Footer
  linkGroups: z.array(linkGroupSchema).optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    sections: z.array(sectionSchema),
  }),
});

export const collections = { pages };
