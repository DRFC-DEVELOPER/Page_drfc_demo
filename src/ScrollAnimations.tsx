// Instalar primero: bun add motion
// (o npm install motion / pnpm add motion)

import { motion } from "motion/react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* 1. FadeIn — aparece al entrar al viewport (fade + slide)           */
/* ------------------------------------------------------------------ */

type FadeInProps = { 
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
};

export function FadeIn({ children, direction = "up", delay = 0 }: FadeInProps) {
  const offset = 40;
  const initial = {
    opacity: 0,
    y: direction === "up" ? offset : direction === "down" ? -offset : 0,
    x: direction === "left" ? offset : direction === "right" ? -offset : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. StaggerGroup — contenedor que anima a sus hijos en cascada      */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function StaggerGroup({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
}

/* ------------------------------------------------------------------ */
/* 3. Parallax — se mueve más lento/rápido que el scroll              */
/* ------------------------------------------------------------------ */

import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Parallax({
  children,
  speed = 0.3,
}: {
  children: ReactNode;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. HoverCard — micro-interacción en hover, sin librería extra      */
/* ------------------------------------------------------------------ */

export function HoverCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Ejemplo de uso en una página                                       */
/* ------------------------------------------------------------------ */

export function ExampleSection() {
  return (
    <section style={{ padding: "4rem 2rem" }}>
      <FadeIn>
        <h2>Título que aparece al hacer scroll</h2>
      </FadeIn>

      <FadeIn delay={0.15} direction="left">
        <p>Este párrafo entra con un pequeño retraso, desde la izquierda.</p>
      </FadeIn>

      <StaggerGroup>
        <StaggerItem>
          <HoverCard>
            <div style={{ padding: "1.5rem", background: "#f4f4f4", borderRadius: 12 }}>
              Tarjeta 1
            </div>
          </HoverCard>
        </StaggerItem>
        <StaggerItem>
          <HoverCard>
            <div style={{ padding: "1.5rem", background: "#f4f4f4", borderRadius: 12 }}>
              Tarjeta 2
            </div>
          </HoverCard>
        </StaggerItem>
        <StaggerItem>
          <HoverCard>
            <div style={{ padding: "1.5rem", background: "#f4f4f4", borderRadius: 12 }}>
              Tarjeta 3
            </div>
          </HoverCard>
        </StaggerItem>
      </StaggerGroup>

      <Parallax speed={0.4}>
        <img src="/assets/globe-network.png" alt="" style={{ width: "100%" }} />
      </Parallax>
    </section>
  );
}