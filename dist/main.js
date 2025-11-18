"use strict";
var OrigenMaterialLunar;
(function (OrigenMaterialLunar) {
    OrigenMaterialLunar["Igneas"] = "\u00CDgneas";
    OrigenMaterialLunar["Metamoficas"] = "Metam\u00F3rficas";
    OrigenMaterialLunar["Sedimentarias"] = "Sedimentarias";
})(OrigenMaterialLunar || (OrigenMaterialLunar = {}));
var ClasificacionMaterialLunar;
(function (ClasificacionMaterialLunar) {
    ClasificacionMaterialLunar["RocasConstruccion"] = "Rocas de construcci\u00F3n: Son aquellas rocas que se usan para la construcci\u00F3n de diferentes estructuras.";
    ClasificacionMaterialLunar["RocaOrnamental"] = "Roca ornamental: Son todas aquellas rocas de uso decorativo,integrado o no en edificio o estructuras superiores.";
    ClasificacionMaterialLunar["Utensilios"] = "Utensilios: Rocas de uso en utensilios para el hombre.";
    ClasificacionMaterialLunar["PiedraMachada"] = "Piedras machacadas: \u00C1ridos, ripios, agregados, etc. que son muy utilizados en la construcci\u00F3n como material de relleno.";
})(ClasificacionMaterialLunar || (ClasificacionMaterialLunar = {}));
var TexturaMaterialLunar;
(function (TexturaMaterialLunar) {
    TexturaMaterialLunar["Vitrea"] = "V\u00EDtrea";
    TexturaMaterialLunar["Afanitica"] = "Afan\u00EDtica";
    TexturaMaterialLunar["Faneritica"] = "Faner\u00EDtica";
})(TexturaMaterialLunar || (TexturaMaterialLunar = {}));
class Mineral {
    constructor(id, nombre, origen, dureza, tamañoGrano, clasificacion, tamañoCristal, temperaturaFormacion, estructura, textura) {
        this.id = id;
        this.nombre = nombre;
        this.origen = origen;
        this.dureza = dureza;
        this.tamañoGrano = tamañoGrano;
        this.clasificacion = clasificacion;
        this.tamañoCristal = tamañoCristal;
        this.temperaturaFormacion = temperaturaFormacion;
        this.estructura = estructura;
        this.textura = textura;
    }
    capturar() {
        return this;
    }
    dameTamañoGrano() {
        if (this.tamañoGrano > 30) {
            return "Grano muy grueso";
        }
        else if (this.tamañoGrano >= 5 && this.tamañoGrano <= 30) {
            return "Grano grueso";
        }
        else if (this.tamañoGrano >= 2 && this.tamañoGrano < 5) {
            return "Grano medio";
        }
        else if (this.tamañoGrano < 2) {
            return "Grano fino";
        }
        else {
            return "Indefinido";
        }
    }
}
class CriterioIgneas {
    descripcion() {
        return "Criterio Ígneas: Origen ígneo y grano muy grueso.";
    }
    esValido(mineral) {
        return (mineral.origen === OrigenMaterialLunar.Igneas &&
            mineral.dameTamañoGrano() === "Grano muy grueso");
    }
}
class CriterioMetamorficas {
    descripcion() {
        return "Criterio Metamórficas: Origen metamórfico, grano medio/fino y textura vítrea.";
    }
    esValido(mineral) {
        const grano = mineral.dameTamañoGrano();
        return (mineral.origen === OrigenMaterialLunar.Metamoficas &&
            (grano === "Grano fino" || grano === "Grano medio") &&
            mineral.textura === TexturaMaterialLunar.Vitrea);
    }
}
class CriterioSedimentarias {
    descripcion() {
        return "Criterio Sedimentarias: Origen sedimentario y textura fanerítica.";
    }
    esValido(mineral) {
        return (mineral.origen === OrigenMaterialLunar.Sedimentarias &&
            mineral.textura === TexturaMaterialLunar.Faneritica);
    }
}
class FormatoEuropeo {
    muestra(mineral) {
        return `
      <h3>Formato Europeo</h3>
      <p><strong>ID:</strong> ${mineral.id}</p>
      <p><strong>Nombre:</strong> ${mineral.nombre}</p>
      <p><strong>Origen:</strong> ${mineral.origen}</p>
      <p><strong>Dureza:</strong> ${mineral.dureza} / 10</p>
      <p><strong>Tamaño de grano:</strong> ${mineral.dameTamañoGrano()} (${mineral.tamañoGrano} mm)</p>
      <p><strong>Clasificación:</strong> ${mineral.clasificacion}</p>
      <p><strong>Tamaño de cristales:</strong> ${mineral.tamañoCristal}</p>
      <p><strong>Temperatura de formación:</strong> ${(mineral.temperaturaFormacion).toFixed(2)} °C</p>
      ${mineral.estructura.trim() ? `<p><strong>Estructura:</strong> ${mineral.estructura}</p>` : ""}
      <p><strong>Textura:</strong> ${mineral.textura}</p>
    `;
    }
}
class FormatoAmericano {
    muestra(mineral) {
        return `
      <h3>American Format</h3>
      <p><strong>ID:</strong> ${mineral.id}</p>
      <p><strong>Name:</strong> ${mineral.nombre}</p>
      <p><strong>Origin:</strong> ${mineral.origen}</p>
      <p><strong>Hardness:</strong> ${mineral.dureza} / 10</p>
      <p><strong>Grain size:</strong> ${mineral.dameTamañoGrano()} (${mineral.tamañoGrano} mm)</p>
      <p><strong>Classification:</strong> ${mineral.clasificacion}</p>
      <p><strong>Crystal size:</strong> ${mineral.tamañoCristal}</p>
      <p><strong>Formation temperature:</strong> ${((mineral.temperaturaFormacion) * 9 / 5 + 32).toFixed(2)} °F</p>
      ${mineral.estructura.trim() ? `<p><strong>Structure:</strong> ${mineral.estructura}</p>` : ""}
      <p><strong>Texture:</strong> ${mineral.textura}</p>
    `;
    }
}
class BaseFormularioMineral {
    constructor(idContenedor) {
        this.campos = [];
        const c = document.getElementById(idContenedor);
        if (!c)
            throw new Error("No existe el contenedor del formulario");
        this.contenedor = c;
        this.opcionesOrigen = Object.values(OrigenMaterialLunar);
        this.opcionesClasificacion = Object.values(ClasificacionMaterialLunar);
        this.opcionesTextura = Object.values(TexturaMaterialLunar);
        this.render();
    }
    leerCamposSimples(...ids) {
        return ids.map(id => {
            var _a;
            const el = document.getElementById(id);
            if (!el)
                throw new Error(`No existe el elemento con id ${id}`);
            return ((_a = el.value) !== null && _a !== void 0 ? _a : "").trim();
        });
    }
    validarFormulario() {
        var _a, _b, _c, _d, _e, _f, _g;
        const valores = this.leerCamposSimples(...this.campos);
        for (let i = 0; i < valores.length; i++) {
            const campo = (_a = this.campos[i]) !== null && _a !== void 0 ? _a : "";
            if (((_b = valores[i]) !== null && _b !== void 0 ? _b : "").trim() === "" && !campo.toLowerCase().includes("estructura")) {
                const nombreCampo = campo.slice(4);
                return `El campo "${nombreCampo}" es obligatorio.`;
            }
        }
        const idValor = (_c = valores[0]) !== null && _c !== void 0 ? _c : "";
        const regexID = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
        const idxDureza = this.campos.findIndex(id => id.toLowerCase().includes("dureza"));
        const dureza = parseFloat((_d = valores[idxDureza]) !== null && _d !== void 0 ? _d : "0");
        const idxTamGrano = this.campos.findIndex(id => id.toLowerCase().includes("tamañograno"));
        const tamanoGrano = parseFloat((_e = valores[idxTamGrano]) !== null && _e !== void 0 ? _e : "0");
        const idxTamCristal = this.campos.findIndex(id => id.toLowerCase().includes("tamañocristal"));
        const tamanoCristal = parseFloat((_f = valores[idxTamCristal]) !== null && _f !== void 0 ? _f : "0");
        const idxTemp = this.campos.findIndex(id => id.toLowerCase().includes("temperatura"));
        const temperatura = parseFloat((_g = valores[idxTemp]) !== null && _g !== void 0 ? _g : "0");
        if (!regexID.test(idValor)) {
            return "El ID debe seguir el formato LLDDDDLL (ejemplo: AB1234CD).";
        }
        if (dureza < 1 || dureza > 10) {
            return "La dureza debe estar entre 1 y 10.";
        }
        if (tamanoGrano <= 0) {
            return "El tamaño de grano debe ser mayor que 0.";
        }
        if (tamanoCristal < 0 || tamanoCristal > 10) {
            return "El tamaño de cristales debe estar entre 0 y 10.";
        }
        if (temperatura < -100 || temperatura > 100) {
            return "La temperatura debe estar entre -100 y 100 K.";
        }
        return null;
    }
    dameMineral() {
        var _a, _b, _c, _d, _e, _f, _g;
        const valores = this.leerCamposSimples(...this.campos);
        return new Mineral((_a = valores[0]) !== null && _a !== void 0 ? _a : "", (_b = valores[1]) !== null && _b !== void 0 ? _b : "", valores[2], parseFloat((_c = valores[3]) !== null && _c !== void 0 ? _c : "0"), parseFloat((_d = valores[4]) !== null && _d !== void 0 ? _d : "0"), valores[5], parseFloat((_e = valores[6]) !== null && _e !== void 0 ? _e : "0"), parseFloat((_f = valores[7]) !== null && _f !== void 0 ? _f : "0"), (_g = valores[8]) !== null && _g !== void 0 ? _g : "", valores[9]);
    }
}
class IntroduccionReducida extends BaseFormularioMineral {
    render() {
        this.campos = [
            "red-id", "red-nombre", "red-origen", "red-clasificacion",
            "red-textura", "red-dureza", "red-tamañoGrano", "red-tamañoCristal",
            "red-temperatura", "red-estructura"
        ];
        this.contenedor.innerHTML = `
      <h3>Formulario Reducido</h3>
      <form class="form-reducido" id="form-reducido" novalidate>

        <input id="red-id" type="text" placeholder="ID (LLDDDDLL)" required pattern="[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}" />

        <input id="red-nombre" type="text" placeholder="Nombre del mineral" required />

        <input id="red-origen" list="lista-origen" type="text" placeholder="Origen" required />
        <datalist id="lista-origen">
          ${this.opcionesOrigen.map(o => `<option value="${o}"></option>`).join('')}
        </datalist>

        <input id="red-clasificacion" list="lista-clasificacion" type="text" placeholder="Clasificación" required />
        <datalist id="lista-clasificacion">
          ${this.opcionesClasificacion.map(c => `<option value="${c}"></option>`).join('')}
        </datalist>

        <input id="red-textura" list="lista-textura" type="text" placeholder="Textura" required />
        <datalist id="lista-textura">
          ${this.opcionesTextura.map(t => `<option value="${t}"></option>`).join('')}
        </datalist>

        <input id="red-dureza" type="number" step="1" min="1" max="10" placeholder="Dureza (1-10)" required />

        <input id="red-tamañoGrano" type="number" step="1" min="0" placeholder="Tamaño del grano (mm)" required />

        <input id="red-tamañoCristal" type="number" step="1" min="0" max="10" placeholder="Tamaño de cristal" required />
    
        <input id="red-temperatura" type="number" step="1" min="-100" max="100" placeholder="Temperatura de formación (K)" required />

        <input id="red-estructura" type="text" placeholder="Estructura (Opcional)"/>
      </form>
    `;
    }
}
class IntroduccionExtendida extends BaseFormularioMineral {
    render() {
        this.campos = [
            "ext-id", "ext-nombre", "ext-origen", "ext-dureza",
            "ext-tamañoGrano", "ext-clasificacion", "ext-tamañoCristal",
            "ext-temperatura", "ext-estructura", "ext-textura"
        ];
        this.contenedor.innerHTML = `
      <h3>Formulario Extendido</h3>
      <form class="form-extendido" id="form-extendido" novalidate>
        <div id="ext-elemento">
          <label for="ext-id">ID (LLDDDDLL)</label>
          <input id="ext-id" type="text" required pattern="[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}" />
        </div>

        <div id="ext-elemento">
          <label for="ext-nombre">Nombre</label>
          <input id="ext-nombre" type="text" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-origen">Origen</label>
          <select id="ext-origen" required>
            <option value="">Seleccione</option>
            ${this.opcionesOrigen.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>

        <div id="ext-elemento">
          <label for="ext-dureza">Dureza (1-10)</label>
          <input id="ext-dureza" type="number" step="1" min="1" max="10" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-tamañoGrano">Tamaño de grano (mm)</label>
          <input id="ext-tamañoGrano" type="number" step="1" min="1" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-clasificacion">Clasificación</label>
          <select id="ext-clasificacion" required>
            <option value="">Seleccione</option>
            ${this.opcionesClasificacion.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>

        <div id="ext-elemento">
          <label for="ext-tamañoCristal">Tamaño de cristales</label>
          <input id="ext-tamañoCristal" type="number" step="1" min="0" max="10" required />
        </div>

        <div id="ext-elemento" >
          <label for="ext-temperatura">Temperatura (K)</label>
          <input id="ext-temperatura" type="number" step="1" min="-100" max="100" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-textura">Textura</label>
          <select id="ext-textura" required>
            <option value="">Seleccione</option>
            ${this.opcionesTextura.map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>

        <div id="ext-elemento-estructura">
          <label for="ext-estructura">Estructura</label>
          <input id="ext-estructura" class="campo-estructura" type="text" placeholder="(Opcional)" />
        </div>
      </form>
    `;
    }
}
class Astronauta {
    constructor(identificador, nombreCompleto, edad) {
        this.identificador = identificador;
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
    }
    dameId() { return this.identificador; }
    dameNombre() { return this.nombreCompleto; }
    dameEdad() { return this.edad; }
}
class Mision {
    constructor(piloto, criterio, entrada, salida) {
        this.piloto = piloto;
        this.criterio = criterio;
        this.entrada = entrada;
        this.salida = salida;
    }
    analiza() {
        const mineral = this.entrada.dameMineral();
        const esValido = this.criterio.esValido(mineral);
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `
      <h2>Misión de ${this.piloto.dameNombre()}</h2>
      <p><strong>Criterio:</strong> ${this.criterio.descripcion()}</p>
      <p><strong>Resultado:</strong> ${esValido ? "✅ Válido" : "❌ No válido"}</p>
      <div>${this.salida.muestra(mineral)}</div>
      <div style="font-size:2em;">${esValido ? "😄" : "😠"}</div>
    `;
        return esValido;
    }
}
class Estrella {
    constructor(entorno) {
        this.x = 0;
        this.y = 0;
        this.velocidad = 0;
        this.longitud = 0;
        this.opacidad = 0;
        this.dx = 0;
        this.dy = 0;
        this.color = "";
        this.estela = [];
        this.entorno = entorno;
        this.esMeteoro = Math.random() < 0.15;
        this.iniciarPosicionAleatoria();
    }
    iniciarPosicionAleatoria() {
        this.x = Math.random() * this.entorno.ancho;
        this.y = Math.random() * this.entorno.alto;
        this.velocidad = 2 + Math.random() * 3;
        this.longitud = 15 + Math.random() * 25;
        this.opacidad = this.esMeteoro ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.5;
        this.dx = this.velocidad;
        this.dy = this.velocidad * 0.3;
        this.color = this.esMeteoro
            ? `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,`
            : `rgba(255,255,255,`;
        this.estela = [];
    }
    reiniciar() {
        if (Math.random() < 0.5) {
            this.x = Math.random() * this.entorno.ancho;
            this.y = 0;
        }
        else {
            this.x = this.entorno.ancho;
            this.y = Math.random() * this.entorno.alto;
        }
        this.velocidad = 2 + Math.random() * 3;
        this.longitud = 15 + Math.random() * 25;
        this.opacidad = this.esMeteoro ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.5;
        this.dx = this.velocidad;
        this.dy = this.velocidad * 0.3;
        this.color = this.esMeteoro
            ? `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,`
            : `rgba(255,255,255,`;
        this.estela = [];
    }
    dibujar(pincel, entorno) {
        this.estela.push({ x: this.x, y: this.y });
        if (this.estela.length > this.longitud)
            this.estela.shift();
        for (let i = 0; i < this.estela.length - 1; i++) {
            const p1 = this.estela[i];
            const p2 = this.estela[i + 1];
            if (!p1 || !p2)
                continue;
            const alfa = (i / this.estela.length) * this.opacidad;
            pincel.beginPath();
            pincel.moveTo(p1.x, p1.y);
            pincel.lineTo(p2.x, p2.y);
            pincel.strokeStyle = `${this.color}${alfa})`;
            pincel.lineWidth = this.esMeteoro ? 3 : 2;
            pincel.stroke();
        }
        pincel.beginPath();
        pincel.arc(this.x, this.y, this.esMeteoro ? 4 : 3, 0, Math.PI * 2);
        pincel.fillStyle = `${this.color}${this.opacidad + 0.3})`;
        pincel.fill();
        this.x -= this.dx;
        this.y += this.dy;
        const primero = this.estela[0];
        if (primero && (primero.x < -50 || primero.y > entorno.alto + 50)) {
            this.reiniciar();
        }
    }
}
window.onload = () => {
    const inicio = document.getElementById("inicio-mision");
    const formaEntradaDiv = document.getElementById("forma-entrada");
    const datosMisionDiv = document.getElementById("datos-mision");
    const mineralFormDiv = document.getElementById("mineral-form");
    const botonNuevaMision = document.getElementById("nueva-mision");
    const resultadoDiv = document.getElementById("resultado");
    const validarMineralBtn = document.getElementById("validar-mineral");
    const formAstro = document.getElementById("form-astronauta");
    const lienzo = document.createElement("canvas");
    // Animación de fondo
    lienzo.id = "canvas-fondo";
    lienzo.style.position = "fixed";
    lienzo.style.top = "0";
    lienzo.style.left = "0";
    lienzo.style.width = "100%";
    lienzo.style.height = "100%";
    lienzo.style.zIndex = "-1";
    document.body.appendChild(lienzo);
    const pincel = lienzo.getContext("2d");
    const entorno = {
        ancho: window.innerWidth,
        alto: window.innerHeight
    };
    const ajustarTamano = () => {
        entorno.ancho = window.innerWidth;
        entorno.alto = window.innerHeight;
        lienzo.width = entorno.ancho;
        lienzo.height = entorno.alto;
    };
    window.addEventListener("resize", ajustarTamano);
    ajustarTamano();
    const estrellas = [];
    for (let i = 0; i < 150; i++) {
        estrellas.push(new Estrella(entorno));
    }
    const animar = () => {
        pincel.clearRect(0, 0, entorno.ancho, entorno.alto);
        estrellas.forEach(e => e.dibujar(pincel, entorno));
        requestAnimationFrame(animar);
    };
    animar();
    formAstro.style.display = "none";
    formaEntradaDiv.style.display = "none";
    validarMineralBtn.style.display = "none";
    resultadoDiv.style.display = "none";
    datosMisionDiv.style.display = "none";
    mineralFormDiv.style.display = "none";
    botonNuevaMision.style.display = "none";
    // Lógica de la mision
    let misionActual;
    inicio.addEventListener("click", (e) => {
        const target = e.target;
        if (target.tagName !== "BUTTON")
            return;
        inicio.style.display = "none";
        formAstro.style.display = "flex";
        formAstro.criterioElegido = target.dataset.criterio;
    });
    document.getElementById("aceptar-astro").addEventListener("click", () => {
        formAstro.style.display = "none";
        formaEntradaDiv.style.display = "flex";
        botonNuevaMision.style.display = "flex";
        const id = document.getElementById("astro-id").value || "AGM001";
        const nombre = document.getElementById("astro-nombre").value || "Agmunsen";
        const edad = parseInt(document.getElementById("astro-edad").value) || 40;
        const astronauta = new Astronauta(id, nombre, edad);
        let criterio;
        let tipoMaterial;
        switch (formAstro.criterioElegido) {
            case "igneas":
                criterio = new CriterioIgneas();
                tipoMaterial = "Ígneas";
                break;
            case "metamorfica":
                criterio = new CriterioMetamorficas();
                tipoMaterial = "Metamórficas";
                break;
            case "sedimentaria":
                criterio = new CriterioSedimentarias();
                tipoMaterial = "Sedimentaria";
                break;
            default:
                return;
        }
        datosMisionDiv.innerHTML = `
      <h2>Datos de la Misión</h2>
      <p><strong>Astronauta:</strong> ${astronauta.dameNombre()}</p>
      <p><strong>Identificador:</strong> ${astronauta.dameId()}</p>
      <p><strong>Edad:</strong> ${astronauta.dameEdad()}</p>
      <p><strong>Fecha inicio:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Tipo de material a recolectar:</strong> ${tipoMaterial}</p>
    `;
        datosMisionDiv.style.display = "flex";
        formaEntradaDiv.innerHTML = `
      <button id="extendida">Forma Extendida</button>
      <button id="reducida">Forma Reducida</button>
    `;
        formaEntradaDiv.addEventListener("click", (e) => {
            const targetEntrada = e.target;
            if (!targetEntrada.id)
                return;
            let entradaSistema;
            if (targetEntrada.id === "extendida") {
                entradaSistema = new IntroduccionExtendida("mineral-form");
            }
            else {
                entradaSistema = new IntroduccionReducida("mineral-form");
            }
            misionActual = new Mision(astronauta, criterio, entradaSistema, new FormatoEuropeo());
            validarMineralBtn.style.display = "flex";
            mineralFormDiv.style.display = "flex";
        });
    });
    validarMineralBtn.addEventListener("click", () => {
        const mineral = misionActual.entrada.dameMineral();
        const checkValidity = misionActual.entrada.validarFormulario();
        if (checkValidity !== null) {
            alert(checkValidity);
            return;
        }
        const esValido = misionActual.criterio.esValido(mineral);
        const formatoEuropeo = new FormatoEuropeo();
        const formatoAmericano = new FormatoAmericano();
        resultadoDiv.innerHTML = `
      <h2>Misión de ${misionActual.piloto.dameNombre()}</h2>
      <p> ${misionActual.criterio.descripcion()}</p>
      <p><strong>Resultado:</strong> ${esValido ? "✅ Válido" : "❌ No válido"}</p>
      <div style="display:flex; gap:30px; flex-wrap:wrap;">
        <div style="border:1px solid #ccc; padding:10px; width:45%;">${formatoEuropeo.muestra(mineral)}</div>
        <div style="border:1px solid #ccc; padding:10px; width:45%;">${formatoAmericano.muestra(mineral)}</div>
      </div>
      <div class="emojis">${esValido ? "😄" : "😠"}</div>
    `;
        resultadoDiv.style.display = "flex";
    });
    botonNuevaMision.addEventListener("click", () => location.reload());
};
//# sourceMappingURL=main.js.map