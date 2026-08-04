import React from 'react';
import { RippleButton } from './RippleButton';

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function GlassPricingCard({ plan, features, index, onSelect }) {
  const isPopular = !!plan.popular;

  const cardClasses = `
    relative flex h-full w-full max-w-xs flex-1 flex-col overflow-hidden rounded-md
    border backdrop-blur-xl px-7 py-8 shadow-xl transition-all duration-300
    bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/15
    ${isPopular ? 'md:scale-105 ring-2 ring-cyan-400/40 from-cyan-400/10 to-white/[0.04] border-cyan-400/40 shadow-[0_0_60px_-12px_rgba(56,189,248,0.35)]' : ''}
  `;

  const buttonClasses = `
    relative z-10 mt-auto w-full rounded-md py-2.5 text-[14px] font-semibold font-sans transition
    ${isPopular
      ? 'bg-cyan-400 text-black hover:bg-cyan-300'
      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
    }
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-4 z-10 rounded-full bg-cyan-400 px-3 py-1 text-[12px] font-semibold text-black">
          Most Popular
        </div>
      )}

      <div className="relative z-10 mb-3">
        <h2 className="font-display text-[40px] font-light leading-none tracking-[-0.02em] text-white">
          {plan.name}
        </h2>
        <p className="mt-2 text-[15px] text-white/70">{plan.desc}</p>
      </div>

      <div className="relative z-10 my-6 flex items-baseline gap-2">
        <span className="font-display text-[44px] font-light leading-none text-white">{plan.price}</span>
        <span className="text-[14px] text-white/60">/ project</span>
      </div>

      <div className="relative z-10 mb-5 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09)_20%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.09)_80%,transparent)]" />

      <ul className="relative z-10 mb-6 flex flex-1 flex-col gap-2.5 text-[14px] text-white/90">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 shrink-0 text-cyan-400" />
            {feature}
          </li>
        ))}
      </ul>

      <RippleButton onClick={onSelect} className={buttonClasses.trim()}>
        {isPopular ? 'Choose Plan' : 'Get Started'}
      </RippleButton>
    </div>
  );
}
