"use client";
import React from "react";
import SpotlightCard from "../SpotlightCard";

const AboutMeContent = () => {
  return (
    <SpotlightCard
      className="max-w-lg mx-auto !bg-muted text-card-foreground !border !border-border rounded-xl !shadow-md p-6 sm:p-8 leading-relaxed"
      aria-labelledby="about-letter-heading"
    >
      <h2 id="about-letter-heading" className="sr-only">
        About Me
      </h2>

      <p className="italic mb-4">Hi there,</p>

      <p className="mb-4">
        I’m Samy 👋 and I’m a developer based in Brussels, but I’m also open to
        remote roles. I mainly work with React, Next.js, TypeScript, Supabase,
        and Framer Motion, but I can pick up new tech quickly if that’s what the
        job calls for.
      </p>

      <p className="mb-4">
        I like building web apps that are clean, fast, and easy to use —
        especially when there’s a focus on UI and user experience. For me, it’s
        not just about writing code that works, but making sure it feels good
        for the people using it.
      </p>

      <p className="mb-4">
        Outside of coding, I spend the rest of my time making music, DJing, or
        playing around with design. I think this creative side gives me a
        different perspective when I approach projects, but at the end of the
        day I’m just as into the technical side and problem-solving.
      </p>

      <p className="mb-6">
        I’m fluent in French and English, and I know a bit of Dutch as well.
        Always curious and open to new challenges, I’m looking forward to
        growing as a dev and building things that make an impact.
      </p>

      <div className="mt-6">
        <p className="mb-1">Best,</p>
        <p className="font-semibold">Samy Alliche :)</p>
      </div>
    </SpotlightCard>
  );
};

export default AboutMeContent;
