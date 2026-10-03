import type { Service } from './model';

export const serviceCategory = (service: Service) => service.category || 'Eigene Leistungen';
export function serviceCategories(services: Service[]) {
  return [...new Set(services.map(serviceCategory))];
}
const normalize = (value: string) => value.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss');
export function matchesService(service: Service, search: string, category: string) {
  if (category && serviceCategory(service) !== category) return false;
  const haystack = normalize([service.name, service.description, service.catalogNumber, serviceCategory(service)].filter(Boolean).join(' '));
  return normalize(search).trim().split(/\s+/).every(word => haystack.includes(word));
}
