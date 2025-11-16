interface ICapturable {
  capturar(): Mineral;
}

interface ICriterioValidacion {
  descripcion(): string;
  esValido(mineral: Mineral): boolean;
}

interface ISistemaEntrada {
  dameMineral(): Mineral;
}

interface ISistemaSalida {
  muestra(mineral: Mineral): string;
}

interface IPilotable {
  dameId(): string;
  dameNombre(): string;
  dameEdad(): number;
}

interface IMisionable {
  analiza(): boolean;
}
interface Punto {
  x: number;
  y: number;
}

interface EntornoEstrella {
  ancho: number;
  alto: number;
}
enum OrigenMaterialLunar {
  Igneas = "Ígneas",
  Metamoficas = "Metamórficas",
  Sedimentarias = "Sedimentarias",
}

enum ClasificacionMaterialLunar {
    RocasConstruccion = "Rocas de construcción: Son aquellas rocas que se usan para la construcción de diferentes estructuras.",
    RocaOrnamental = "Roca ornamental: Son todas aquellas rocas de uso decorativo,integrado o no en edificio o estructuras superiores.",
    Utensilios = "Utensilios: Rocas de uso en utensilios para el hombre.",
    PiedraMachada = "Piedras machacadas: Áridos, ripios, agregados, etc. que son muy utilizados en la construcción como material de relleno."
}

enum TexturaMaterialLunar {
  Vitrea = "Vítrea",
  Afanitica = "Afanítica",
  Faneritica = "Fanerítica",
}

class Mineral implements ICapturable {
  constructor(
    public id: string,
    public nombre: string,
    public origen: OrigenMaterialLunar,
    public dureza: number,
    public tamañoGrano: number,
    public clasificacion: ClasificacionMaterialLunar,
    public tamañoCristal: number,
    public temperaturaFormacion: number,
    public estructura: string,
    public textura: TexturaMaterialLunar
  ) {}
    capturar(): Mineral {
        return this;
    }

  dameTamañoGrano(): string {
    if (this.tamañoGrano > 30) {
      return "Grano muy grueso";
    } else if (this.tamañoGrano >= 5 && this.tamañoGrano <= 30) {
      return "Grano grueso";
    } else if (this.tamañoGrano >= 2 && this.tamañoGrano < 5) {
      return "Grano medio";
    } else if (this.tamañoGrano < 2) {
      return "Grano fino";
    } else {
      return "Indefinido";
    }
  }
}

class CriterioIgneas implements ICriterioValidacion {
  descripcion(): string {
    return "Criterio Ígneas: Origen ígneo y grano muy grueso.";
  }

  esValido(mineral: Mineral): boolean {
    return (
      mineral.origen === OrigenMaterialLunar.Igneas &&
      mineral.dameTamañoGrano() === "Grano muy grueso"
    );
  }
}

class CriterioMetamorficas implements ICriterioValidacion {
  descripcion(): string {
    return "Criterio Metamórficas: Origen metamórfico, grano medio/fino y textura vítrea.";
  }

  esValido(mineral: Mineral): boolean {
    const grano = mineral.dameTamañoGrano();
    return (
      mineral.origen === OrigenMaterialLunar.Metamoficas &&
      (grano === "Grano fino" || grano === "Grano medio") &&
      mineral.textura === TexturaMaterialLunar.Vitrea
    );
  }
}

class CriterioSedimentarias implements ICriterioValidacion {
  descripcion(): string {
    return "Criterio Sedimentarias: Origen sedimentario y textura fanerítica.";
  }

  esValido(mineral: Mineral): boolean {
    return (
      mineral.origen === OrigenMaterialLunar.Sedimentarias &&
      mineral.textura === TexturaMaterialLunar.Faneritica
    );
  }
}

class FormatoEuropeo implements ISistemaSalida {
  muestra(mineral: Mineral): string {
    return `
      <h3>Formato Europeo</h3>
      <p><strong>ID:</strong> ${mineral.id}</p>
      <p><strong>Nombre:</strong> ${mineral.nombre}</p>
      <p><strong>Origen:</strong> ${mineral.origen}</p>
      <p><strong>Dureza:</strong> ${mineral.dureza} / 10</p>
      <p><strong>Tamaño de grano:</strong> ${mineral.dameTamañoGrano()} (${mineral.tamañoGrano} mm)</p>
      <p><strong>Clasificación:</strong> ${mineral.clasificacion}</p>
      <p><strong>Tamaño de cristales:</strong> ${mineral.tamañoCristal}</p>
      <p><strong>Temperatura de formación:</strong> ${(mineral.temperaturaFormacion - 273.15).toFixed(2)} °C</p>
      <p><strong>Estructura:</strong> ${mineral.estructura}</p>
      <p><strong>Textura:</strong> ${mineral.textura}</p>
    `;
  }
}

