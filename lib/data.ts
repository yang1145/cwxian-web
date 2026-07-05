import { readFile } from "fs/promises";
import { join } from "path";
import type {
  Doc,
  FAQ,
  Partner,
  Service,
  Showcase,
  Stat,
  TeamMember,
  Testimonial,
} from "@/types";

const dataDirectory = join(process.cwd(), "data");
const jsonCache = new Map<string, unknown>();

async function readJsonFile<T>(filename: string): Promise<T> {
  const cached = jsonCache.get(filename);
  if (cached !== undefined) {
    return cached as T;
  }

  const filePath = join(dataDirectory, filename);
  const fileContents = await readFile(filePath, "utf8");
  const parsed = JSON.parse(fileContents);
  jsonCache.set(filename, parsed);
  return parsed as T;
}

export async function getStats(): Promise<Stat[]> {
  return readJsonFile<Stat[]>("stats.json");
}

export async function getServices(): Promise<Record<string, Service>> {
  return readJsonFile<Record<string, Service>>("services.json");
}

export async function getShowcases(): Promise<Showcase[]> {
  return readJsonFile<Showcase[]>("showcases.json");
}

export async function getShowcaseBySlug(slug: string): Promise<Showcase | undefined> {
  const showcases = await getShowcases();
  return showcases.find((showcase) => showcase.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return readJsonFile<Testimonial[]>("testimonials.json");
}

export async function getPartners(): Promise<Partner[]> {
  return readJsonFile<Partner[]>("partners.json");
}

export async function getFAQ(): Promise<FAQ[]> {
  return readJsonFile<FAQ[]>("faq.json");
}

export async function getDocs(): Promise<Doc[]> {
  return readJsonFile<Doc[]>("docs.json");
}

export async function getTeam(): Promise<TeamMember[]> {
  return readJsonFile<TeamMember[]>("team.json");
}

export async function getContact(): Promise<unknown> {
  return readJsonFile("contact.json");
}

export async function getEligibility(): Promise<unknown> {
  return readJsonFile("eligibility.json");
}

export async function getGettingStarted(): Promise<unknown> {
  return readJsonFile("getting-started.json");
}
