import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import type { IntakeInput } from "@/lib/intake";
import { generatePersonalizedInsight } from "@/lib/intake";
import type { Trait } from "@/lib/big5";

interface Props {
  intake: IntakeInput;
  scores: Record<Trait, number>;
}

export function PersonalizedInsight({ intake, scores }: Props) {
  const insight = generatePersonalizedInsight(intake, scores);
  return (
    <Card
      className="mt-6 overflow-hidden border-primary/30 p-6 sm:p-8"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--primary) 6%, var(--background)) 0%, var(--background) 100%)",
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Personalized Reading
        </span>
      </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{insight.title}</h2>

      <div className="mt-6 space-y-5">
        {insight.sections.map((s) => (
          <div key={s.heading}>
            <h3 className="text-sm font-semibold text-foreground">{s.heading}</h3>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