class FormatoAmericano implements ISistemaSalida {
  muestra(mineral: Mineral): string {
    return `
      <h3>American Format</h3>
      <p><strong>ID:</strong> ${mineral.id}</p>
      <p><strong>Name:</strong> ${mineral.nombre}</p>
      <p><strong>Origin:</strong> ${mineral.origen}</p>
      <p><strong>Hardness:</strong> ${mineral.dureza} / 10</p>
      <p><strong>Grain size:</strong> ${mineral.dameTamañoGrano()} (${mineral.tamañoGrano} mm)</p>
      <p><strong>Classification:</strong> ${mineral.clasificacion}</p>
      <p><strong>Crystal size:</strong> ${mineral.tamañoCristal}</p>
      <p><strong>Formation temperature:</strong> ${((mineral.temperaturaFormacion - 273.15) * 9/5 + 32).toFixed(2)} °F</p>
      <p><strong>Structure:</strong> ${mineral.estructura}</p>
      <p><strong>Texture:</strong> ${mineral.textura}</p>
    `;
  }
}
class IntroduccionExtendida implements ISistemaEntrada {
  private contenedor: HTMLElement;

  constructor(idContenedor: string) {
    const cont = document.getElementById(idContenedor);
    if (!cont) throw new Error("No se encontró el contenedor del formulario extendido");
    this.contenedor = cont;
    this.render();
  }

  private render(): void {
    const opcionesOrigen = Object.values(OrigenMaterialLunar) as string[];
    const opcionesClasificacion = Object.values(ClasificacionMaterialLunar) as string[];
    const opcionesTextura = Object.values(TexturaMaterialLunar) as string[];

    this.contenedor.innerHTML = `
      <h3>Formulario Extendido</h3>
      <form class="form-extendido" id="form-extendido" novalidate>
        <div id="ext-elemento">
          <label for="ext-id">ID</label>
          <input id="ext-id" type="text" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-nombre">Nombre</label>
          <input id="ext-nombre" type="text" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-origen">Origen</label>
          <select id="ext-origen" required>
            <option value="">Seleccione</option>
            ${opcionesOrigen.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>

        <div id="ext-elemento">
          <label for="ext-dureza">Dureza (1-10)</label>
          <input id="ext-dureza" type="number" min="1" max="10" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-tamanoGrano">Tamaño de grano (mm)</label>
          <input id="ext-tamanoGrano" type="number" step="0.01" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-clasificacion">Clasificación</label>
          <select id="ext-clasificacion" required>
            <option value="">Seleccione</option>
            ${opcionesClasificacion.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>

        <div id="ext-elemento">
          <label for="ext-tamanoCristal">Tamaño de cristales</label>
          <input id="ext-tamanoCristal" type="number" min="0" max="10" required />
        </div>

        <div id="ext-elemento" >
          <label for="ext-temperatura">Temperatura (K)</label>
          <input id="ext-temperatura" type="number" min="-100" max="100" required />
        </div>

        <div id="ext-elemento">
          <label for="ext-textura">Textura</label>
          <select id="ext-textura" required>
            <option value="">Seleccione</option>
            ${opcionesTextura.map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>

        <div id="ext-elemento-estructura">
          <label for="ext-estructura">Estructura</label>
          <input id="ext-estructura" class="campo-estructura" type="text" required />
        </div>
      </form>
    `;
  }

  dameMineral(): Mineral {
    const id = (document.getElementById("ext-id") as HTMLInputElement).value;
    const nombre = (document.getElementById("ext-nombre") as HTMLInputElement).value;
    const origen = (document.getElementById("ext-origen") as HTMLSelectElement).value as OrigenMaterialLunar;
    const dureza = parseFloat((document.getElementById("ext-dureza") as HTMLInputElement).value);
    const tamañoGrano = parseFloat((document.getElementById("ext-tamanoGrano") as HTMLInputElement).value);
    const clasificacion = (document.getElementById("ext-clasificacion") as HTMLSelectElement).value as ClasificacionMaterialLunar;
    const tamañoCristal = parseFloat((document.getElementById("ext-tamanoCristal") as HTMLInputElement).value);
    const temperaturaFormacion = parseFloat((document.getElementById("ext-temperatura") as HTMLInputElement).value);
    const estructura = (document.getElementById("ext-estructura") as HTMLInputElement).value;
    const textura = (document.getElementById("ext-textura") as HTMLSelectElement).value as TexturaMaterialLunar;

    return new Mineral(
      id,
      nombre,
      origen,
      dureza,
      tamañoGrano,
      clasificacion,
      tamañoCristal,
      temperaturaFormacion,
      estructura,
      textura
    );
  }
}

