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
      <h3>🪨 Formato Europeo</h3>
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
      <h3>🌕 American Format</h3>
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
class IntroduccionReducida implements ISistemaEntrada {
  private contenedor: HTMLElement;

  constructor(idContenedor: string) {
    const cont = document.getElementById(idContenedor);
    if (!cont) throw new Error("No se encontró el contenedor del formulario reducido");
    this.contenedor = cont;
    this.render();
  }

  private render(): void {
    const opcionesOrigen = Object.values(OrigenMaterialLunar)
      .map(o => `<option value="${o}">${o}</option>`)
      .join('');
    const opcionesClasificacion = Object.values(ClasificacionMaterialLunar)
      .map(c => `<option value="${c}">${c}</option>`)
      .join('');
    const opcionesTextura = Object.values(TexturaMaterialLunar)
      .map(t => `<option value="${t}">${t}</option>`)
      .join('');

    this.contenedor.innerHTML = `
      <h3>Formulario Reducido</h3>
      <form id="form-reducido">
        <input type="text" id="id" placeholder="ID LLDDDDLL" /><br>
        <input type="text" id="nombre" placeholder="Nombre" /><br>
        <select id="origen"><option value="">Origen</option>${opcionesOrigen}</select><br>
        <input type="number" id="dureza" placeholder="Dureza 1-10" /><br>
        <input type="number" id="tamanoGrano" placeholder="Tamaño de grano (mm)" /><br>
        <select id="clasificacion"><option value="">Clasificación</option>${opcionesClasificacion}</select><br>
        <input type="number" id="tamanoCristal" placeholder="Tamaño de cristales" /><br>
        <input type="number" id="temperatura" placeholder="Temperatura (K)" /><br>
        <input type="text" id="estructura" placeholder="Estructura" /><br>
        <select id="textura"><option value="">Textura</option>${opcionesTextura}</select><br>
      </form>
    `;
  }
  dameMineral(): Mineral {
    const id = (document.getElementById("id") as HTMLInputElement).value;
    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    const origen = (document.getElementById("origen") as HTMLSelectElement).value as OrigenMaterialLunar;
    const dureza = parseInt((document.getElementById("dureza") as HTMLInputElement).value);
    const tamañoGrano = parseFloat((document.getElementById("tamanoGrano") as HTMLInputElement).value);
    const clasificacion = (document.getElementById("clasificacion") as HTMLSelectElement).value as ClasificacionMaterialLunar;
    const tamañoCristal = parseInt((document.getElementById("tamanoCristal") as HTMLInputElement).value);
    const temperaturaFormacion = parseInt((document.getElementById("temperatura") as HTMLInputElement).value);
    const estructura = (document.getElementById("estructura") as HTMLInputElement).value;
    const textura = (document.getElementById("textura") as HTMLSelectElement).value as TexturaMaterialLunar;

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

class IntroduccionExtendida implements ISistemaEntrada {
  private contenedor: HTMLElement;

  constructor(idContenedor: string) {
    const cont = document.getElementById(idContenedor);
    if (!cont) throw new Error("No se encontró el contenedor del formulario reducido");
    this.contenedor = cont;
    this.render();
  }

  private render(): void {
    const opcionesOrigen = Object.values(OrigenMaterialLunar)
      .map(o => `<option value="${o}">${o}</option>`)
      .join('');
    const opcionesClasificacion = Object.values(ClasificacionMaterialLunar)
      .map(c => `<option value="${c}">${c}</option>`)
      .join('');
    const opcionesTextura = Object.values(TexturaMaterialLunar)
      .map(t => `<option value="${t}">${t}</option>`)
      .join('');

    this.contenedor.innerHTML = `
      <h3>Formulario Extendido</h3>
      <form id="form-extendido">
        <div><label>ID: </label><input type="text" id="id" /></div>
        <div><label>Nombre: </label><input type="text" id="nombre" /></div>
        <div><label>Origen: </label>
          <select id="origen">${opcionesOrigen}</select>
        </div>
        <div><label>Dureza (1-10): </label><input type="number" id="dureza" min="1" max="10" /></div>
        <div><label>Tamaño de grano (mm): </label><input type="number" id="tamanoGrano" /></div>
        <div><label>Clasificación: </label>
          <select id="clasificacion">${opcionesClasificacion}</select>
        </div>
        <div><label>Tamaño de cristales (0-10): </label><input type="number" id="tamanoCristal" min="0" max="10" /></div>
        <div><label>Temperatura (K): </label><input type="number" id="temperatura" min="-100" max="100" /></div>
        <div><label>Estructura: </label><input type="text" id="estructura" /></div>
        <div><label>Textura: </label>
          <select id="textura">${opcionesTextura}</select>
        </div>
      </form>
    `;
  }
  dameMineral(): Mineral {
    const id = (document.getElementById("id") as HTMLInputElement).value;
    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    const origen = (document.getElementById("origen") as HTMLSelectElement).value as OrigenMaterialLunar;
    const dureza = parseInt((document.getElementById("dureza") as HTMLInputElement).value);
    const tamañoGrano = parseFloat((document.getElementById("tamanoGrano") as HTMLInputElement).value);
    const clasificacion = (document.getElementById("clasificacion") as HTMLSelectElement).value as ClasificacionMaterialLunar;
    const tamañoCristal = parseInt((document.getElementById("tamanoCristal") as HTMLInputElement).value);
    const temperaturaFormacion = parseInt((document.getElementById("temperatura") as HTMLInputElement).value);
    const estructura = (document.getElementById("estructura") as HTMLInputElement).value;
    const textura = (document.getElementById("textura") as HTMLSelectElement).value as TexturaMaterialLunar;

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

window.onload = () => {
  const inicio = document.getElementById("inicio-mision")!;
  const formaEntradaDiv = document.getElementById("forma-entrada")!;
  const datosMisionDiv = document.getElementById("datos-mision")!;
  const botonNuevaMision = document.getElementById("nueva-mision")!;
  const resultadoDiv = document.getElementById("resultado")!;

  let misionActual: Mision;

  inicio.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    if(target.tagName !== "BUTTON") return;

    const nombrePiloto = (document.getElementById("nombre-astronauta") as HTMLInputElement).value || "Agmunsen";
    let criterio: ICriterioValidacion;
    let tipoMaterial: string;

    switch(target.dataset.criterio){
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

    const astronauta = new Astronauta("AGM001", nombrePiloto, 45);

    datosMisionDiv.innerHTML = `
      <p><strong>Astronauta:</strong> ${nombrePiloto}</p>
      <p><strong>Fecha inicio:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Tipo de material a recolectar:</strong> ${tipoMaterial}</p>
    `;

    formaEntradaDiv.innerHTML = `
      <button id="extendida">Forma Extendida</button>
      <button id="reducida">Forma Reducida</button>
    `;

    formaEntradaDiv.addEventListener("click", (e) => {
      const targetEntrada = e.target as HTMLButtonElement;
      if(!targetEntrada.id) return;

      let entradaSistema: ISistemaEntrada;
      if(targetEntrada.id === "extendida") {
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
    });
  });

  document.getElementById("validar-mineral")!.addEventListener("click",()=>{
    if(!misionActual) {
      alert("Primero selecciona un criterio y una forma de entrada");
      return;
    }

    const mineral = misionActual.entrada.dameMineral();
    const esValido = misionActual.criterio.esValido(mineral);

    const formatoEuropeo = new FormatoEuropeo();
    const formatoAmericano = new FormatoAmericano();

    resultadoDiv.innerHTML = `
      <h2>Misión de ${misionActual.piloto.dameNombre()}</h2>
      <p><strong>Criterio:</strong> ${misionActual.criterio.descripcion()}</p>
      <p><strong>Resultado:</strong> ${esValido ? "✅ Válido" : "❌ No válido"}</p>
      <div style="display:flex; gap:30px; flex-wrap:wrap;">
        <div style="border:1px solid #ccc; padding:10px; width:45%;">${formatoEuropeo.muestra(mineral)}</div>
        <div style="border:1px solid #ccc; padding:10px; width:45%;">${formatoAmericano.muestra(mineral)}</div>
      </div>
      <div class="emojis">${esValido ? "😄" : "😠"}</div>
    `;
  });

  botonNuevaMision.addEventListener("click",()=>{
    location.reload();
  });
};