import { Quote, quoteNumber } from './model';

export function sheetQuote(quote: Quote) {
  // The Sheet is a compact register. Full scopes remain in the private snapshot/PDF.
  // Omitting scopes keeps 60-position offers below the existing receiver's limit.
  return {
    ...quote,
    offerNumber: quoteNumber(quote),
    snapshot: {
      ...quote.snapshot,
      lines: quote.snapshot.lines.map(line => ({
        serviceId: line.serviceId,
        name: `${line.catalogNumber ? `${line.catalogNumber} · ` : ''}${line.name}`,
        unit: line.unit, quantity: line.quantity, priceCents: line.priceCents, totalCents: line.totalCents,
      })),
    },
  };
}
