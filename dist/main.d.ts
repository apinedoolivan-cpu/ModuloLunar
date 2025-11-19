interface ICapturable {
    capturar(): Mineral;
}
interface ICriterioValidacion {
    descripcion(): string;
    esValido(mineral: Mineral): boolean;
}
interface ISistemaEntrada {
    dameMineral(): Mineral;
    validarFormulario(): string | null;
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
declare enum OrigenMaterialLunar {
    Igneas = "\u00CDgneas",
    Metamoficas = "Metam\u00F3rficas",
    Sedimentarias = "Sedimentarias"
}
declare enum ClasificacionMaterialLunar {
    RocasConstruccion = "Rocas de construcci\u00F3n: Son aquellas rocas que se usan para la construcci\u00F3n de diferentes estructuras.",
    RocaOrnamental = "Roca ornamental: Son todas aquellas rocas de uso decorativo,integrado o no en edificio o estructuras superiores.",
    Utensilios = "Utensilios: Rocas de uso en utensilios para el hombre.",
    PiedraMachada = "Piedras machacadas: \u00C1ridos, ripios, agregados, etc. que son muy utilizados en la construcci\u00F3n como material de relleno."
}
declare enum TexturaMaterialLunar {
    Vitrea = "V\u00EDtrea",
    Afanitica = "Afan\u00EDtica",
    Faneritica = "Faner\u00EDtica"
}
declare class Mineral implements ICapturable {
    id: string;
    nombre: string;
    origen: OrigenMaterialLunar;
    dureza: number;
    tamañoGrano: number;
    clasificacion: ClasificacionMaterialLunar;
    tamañoCristal: number;
    temperaturaFormacion: number;
    estructura: string;
    textura: TexturaMaterialLunar;
    constructor(id: string, nombre: string, origen: OrigenMaterialLunar, dureza: number, tamañoGrano: number, clasificacion: ClasificacionMaterialLunar, tamañoCristal: number, temperaturaFormacion: number, estructura: string, textura: TexturaMaterialLunar);
    capturar(): Mineral;
    dameTamañoGrano(): string;
}
declare class CriterioIgneas implements ICriterioValidacion {
    descripcion(): string;
    esValido(mineral: Mineral): boolean;
}
declare class CriterioMetamorficas implements ICriterioValidacion {
    descripcion(): string;
    esValido(mineral: Mineral): boolean;
}
declare class CriterioSedimentarias implements ICriterioValidacion {
    descripcion(): string;
    esValido(mineral: Mineral): boolean;
}
declare class CriterioFactoria {
    criterio: ICriterioValidacion;
    constructor(mineral: Mineral);
}
declare class FormatoEuropeo implements ISistemaSalida {
    muestra(mineral: Mineral): string;
}
declare class FormatoAmericano implements ISistemaSalida {
    muestra(mineral: Mineral): string;
}
declare abstract class BaseFormularioMineral implements ISistemaEntrada {
    protected contenedor: HTMLElement;
    protected campos: string[];
    protected opcionesOrigen: string[];
    protected opcionesClasificacion: string[];
    protected opcionesTextura: string[];
    constructor(idContenedor: string);
    protected abstract render(): void;
    protected leerCamposSimples(...ids: string[]): string[];
    validarFormulario(): string | null;
    dameMineral(): Mineral;
}
declare class IntroduccionReducida extends BaseFormularioMineral {
    protected render(): void;
}
declare class IntroduccionExtendida extends BaseFormularioMineral {
    protected render(): void;
}
declare class Astronauta implements IPilotable {
    private identificador;
    private nombreCompleto;
    private edad;
    constructor(identificador: string, nombreCompleto: string, edad: number);
    dameId(): string;
    dameNombre(): string;
    dameEdad(): number;
}
declare class Mision implements IMisionable {
    piloto: IPilotable;
    entrada: ISistemaEntrada;
    salida: ISistemaSalida;
    criterio: ICriterioValidacion;
    constructor(piloto: IPilotable, entrada: ISistemaEntrada, salida: ISistemaSalida);
    analiza(): boolean;
}
declare class Estrella {
    esMeteoro: boolean;
    x: number;
    y: number;
    velocidad: number;
    longitud: number;
    opacidad: number;
    dx: number;
    dy: number;
    color: string;
    estela: Punto[];
    entorno: EntornoEstrella;
    constructor(entorno: EntornoEstrella);
    iniciarPosicionAleatoria(): void;
    reiniciar(): void;
    dibujar(pincel: CanvasRenderingContext2D, entorno: EntornoEstrella): void;
}
//# sourceMappingURL=main.d.ts.map