class IntroduccionReducida implements ISistemaEntrada {
  private contenedor: HTMLElement;

  constructor(idContenedor: string) {
    const cont = document.getElementById(idContenedor);
    if (!cont) throw new Error("No se encontró el contenedor del formulario reducido");
    this.contenedor = cont;
    this.render();
  }

  private render(): void {
    const opcionesOrigen = Object.values(OrigenMaterialLunar) as string[];
    const opcionesClasificacion = Object.values(ClasificacionMaterialLunar) as string[];
    const opcionesTextura = Object.values(TexturaMaterialLunar) as string[];

    this.contenedor.innerHTML = `
      <h3>Formulario Reducido</h3>
      <form class="form-reducido" id="form-reducido" novalidate>

        <input id="red-id" type="text" placeholder="ID del mineral (LLDDDDLL)" required />

        <input id="red-nombre" type="text" placeholder="Nombre del mineral" required />

        <input id="red-origen" list="lista-origen" type="text" placeholder="Origen" required />
        <datalist id="lista-origen">
          ${opcionesOrigen.map(o => `<option value="${o}"></option>`).join('')}
        </datalist>

        <input id="red-clasificacion" list="lista-clasificacion" type="text" placeholder="Clasificación" required />
        <datalist id="lista-clasificacion">
          ${opcionesClasificacion.map(c => `<option value="${c}"></option>`).join('')}
        </datalist>

        <input id="red-textura" list="lista-textura" type="text" placeholder="Textura" required />
        <datalist id="lista-textura">
          ${opcionesTextura.map(t => `<option value="${t}"></option>`).join('')}
        </datalist>

        <input id="red-dureza" type="number" step="0.1" min="1" max="10" placeholder="Dureza (1-10)" required />

        <input id="red-tamano" type="number" step="0.1" placeholder="Tamaño del grano (mm)" required />

        <input id="red-tamanoCristal" type="number" step="0.1" placeholder="Tamaño de cristal" required />

        <input id="red-temperatura" type="number" step="1" min="-100" max="100" placeholder="Temperatura de formación (K)" required />

        <input id="red-estructura" type="text" placeholder="Estructura" required />
      </form>
    `;
  }

  dameMineral(): Mineral {
    const opcionesOrigen = Object.values(OrigenMaterialLunar) as string[];
    const opcionesClasificacion = Object.values(ClasificacionMaterialLunar) as string[];
    const opcionesTextura = Object.values(TexturaMaterialLunar) as string[];

    const origenTexto = (document.getElementById("red-origen") as HTMLInputElement).value;
    const clasTexto = (document.getElementById("red-clasificacion") as HTMLInputElement).value;
    const texturaTexto = (document.getElementById("red-textura") as HTMLInputElement).value;

    const origen = opcionesOrigen.includes(origenTexto)
      ? origenTexto as OrigenMaterialLunar
      : opcionesOrigen[0] as OrigenMaterialLunar;

    const clasificacion = opcionesClasificacion.includes(clasTexto)
      ? clasTexto as ClasificacionMaterialLunar
      : opcionesClasificacion[0] as ClasificacionMaterialLunar;

    const textura = opcionesTextura.includes(texturaTexto)
      ? texturaTexto as TexturaMaterialLunar
      : opcionesTextura[0] as TexturaMaterialLunar;

    const id = (document.getElementById("red-id") as HTMLInputElement).value;
    const nombre = (document.getElementById("red-nombre") as HTMLInputElement).value;
    const dureza = parseFloat((document.getElementById("red-dureza") as HTMLInputElement).value);
    const tamañoGrano = parseFloat((document.getElementById("red-tamano") as HTMLInputElement).value);
    const tamañoCristal = parseFloat((document.getElementById("red-tamanoCristal") as HTMLInputElement).value);
    const temperaturaFormacion = parseFloat((document.getElementById("red-temperatura") as HTMLInputElement).value);
    const estructura = (document.getElementById("red-estructura") as HTMLInputElement).value;

    return new Mineral(
      id,
      nombre,
      origen,
      dureza,
      tamañoGrano,
      clasificacion,
      isNaN(tamañoCristal) ? 0 : tamañoCristal,
      isNaN(temperaturaFormacion) ? 0 : temperaturaFormacion,
      estructura,
      textura
    );
  }
}


class Astronauta implements IPilotable {
  constructor(
    private identificador: string,
    private nombreCompleto: string,
    private edad: number
  ) {}

  dameId(): string { return this.identificador; }
  dameNombre(): string { return this.nombreCompleto; }
  dameEdad(): number { return this.edad; }
}


