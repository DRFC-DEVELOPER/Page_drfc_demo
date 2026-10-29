module.exports = {
  content: [
    "./index.html",
    "./paginas/**/*.html",
    "./secciones/**/*.html",
    "./assets/js/**/*.js",
    "./componentes/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#122b3d",
          navy: "#1c3b57",
          accent: "#2b4b66",
          cyan: "#38bdf8",
          lightCyan: "#e0f2fe",
          grayBg: "#f4f6f8",
          slateBg: "#d0d9e2",
          pillBg: "#f1f5f9",
          hoverBg: "#e2e8f0"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  }
};
