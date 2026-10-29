(function () {
    const script = document.currentScript;

    if (!script || !document.head) {
        throw new Error('No se pudo inicializar el componente de digitalización y diseño de redes.');
    }

    const styles = `
        .network-tools-section {
            padding: clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 5vw, 6rem);
            background: linear-gradient(135deg, #edf3f7 0%, #dce7ef 100%);
            font-family: 'Inter', sans-serif;
        }

        .network-tools-section *,
        .network-tools-section *::before,
        .network-tools-section *::after {
            box-sizing: border-box;
        }

        .network-tools-heading {
            width: min(100%, 1400px);
            margin: 0 auto clamp(1rem, 2vw, 1.5rem);
            color: #123e59;
            font-size: clamp(1.35rem, 2.5vw, 2rem);
            font-weight: 700;
            letter-spacing: -0.04em;
            line-height: 1.15;
            text-align: center;
        }

        .network-tools-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: clamp(0.875rem, 2vw, 1.5rem);
            width: min(100%, 860px);
            margin: 0 auto;
        }

        .network-tool-card {
            position: relative;
            display: flex;
            min-height: clamp(15rem, 27vw, 19rem);
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            padding: clamp(1.25rem, 3vw, 1.75rem);
            border-radius: 1.25rem;
            text-align: center;
            transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms ease;
        }

        .network-tool-card:hover {
            transform: translateY(-5px);
        }

        .network-tool-card--light {
            border: 1px solid rgba(255, 255, 255, 0.85);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(240, 246, 250, 0.8));
            box-shadow: 0 20px 40px rgba(18, 43, 61, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.95);
            color: #122b3d;
        }

        .network-tool-card--light::before {
            position: absolute;
            inset: -50%;
            background: linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.45) 50%, transparent 55%);
            content: "";
            pointer-events: none;
            transform: rotate(15deg);
        }

        .network-tool-card--dark {
            border: 1px solid rgba(59, 130, 246, 0.35);
            background: linear-gradient(135deg, #020b18 0%, #06172d 55%, #0b3151 100%);
            box-shadow: 0 20px 40px rgba(2, 11, 24, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.16);
            color: #ffffff;
        }

        .network-tool-icon {
            position: relative;
            z-index: 1;
            display: grid;
            width: clamp(3.75rem, 7vw, 4.5rem);
            height: clamp(3.75rem, 7vw, 4.5rem);
            flex: 0 0 auto;
            place-items: center;
            border-radius: 50%;
            transition: transform 300ms ease;
        }

        .network-tool-card:hover .network-tool-icon {
            transform: scale(1.06);
        }

        .network-tool-card--light .network-tool-icon {
            background: #ffffff;
            box-shadow: 0 8px 24px rgba(18, 43, 61, 0.12);
            color: #1675b9;
        }

        .network-tool-card--dark .network-tool-icon {
            border: 1px solid rgba(59, 130, 246, 0.35);
            background: linear-gradient(180deg, rgba(30, 64, 175, 0.55), rgba(2, 11, 24, 0.8));
            color: #75c7ff;
        }

        .network-tool-icon svg {
            display: block;
            width: 2.25rem;
            height: 2.25rem;
        }

        .network-tool-copy {
            position: relative;
            z-index: 1;
            margin: auto 0;
            padding: 0.9rem 0;
        }

        .network-tool-title {
            margin: 0 0 0.55rem;
            font-size: clamp(1.3rem, 2.2vw, 1.6rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1.15;
        }

        .network-tool-divider {
            width: 3rem;
            height: 2px;
            margin: 0 auto 0.65rem;
            border-radius: 999px;
            background: #318bb1;
        }

        .network-tool-card--dark .network-tool-divider {
            background: #60a5fa;
        }

        .network-tool-subtitle {
            margin: 0;
            color: #526779;
            font-size: clamp(0.68rem, 1.1vw, 0.8rem);
            font-weight: 700;
            letter-spacing: 0.08em;
            line-height: 1.6;
            text-transform: uppercase;
        }

        .network-tool-card--dark .network-tool-subtitle {
            color: #c5def3;
        }

        .network-tool-indicator {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            margin-top: 0.5rem;
        }

        .network-tool-indicator span {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 999px;
            background: #318bb1;
        }

        .network-tool-indicator span:nth-child(2) {
            width: 1.25rem;
        }

        .network-tool-card--dark .network-tool-indicator span {
            background: rgba(96, 165, 250, 0.5);
        }

        .network-tool-card--dark .network-tool-indicator span:nth-child(2) {
            background: #60a5fa;
        }

        .infrastructure-benefits-section {
            padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 4vw, 4rem);
        }

        .infrastructure-benefits {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            width: min(100%, 1720px);
        }

        .infrastructure-benefits .network-tool-card {
            min-width: 0;
            min-height: clamp(17rem, 19vw, 21rem);
            padding: clamp(1rem, 2vw, 2rem);
        }

        @media (hover: hover) {
            .infrastructure-benefits .network-tool-card:hover {
                transform: translateY(-5px) scale(1.025);
                box-shadow: 0 26px 48px rgba(2, 11, 24, 0.24), inset 0 1px 2px rgba(255, 255, 255, 0.2);
            }
        }

        .infrastructure-benefit-copy .network-tool-title {
            font-size: clamp(1rem, 1.5vw, 1.3rem);
        }

        .infrastructure-benefit-copy .network-tool-subtitle {
            color: #526779;
            font-size: clamp(0.75rem, 1vw, 0.875rem);
            font-weight: 400;
            letter-spacing: normal;
            line-height: 1.5;
            text-transform: none;
        }

        .network-tool-card--dark .infrastructure-benefit-copy .network-tool-subtitle {
            color: #c5def3;
        }

        .infrastructure-benefit .network-tool-icon svg {
            width: 2rem;
            height: 2rem;
        }

        .infrastructure-benefits-section .network-tools-grid {
            max-width: 1720px;
        }

        @media (max-width: 1100px) and (min-width: 641px) {
            .infrastructure-benefits {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 640px) {
            .network-tools-grid {
                grid-template-columns: minmax(0, 1fr);
                max-width: 28rem;
            }

            .network-tool-card {
                min-height: 15rem;
            }

            .infrastructure-benefits {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                max-width: none;
            }
        }

        @media (max-width: 900px) and (min-width: 641px) {
            .infrastructure-benefits {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 480px) {
            .infrastructure-benefits {
                grid-template-columns: minmax(0, 1fr);
                max-width: 28rem;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .network-tool-card,
            .network-tool-icon {
                transition: none;
            }

            .infrastructure-benefits .network-tool-card:hover {
                transform: none;
            }
        }
    `;

    const markup = `
        <section class="network-tools-section" aria-labelledby="network-tools-heading">
            <h2 class="network-tools-heading" id="network-tools-heading">Digitalización y diseño de redes</h2>
            <div class="network-tools-grid">
                <article class="network-tool-card network-tool-card--light">
                    <div class="network-tool-icon" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v5h5"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2" d="M4 12h16"></path>
                        </svg>
                    </div>
                    <div class="network-tool-copy">
                        <h3 class="network-tool-title">Digitalización</h3>
                        <div class="network-tool-divider" aria-hidden="true"></div>
                        <p class="network-tool-subtitle">AutoCAD / Bentley / KMZ</p>
                    </div>
                </article>

                <article class="network-tool-card network-tool-card--dark">
                    <div class="network-tool-icon" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0-4 4m4-4 4 4m-4-6L7 7m5 5 5-5"></path>
                            <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="#bfdbfe" stroke-width="1"></circle>
                            <circle cx="12" cy="4" r="2" fill="currentColor" stroke="#bfdbfe" stroke-width="1"></circle>
                            <circle cx="7" cy="17" r="2" fill="currentColor" stroke="#bfdbfe" stroke-width="1"></circle>
                            <circle cx="17" cy="17" r="2" fill="currentColor" stroke="#bfdbfe" stroke-width="1"></circle>
                            <circle cx="5" cy="8" r="1.5" fill="currentColor" stroke="none"></circle>
                            <circle cx="19" cy="8" r="1.5" fill="currentColor" stroke="none"></circle>
                        </svg>
                    </div>
                    <div class="network-tool-copy">
                        <h3 class="network-tool-title">Diseño de Redes</h3>
                        <div class="network-tool-divider" aria-hidden="true"></div>
                        <p class="network-tool-subtitle">CAD / IODE Data / Bentley</p>
                    </div>
                </article>
            </div>
        </section>
    `;

    const infrastructureMarkup = `
        <section class="network-tools-section infrastructure-benefits-section" aria-label="Beneficios del servicio">
            <div class="network-tools-grid infrastructure-benefits">
                <article class="network-tool-card network-tool-card--light infrastructure-benefit">
                    <div class="network-tool-icon" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="2.5"></circle>
                        </svg>
                    </div>
                    <div class="network-tool-copy infrastructure-benefit-copy">
                        <h3 class="network-tool-title">Cobertura nacional con base instalada</h3>
                        <div class="network-tool-divider" aria-hidden="true"></div>
                        <p class="network-tool-subtitle">Almacén en Cuernavaca, CDMX, Estado de México y Monterrey, Tijuana y Guadalajara en operación.</p>
                    </div>
                </article>
                <article class="network-tool-card network-tool-card--dark infrastructure-benefit">
                    <div class="network-tool-icon" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9 12 2 2 4-4"></path>
                        </svg>
                    </div>
                    <div class="network-tool-copy infrastructure-benefit-copy">
                        <h3 class="network-tool-title">Gestión integral de proyectos</h3>
                        <div class="network-tool-divider" aria-hidden="true"></div>
                        <p class="network-tool-subtitle">Ingeniería, construcción, obra civil y mantenimiento bajo un mismo equipo.</p>
                    </div>
                </article>
                <article class="network-tool-card network-tool-card--light infrastructure-benefit">
                    <div class="network-tool-icon" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 3h10l3 3v15H4V3h3Z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h8M8 14h8M8 18h5"></path>
                        </svg>
                    </div>
                    <div class="network-tool-copy infrastructure-benefit-copy">
                        <h3 class="network-tool-title">Evidencia documentada en campo</h3>
                        <div class="network-tool-divider" aria-hidden="true"></div>
                        <p class="network-tool-subtitle">Registro fotográfico y reportes verificables de cada intervención.</p>
                    </div>
                </article>
                <article class="network-tool-card network-tool-card--dark infrastructure-benefit">
                    <div class="network-tool-icon" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3 2.8 20h18.4L12 3Z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v5m0 3h.01"></path>
                        </svg>
                    </div>
                    <div class="network-tool-copy infrastructure-benefit-copy">
                        <h3 class="network-tool-title">Atención de emergencias con trazabilidad</h3>
                        <div class="network-tool-divider" aria-hidden="true"></div>
                        <p class="network-tool-subtitle">Respuesta inmediata con seguimiento del ticket de principio a fin.</p>
                    </div>
                </article>
            </div>
        </section>
    `;

    const style = document.createElement('style');
    const isInfrastructureBenefits = script.dataset.component === 'infrastructure-benefits';
    style.dataset.component = isInfrastructureBenefits ? 'infrastructure-benefits' : 'network-tools';
    style.textContent = styles;
    document.head.append(style);
    script.insertAdjacentHTML('beforebegin', isInfrastructureBenefits ? infrastructureMarkup : markup);
})();
