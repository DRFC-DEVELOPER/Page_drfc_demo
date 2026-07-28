import { CustomCursor, MagneticButton, WordReveal } from "./AgencyEffects";

function App() {
  return (
    <div>
      <CustomCursor />

      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <WordReveal
          text="Este texto se revela palabra por palabra cuando entra al viewport"
          className="cursor-hover"
        />

        <div style={{ marginTop: "2rem" }}>
          <MagneticButton onClick={() => alert("Hiciste clic")}>
            Botón magnético
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}

export default App;