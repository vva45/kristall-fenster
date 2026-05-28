import "./configurator.css";
import Script from "next/script";
export default function Page() 
{ return ( 
<div className="vp-configurator"> 
<header className="topbar"> 
  <a className="brand" href="#" aria-label="Inicio"> 
  <span className="brand-mark" aria-hidden="true"> VP </span> 
  <span> 
    <strong>VentanaPro</strong> 
    <small>Configurador online</small> 
    </span> 
  </a> 
    <nav className="nav" aria-label="Principal"> 
      <a href="#configurador">Configurar</a>
       <a href="#presupuesto">Presupuesto</a>
        <a href="#contacto">Contacto</a>
         </nav> 
        <a className="phone" href="tel:+34900111222"> 900 111 222 </a>
         </header> 
  <main className="app-shell" id="configurador">
           <section className="preview-panel" aria-labelledby="preview-title">
             <div className="preview-head"> 
              <div> 
                <p className="eyebrow">Vista previa</p>
              <h1 id="preview-title">Configurador avanzado de ventanas</h1> 
              </div> 
              <div className="live-total" aria-live="polite"> 
                <span>Total</span> 
                <strong id="liveTotal">0,00 €</strong> 
                </div> 
                </div> 
                <div className="visual-stage">
                   <svg id="productPreview" role="img" aria-label="Vista previa de la ventana configurada" /> 
                   </div> <div className="preview-meta" aria-label="Resumen rápido"> 
                    <div> <span>Perfil</span> 
            <strong id="metaProfile">greenEvolution 76 AD</strong> 
                    </div> 
                    <div> 
                      <span>Tipo</span> 
                    <strong id="metaType">1 hoja</strong> 
                    </div> 
                    <div> <span>Medidas</span> 
                    <strong id="metaSize">1000 × 1200 mm</strong>
                     </div> 
                     <div> 
                      <span>Apertura</span> 
                     <strong id="metaOpening">Oscilobatiente derecha</strong>
                     </div> 
                     </div> 
                     </section> 
                     <section className="config-panel" aria-label="Opciones del configurador">
                       <div className="step-tabs" role="tablist" aria-label="Secciones"> 
                        <button className="step-tab is-active" type="button" data-step-target="perfil"> Perfil </button> 
                        <button className="step-tab" type="button" data-step-target="tipo"> Tipo </button> 
                        <button className="step-tab" type="button" data-step-target="medidas"> Medidas </button> 
                        <button className="step-tab" type="button" data-step-target="color"> Color </button> 
                        <button className="step-tab" type="button" data-step-target="cristal"> Cristal </button> 
                        <button className="step-tab" type="button" data-step-target="sprossen"> Sprossen </button>
                         <button className="step-tab" type="button" data-step-target="persiana"> Persiana </button>
                          <button className="step-tab" type="button" data-step-target="extras"> Extras </button>
                           </div> <form id="configForm" className="config-form"> 
                            <fieldset className="config-step is-active" data-step="perfil"> 
                              <legend>Perfil</legend>
                               <label className="field-label">Material</label>
                               <div className="choice-grid material-grid" id="materialOptions" /> 
                               <div className="measure-grid"> 
                                <label> 
                                <span>Fabricante</span>
                                <select id="brand" name="brand" /> 
                                </label> 
                                <label> 
                                  <span>Sistema de perfil</span> 
                                  <select id="profile" name="profile" /> 
                                  </label>
                                   </div> 
                                   <div className="profile-specs" id="profileSpecs" /> 
                                   </fieldset> 
                                   <fieldset className="config-step" data-step="tipo"> 
                                    <legend>Tipo</legend> 
                                   <label className="field-label">Número de hojas y composición</label> 
                                   <div className="choice-grid" id="sashOptions" />
                                    <label className="field-label">Combinaciones rápidas</label> 
                                    <div className="opening-presets" id="openingPresets" /> 
                                    <label className="field-label">Función por hoja</label> 
                                    <div className="leaf-config-grid" id="leafFunctionOptions" /> 
                                    <p className="form-note">Puedes elegir un preset o combinar manualmente cada hoja.</p> 
                                    </fieldset> 
                                    <fieldset className="config-step" data-step="medidas"> 
                                      <legend>Medidas</legend> 
                                      <div className="measure-grid"> 
                                        <label> 
                                        <span>Ancho</span>
                                       <input id="width" name="width" type="number" min="350" max="2500" step="10" defaultValue="1000" /> 
                                       </label> 
                                       <label> 
                                        <span>Alto</span> 
                                        <input id="height" name="height" type="number" min="350" max="3000" step="10" defaultValue="1200" /> 
                                        </label> 
                                        </div> 
                                        <div className="measure-grid"> 
                                          <label> 
                                            <span>Cantidad</span> 
                                          <input id="quantity" name="quantity" type="number" min="1" max="99" step="1" defaultValue="1" /> 
                                          </label> 
                                          <label> 
                                            <span>Entrega</span> 
                                            <select id="delivery" name="delivery" /> 
                                            </label> 
                                            </div>
                                             <label className="field-label" htmlFor="specialRequest"> Observaciones especiales </label> 
                                             <textarea id="specialRequest" name="specialRequest" placeholder="Anota aquí medidas especiales, montaje o cualquier detalle" /> 
                                             <p className="validation-message" id="dimensionHint" role="status" /> 
                                             </fieldset> 
                                             <fieldset className="config-step" data-step="color"> 
                                              <legend>Color</legend> 
                                              <label className="field-label">Color de junta</label> 
                                              <div className="choice-grid compact" id="gasketOptions" /> 
                                              <div className="measure-grid"> 
                                                <label> 
                                                <span>Decor exterior</span> 
                                              <select id="exteriorColor" name="exteriorColor" /> 
                                              </label> 
                                              <label> 
                                                <span>Decor interior</span> 
                                                <select id="interiorColor" name="interiorColor" /> 
                                                </label> 
                                                </div> 
                                                <div className="swatch-preview" aria-label="Colores seleccionados"> 
                                                  <div> 
                                                    <span>Exterior</span> 
                                             <strong id="exteriorColorName">Blanco</strong> 
                                             <i id="exteriorSwatch" aria-hidden="true" /> 
                                             </div> 
                                             <div> 
                                              <span>Interior</span> 
                                              <strong id="interiorColorName">Blanco</strong> 
                                              <i id="interiorSwatch" aria-hidden="true" /> 
                                              </div> 
                                              </div> 
                                              </fieldset> 
                                              <fieldset className="config-step" data-step="cristal"> 
                                                <legend>Cristal</legend>
                                               <label className="field-label">Acristalamiento</label> 
                                               <div className="choice-grid" id="glazingOptions" /> 
                                               <div className="measure-grid"> 
                                                <label> 
                                                <span>Aislamiento acústico</span> 
                                               <select id="soundGlass" name="soundGlass" />
                                                </label> 
                                                <label> 
                                                  <span>Vidrio de seguridad</span> 
                                                <select id="safetyGlass" name="safetyGlass" /> 
                                                </label> 
                                                </div> 
                                                <label className="field-label" htmlFor="decorGlass"> Ornamental y protección solar </label> 
                                                <select id="decorGlass" name="decorGlass" /> 
                                             </fieldset> <fieldset className="config-step" data-step="sprossen"> 
                                              <legend>Sprossen</legend> 
                                             <label className="field-label">Cuarterones</label> 
                                             <div className="choice-grid" id="muntinOptions" /> 
                                             <div className="measure-grid conditional" id="muntinControls"> 
                                              <label> <span>Divisiones verticales</span> 
                                              <input id="muntinVertical" name="muntinVertical" type="number" min="0" max="5" step="1" defaultValue="1" /> 
                                              </label> <label> <span>Divisiones horizontales</span> 
                                              <input id="muntinHorizontal" name="muntinHorizontal" type="number" min="0" max="5" step="1" defaultValue="1" /> 
                                              </label> 
                                              </div> 
                                              </fieldset> 
                                              <fieldset className="config-step" data-step="persiana"> 
                                                <legend>Persiana</legend> 
                                              <p className="form-note" id="shutterHint" /> 
                                              <label className="field-label">Tipo de persiana</label> 
                                             <div className="choice-grid" id="shutterOptions" /> 
                                             <label className="field-label">Accionamiento</label> 
                                             <div className="choice-grid compact" id="shutterControlOptions" /> 
                                             <label className="toggle-row"> <input id="mosquito" name="mosquito" type="checkbox" /> <span> 
                                              <strong>Mosquitera integrada</strong> 
                                              <small>Complemento enrollable en el hueco de la persiana</small> 
                                             </span>
                                              </label> 
                                             </fieldset> 
                                             <fieldset className="config-step" data-step="extras"> 
                                              <legend>Extras</legend> 

                                             <label className="field-label">Manilla</label> 
                                             <div className="choice-grid" id="handleOptions" /> 
                                             <label className="field-label">Seguridad</label> 
                                             <div className="choice-grid" id="securityOptions" /> 
                                             <div className="extras-list" id="extrasList" /> 
                                             </fieldset> 
                                             </form> 
                                             <aside className="summary-panel" id="presupuesto" aria-label="Resumen de precio"> 
                                              <div className="summary-head"> 
                                                <h2>Precio estimado</h2> 
                                              <strong id="summaryTotal">0,00 €</strong> 
                                              </div> <dl className="price-breakdown" id="priceBreakdown" /> <div className="actions"> 
                                                <button className="primary-action" id="addToQuote" type="button"> Añadir al presupuesto </button> 
                                                <button className="secondary-action" id="copySummary" type="button"> Copiar resumen </button> 
                                             </div> 
                                             </aside> 
                                             </section> 
                                             </main>
                                              <section className="quote-band" aria-labelledby="quote-title"> 
                                              <div className="quote-inner"> 
                                                <div className="quote-header"> <div> 
                                              <p className="eyebrow">Presupuesto</p> 
                                              <h2 id="quote-title">Elementos configurados</h2> 
                                              </div> 
                                              <div className="quote-actions"> 
                                              <button className="secondary-action" id="printQuote" type="button"> Imprimir </button> 
                                              <button className="ghost-action" id="clearQuote" type="button"> Vaciar </button> 
                                              </div>
                                               </div> 
                                              <div className="quote-list" id="quoteList" /> 
                                              <div className="quote-footer"> 
                                                <span>Total presupuesto</span> 
                                              <strong id="quoteTotal">0,00 €</strong>
                                              </div>
                                               </div> 
                                              </section> 
                                              <footer className="site-footer" id="contacto"> 
                                                <div> 
                                                <strong>VentanaPro</strong> 
                                                <span>info@ventanapro.local</span> 
                                                </div> 
                                                <p>Precios de ejemplo con IVA incluido. Catálogo demostrativo.</p> 
                                       </footer> 
<Script src="/simulator.js" strategy="afterInteractive" /> 
</div> )
; 
}