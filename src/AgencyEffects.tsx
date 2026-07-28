import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* 1. CustomCursor — reemplaza el cursor del mouse por un punto        */
/*    que crece al pasar sobre elementos con la clase "cursor-hover"   */
/* ------------------------------------------------------------------ */

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest(".cursor-hover"));
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
        borderRadius: "50%",
        background: "black",
        pointerEvents: "none",
        zIndex: 9999,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
    />
  );
}

/* Para usar CustomCursor bien, oculta el cursor real en tu CSS global (index.css):

body {
  cursor: none;
}

Y agrega la clase "cursor-hover" a cualquier link o botón que quieras que
active el efecto de crecimiento.
*/

/* ------------------------------------------------------------------ */
/* 2. MagneticButton — el botón se mueve levemente hacia el cursor     */
/* ------------------------------------------------------------------ */

export function MagneticButton({
  children,
  onClick,
  strength = 0.4,
}: {
  children: ReactNode;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200 });
  const springY = useSpring(y, { damping: 15, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left - rect.width / 2) * strength;
    const relY = (e.clientY - rect.top - rect.height / 2) * strength;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cursor-hover"
      style={{
        x: springX,
        y: springY,
        padding: "16px 40px",
        borderRadius: "100px",
        border: "1px solid #ccc",
        background: "white",
        fontSize: "15px",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* 3. WordReveal — el texto se revela palabra por palabra al hacer     */
/*    scroll (opacidad + ligero movimiento hacia arriba)                */
/* ------------------------------------------------------------------ */

export function WordReveal({
  text,
  className,
  staggerDelay = 0.05,
}: {
  text: string;
  className?: string;
  staggerDelay?: number;
}) {
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0.15, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={container}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.4em" }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariant}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/* Ejemplo de uso completo                                             */
/* ------------------------------------------------------------------ */

export function AgencyEffectsDemo() {
  return (
    <div>
      {/* Monta esto UNA sola vez, en el nivel más alto de tu app (App.tsx) */}
      <CustomCursor />

      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <WordReveal
          text="Este texto se revela palabra por palabra cuando entra al viewport"
          className="cursor-hover"
        />

        <div style={{ marginTop: "2rem" }}>
          <MagneticButton onClick={() => console.log("clic")}>
            Botón magnético
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}