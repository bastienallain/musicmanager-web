import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/config";

export function FAQ() {
  const { title, subtitle, description } = siteConfig.faqSection;

  return (
    <section id="faq" className="scroll-mt-20">
      <div className="container mx-auto grid max-w-[var(--max-container-width)] gap-10 px-4 py-12 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            {title}
          </h2>
          <p className="mt-4 text-balance text-3xl font-bold leading-[1.15] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            {subtitle}
          </p>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            {description}
          </p>
          <p className="mt-8 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 lg:block">
            {String(siteConfig.faqs.length).padStart(2, "0")} entries
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full border-t border-border"
        >
          {siteConfig.faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="group border-border"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-base hover:no-underline [&>svg]:text-muted-foreground">
                <span className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="w-6 shrink-0 font-mono text-xs tabular-nums text-muted-foreground transition-colors group-data-[state=open]:text-deck-a"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground">{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pl-10 pr-8 text-[15px] leading-7 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
