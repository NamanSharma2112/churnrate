"use client";

import { BentoCard } from "./BentoCard";
import {
  RiskGaugeVisual,
  RiskDonutVisual,
  RevenueVisual,
  AlertFeedVisual,
  HealthMeterVisual,
  PipelineVisual,
} from "./visuals";
import { useInView } from "@/hooks/useInView";

export function BentoGrid() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section
      id="product"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div
        ref={ref}
        data-visible={inView}
        className="landing-reveal mx-auto max-w-2xl text-center"
      >
        <span className="text-[11px] font-semibold tracking-[0.16em] text-teal-600 uppercase">
          The platform
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Everything you need to keep customers
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-500">
          Churn is rarely a surprise — it just goes unnoticed. ChurnRate watches
          the signals that precede it and tells you who to call today.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <BentoCard
          className="lg:col-span-4 lg:row-span-2"
          eyebrow="Prediction"
          panelTitle="Account · Northwind Labs"
          panelMeta="scored 4m ago"
          title="Know who's leaving, and why"
          description="Every account gets a live churn score with the factors driving it — not a black box, but a call list you can act on."
          accent="#ef4444"
          visual={(v) => <RiskGaugeVisual inView={v} />}
        />

        <BentoCard
          className="lg:col-span-2"
          eyebrow="Segments"
          panelTitle="Risk distribution"
          panelMeta="2,847 accounts"
          title="Your book, by risk"
          description="See the whole base split by risk band at a glance."
          accent="#f59e0b"
          delay={80}
          visual={(v) => <RiskDonutVisual inView={v} />}
        />

        <BentoCard
          className="lg:col-span-2"
          eyebrow="Impact"
          panelTitle="Revenue retained"
          panelMeta="last 6 months"
          title="Revenue saved"
          description="Track the MRR your team retained after intervening."
          accent="#0d9488"
          delay={160}
          visual={(v) => <RevenueVisual inView={v} />}
        />

        <BentoCard
          className="lg:col-span-2"
          eyebrow="Real time"
          panelTitle="Alert stream"
          panelMeta="live"
          title="Alerts that arrive early"
          description="Health drops and silent accounts surface the moment they happen."
          accent="#f97316"
          delay={80}
          visual={(v) => <AlertFeedVisual inView={v} />}
        />

        <BentoCard
          className="lg:col-span-2"
          eyebrow="Health"
          panelTitle="Health score"
          panelMeta="rolling 30d"
          title="One score per account"
          description="Usage, support and billing signals folded into a single number."
          accent="#10b981"
          delay={160}
          visual={(v) => <HealthMeterVisual inView={v} />}
        />

        <BentoCard
          className="lg:col-span-2"
          eyebrow="Ingest"
          panelTitle="Import run"
          panelMeta="completed"
          title="Live in an afternoon"
          description="Drop in a CSV or point us at Postgres — scored in seconds."
          accent="#6366f1"
          delay={240}
          visual={(v) => <PipelineVisual inView={v} />}
        />
      </div>
    </section>
  );
}