class Mision implements IMisionable {
  constructor(
    public piloto: IPilotable,
    public criterio: ICriterioValidacion,
    public entrada: ISistemaEntrada,
    public salida: ISistemaSalida
  ) {}

  analiza(): boolean {
    const mineral = this.entrada.dameMineral();
    const esValido = this.criterio.esValido(mineral);

    const resultadoDiv = document.getElementById("resultado")!;
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
  esMeteoro: boolean;
  x: number = 0;
  y: number = 0;
  velocidad: number = 0;
  longitud: number = 0;
  opacidad: number = 0;
  dx: number = 0;
  dy: number = 0;
  color: string = "";
  estela: Punto[] = [];
  entorno: EntornoEstrella;

  constructor(entorno: EntornoEstrella) {
    this.entorno = entorno;
    this.esMeteoro = Math.random() < 0.15;
    this.iniciarPosicionAleatoria();
  }

  iniciarPosicionAleatoria(): void {
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

  reiniciar(): void {
    if (Math.random() < 0.5) {
      this.x = Math.random() * this.entorno.ancho;
      this.y = 0;
    } else {
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

  dibujar(pincel: CanvasRenderingContext2D, entorno: EntornoEstrella): void {
    this.estela.push({ x: this.x, y: this.y });
    if (this.estela.length > this.longitud) this.estela.shift();

    for (let i = 0; i < this.estela.length - 1; i++) {
      const p1 = this.estela[i];
      const p2 = this.estela[i + 1];
      if (!p1 || !p2) continue;
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
  const inicio = document.getElementById("inicio-mision")!;
  const formaEntradaDiv = document.getElementById("forma-entrada")!;
  const datosMisionDiv = document.getElementById("datos-mision")!;
  const mineralFormDiv = document.getElementById("mineral-form")!;
  const botonNuevaMision = document.getElementById("nueva-mision")!;
  const resultadoDiv = document.getElementById("resultado")!;
  const validarMineralBtn = document.getElementById("validar-mineral")!;
  const formAstro = document.getElementById("form-astronauta")!;
  const lienzo = document.createElement("canvas");
  const formExtendido = document.getElementById("form-extendido") as HTMLFormElement;
  const formReducido = document.getElementById("form-reducido") as HTMLFormElement;

  // Animación de fondo
  lienzo.id = "canvas-fondo";
  lienzo.style.position = "fixed";
  lienzo.style.top = "0";
  lienzo.style.left = "0";
  lienzo.style.width = "100%";
  lienzo.style.height = "100%";
  lienzo.style.zIndex = "-1";
  document.body.appendChild(lienzo);

  const pincel = lienzo.getContext("2d") as CanvasRenderingContext2D;

  const entorno: EntornoEstrella = {
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

  const estrellas: Estrella[] = [];
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

  let misionActual: Mision;

  inicio.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    if (target.tagName !== "BUTTON") return;

    inicio.style.display = "none";
    formAstro.style.display = "flex";
    (formAstro as any).criterioElegido = target.dataset.criterio;
  });

  document.getElementById("aceptar-astro")!.addEventListener("click", () => {
    formAstro.style.display = "none";
    formaEntradaDiv.style.display = "flex";
    botonNuevaMision.style.display = "flex";

    const id = (document.getElementById("astro-id") as HTMLInputElement).value || "AGM001";
    const nombre = (document.getElementById("astro-nombre") as HTMLInputElement).value || "Agmunsen";
    const edad = parseInt((document.getElementById("astro-edad") as HTMLInputElement).value) || 40;
    const astronauta = new Astronauta(id, nombre, edad);

    let criterio: ICriterioValidacion;
    let tipoMaterial: string;

    switch ((formAstro as any).criterioElegido) {
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
      const targetEntrada = e.target as HTMLButtonElement;

      if (!targetEntrada.id) return;

      let entradaSistema: ISistemaEntrada;
      if (targetEntrada.id === "extendida") {
        entradaSistema = new IntroduccionExtendida("mineral-form");
      } else {
        entradaSistema = new IntroduccionReducida("mineral-form");
      }

      misionActual = new Mision(
        astronauta,
        criterio,
        entradaSistema,
        new FormatoEuropeo()
      );
      validarMineralBtn.style.display = "flex";
      mineralFormDiv.style.display = "flex";
    });
  });

  validarMineralBtn.addEventListener("click", () => {
    const formElemento = document.querySelector("#mineral-form form") as HTMLFormElement;
    
    if (!formElemento.checkValidity()) {
      alert("Valores del mineral incompletos o inválidos. Por favor, revise el formulario.");
      return;
    }
    const mineral = misionActual.entrada.dameMineral();
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
