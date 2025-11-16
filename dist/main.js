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
var Mineral = /** @class */ (function () {
    function Mineral(id, nombre, origen, dureza, tamañoGrano, clasificacion, tamañoCristal, temperaturaFormacion, estructura, textura) {
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
    Mineral.prototype.capturar = function () {
        return this;
    };
    Mineral.prototype.dameTamañoGrano = function () {
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
    };
    return Mineral;
}());
var CriterioIgneas = /** @class */ (function () {
    function CriterioIgneas() {
    }
    CriterioIgneas.prototype.descripcion = function () {
        return "Criterio Ígneas: Origen ígneo y grano muy grueso.";
    };
    CriterioIgneas.prototype.esValido = function (mineral) {
        return (mineral.origen === OrigenMaterialLunar.Igneas &&
            mineral.dameTamañoGrano() === "Grano muy grueso");
    };
    return CriterioIgneas;
}());
var CriterioMetamorficas = /** @class */ (function () {
    function CriterioMetamorficas() {
    }
    CriterioMetamorficas.prototype.descripcion = function () {
        return "Criterio Metamórficas: Origen metamórfico, grano medio/fino y textura vítrea.";
    };
    CriterioMetamorficas.prototype.esValido = function (mineral) {
        var grano = mineral.dameTamañoGrano();
        return (mineral.origen === OrigenMaterialLunar.Metamoficas &&
            (grano === "Grano fino" || grano === "Grano medio") &&
            mineral.textura === TexturaMaterialLunar.Vitrea);
    };
    return CriterioMetamorficas;
}());
var CriterioSedimentarias = /** @class */ (function () {
    function CriterioSedimentarias() {
    }
    CriterioSedimentarias.prototype.descripcion = function () {
        return "Criterio Sedimentarias: Origen sedimentario y textura fanerítica.";
    };
    CriterioSedimentarias.prototype.esValido = function (mineral) {
        return (mineral.origen === OrigenMaterialLunar.Sedimentarias &&
            mineral.textura === TexturaMaterialLunar.Faneritica);
    };
    return CriterioSedimentarias;
}());
var FormatoEuropeo = /** @class */ (function () {
    function FormatoEuropeo() {
    }
    FormatoEuropeo.prototype.muestra = function (mineral) {
        return "\n      <h3>Formato Europeo</h3>\n      <p><strong>ID:</strong> ".concat(mineral.id, "</p>\n      <p><strong>Nombre:</strong> ").concat(mineral.nombre, "</p>\n      <p><strong>Origen:</strong> ").concat(mineral.origen, "</p>\n      <p><strong>Dureza:</strong> ").concat(mineral.dureza, " / 10</p>\n      <p><strong>Tama\u00F1o de grano:</strong> ").concat(mineral.dameTamañoGrano(), " (").concat(mineral.tamañoGrano, " mm)</p>\n      <p><strong>Clasificaci\u00F3n:</strong> ").concat(mineral.clasificacion, "</p>\n      <p><strong>Tama\u00F1o de cristales:</strong> ").concat(mineral.tamañoCristal, "</p>\n      <p><strong>Temperatura de formaci\u00F3n:</strong> ").concat((mineral.temperaturaFormacion).toFixed(2), " \u00B0C</p>\n      <p><strong>Estructura:</strong> ").concat(mineral.estructura, "</p>\n      <p><strong>Textura:</strong> ").concat(mineral.textura, "</p>\n    ");
    };
    return FormatoEuropeo;
}());
var FormatoAmericano = /** @class */ (function () {
    function FormatoAmericano() {
    }
    FormatoAmericano.prototype.muestra = function (mineral) {
        return "\n      <h3>American Format</h3>\n      <p><strong>ID:</strong> ".concat(mineral.id, "</p>\n      <p><strong>Name:</strong> ").concat(mineral.nombre, "</p>\n      <p><strong>Origin:</strong> ").concat(mineral.origen, "</p>\n      <p><strong>Hardness:</strong> ").concat(mineral.dureza, " / 10</p>\n      <p><strong>Grain size:</strong> ").concat(mineral.dameTamañoGrano(), " (").concat(mineral.tamañoGrano, " mm)</p>\n      <p><strong>Classification:</strong> ").concat(mineral.clasificacion, "</p>\n      <p><strong>Crystal size:</strong> ").concat(mineral.tamañoCristal, "</p>\n      <p><strong>Formation temperature:</strong> ").concat(((mineral.temperaturaFormacion) * 9 / 5 + 32).toFixed(2), " \u00B0F</p>\n      <p><strong>Structure:</strong> ").concat(mineral.estructura, "</p>\n      <p><strong>Texture:</strong> ").concat(mineral.textura, "</p>\n    ");
    };
    return FormatoAmericano;
}());
var IntroduccionExtendida = /** @class */ (function () {
    function IntroduccionExtendida(idContenedor) {
        var cont = document.getElementById(idContenedor);
        if (!cont)
            throw new Error("No se encontró el contenedor del formulario extendido");
        this.contenedor = cont;
        this.render();
    }
    IntroduccionExtendida.prototype.render = function () {
        var opcionesOrigen = Object.values(OrigenMaterialLunar);
        var opcionesClasificacion = Object.values(ClasificacionMaterialLunar);
        var opcionesTextura = Object.values(TexturaMaterialLunar);
        this.contenedor.innerHTML = "\n      <h3>Formulario Extendido</h3>\n      <form class=\"form-extendido\" id=\"form-extendido\" novalidate>\n        <div id=\"ext-elemento\">\n          <label for=\"ext-id\">ID (LLDDDDLL)</label>\n          <input id=\"ext-id\" type=\"text\" required pattern=\"[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}\" />\n        </div>\n\n        <div id=\"ext-elemento\">\n          <label for=\"ext-nombre\">Nombre</label>\n          <input id=\"ext-nombre\" type=\"text\" required />\n        </div>\n\n        <div id=\"ext-elemento\">\n          <label for=\"ext-origen\">Origen</label>\n          <select id=\"ext-origen\" required>\n            <option value=\"\">Seleccione</option>\n            ".concat(opcionesOrigen.map(function (o) { return "<option value=\"".concat(o, "\">").concat(o, "</option>"); }).join(''), "\n          </select>\n        </div>\n\n        <div id=\"ext-elemento\">\n          <label for=\"ext-dureza\">Dureza (1-10)</label>\n          <input id=\"ext-dureza\" type=\"number\" step=\"1\" min=\"1\" max=\"10\" required />\n        </div>\n\n        <div id=\"ext-elemento\">\n          <label for=\"ext-tamanoGrano\">Tama\u00F1o de grano (mm)</label>\n          <input id=\"ext-tamanoGrano\" type=\"number\" step=\"1\" min=\"1\" required />\n        </div>\n\n        <div id=\"ext-elemento\">\n          <label for=\"ext-clasificacion\">Clasificaci\u00F3n</label>\n          <select id=\"ext-clasificacion\" required>\n            <option value=\"\">Seleccione</option>\n            ").concat(opcionesClasificacion.map(function (c) { return "<option value=\"".concat(c, "\">").concat(c, "</option>"); }).join(''), "\n          </select>\n        </div>\n\n        <div id=\"ext-elemento\">\n          <label for=\"ext-tamanoCristal\">Tama\u00F1o de cristales</label>\n          <input id=\"ext-tamanoCristal\" type=\"number\" step=\"1\" min=\"0\" max=\"10\" required />\n        </div>\n\n        <div id=\"ext-elemento\" >\n          <label for=\"ext-temperatura\">Temperatura (K)</label>\n          <input id=\"ext-temperatura\" type=\"number\" step=\"1\" min=\"-100\" max=\"100\" required />\n        </div>\n\n        <div id=\"ext-elemento\">\n          <label for=\"ext-textura\">Textura</label>\n          <select id=\"ext-textura\" required>\n            <option value=\"\">Seleccione</option>\n            ").concat(opcionesTextura.map(function (t) { return "<option value=\"".concat(t, "\">").concat(t, "</option>"); }).join(''), "\n          </select>\n        </div>\n\n        <div id=\"ext-elemento-estructura\">\n          <label for=\"ext-estructura\">Estructura</label>\n          <input id=\"ext-estructura\" class=\"campo-estructura\" type=\"text\" required />\n        </div>\n      </form>\n    ");
    };
    IntroduccionExtendida.prototype.leerCamposSimples = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        return ids.map(function (id) {
            var el = document.getElementById(id);
            if (!el)
                throw new Error("No existe el elemento con id ".concat(id));
            return el.value;
        });
    };
    IntroduccionExtendida.prototype.dameMineral = function () {
        var _a = this.leerCamposSimples("ext-id", "ext-nombre", "ext-origen", "ext-dureza", "ext-tamanoGrano", "ext-clasificacion", "ext-tamanoCristal", "ext-temperatura", "ext-estructura", "ext-textura"), id = _a[0], nombre = _a[1], origen = _a[2], dureza = _a[3], tamGrano = _a[4], clasificacion = _a[5], tamCristal = _a[6], temperatura = _a[7], estructura = _a[8], textura = _a[9];
        return new Mineral(id !== null && id !== void 0 ? id : "", nombre !== null && nombre !== void 0 ? nombre : "", origen, parseFloat(dureza !== null && dureza !== void 0 ? dureza : "0"), parseFloat(tamGrano !== null && tamGrano !== void 0 ? tamGrano : "0"), clasificacion, parseFloat(tamCristal !== null && tamCristal !== void 0 ? tamCristal : "0"), parseFloat(temperatura !== null && temperatura !== void 0 ? temperatura : "0"), estructura !== null && estructura !== void 0 ? estructura : "", textura);
    };
    IntroduccionExtendida.prototype.validarFormulario = function () {
        var _a, _b, _c;
        var ids = [
            "ext-id",
            "ext-nombre",
            "ext-origen",
            "ext-dureza",
            "ext-tamanoGrano",
            "ext-clasificacion",
            "ext-tamanoCristal",
            "ext-temperatura",
            "ext-estructura",
            "ext-textura"
        ];
        var valores = this.leerCamposSimples.apply(this, ids);
        for (var i = 0; i < ids.length; i++) {
            if (((_a = valores[i]) !== null && _a !== void 0 ? _a : "").trim() === "") {
                var nombreCampo = ((_b = ids[i]) !== null && _b !== void 0 ? _b : "").slice(4);
                return "El campo \"".concat(nombreCampo, "\" es obligatorio.");
            }
        }
        var idValor = (_c = valores[0]) !== null && _c !== void 0 ? _c : "";
        var regexID = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
        if (!regexID.test(idValor)) {
            return "El ID debe tener el formato LLDDDDLL (ejemplo: AB1234CD).";
        }
        return null;
    };
    return IntroduccionExtendida;
}());
var IntroduccionReducida = /** @class */ (function () {
    function IntroduccionReducida(idContenedor) {
        var cont = document.getElementById(idContenedor);
        if (!cont)
            throw new Error("No se encontró el contenedor del formulario reducido");
        this.contenedor = cont;
        this.render();
    }
    IntroduccionReducida.prototype.render = function () {
        var opcionesOrigen = Object.values(OrigenMaterialLunar);
        var opcionesClasificacion = Object.values(ClasificacionMaterialLunar);
        var opcionesTextura = Object.values(TexturaMaterialLunar);
        this.contenedor.innerHTML = "\n      <h3>Formulario Reducido</h3>\n      <form class=\"form-reducido\" id=\"form-reducido\" novalidate>\n\n        <input id=\"red-id\" type=\"text\" placeholder=\"ID (LLDDDDLL)\" required pattern=\"[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}\" />\n\n        <input id=\"red-nombre\" type=\"text\" placeholder=\"Nombre del mineral\" required />\n\n        <input id=\"red-origen\" list=\"lista-origen\" type=\"text\" placeholder=\"Origen\" required />\n        <datalist id=\"lista-origen\">\n          ".concat(opcionesOrigen.map(function (o) { return "<option value=\"".concat(o, "\"></option>"); }).join(''), "\n        </datalist>\n\n        <input id=\"red-clasificacion\" list=\"lista-clasificacion\" type=\"text\" placeholder=\"Clasificaci\u00F3n\" required />\n        <datalist id=\"lista-clasificacion\">\n          ").concat(opcionesClasificacion.map(function (c) { return "<option value=\"".concat(c, "\"></option>"); }).join(''), "\n        </datalist>\n\n        <input id=\"red-textura\" list=\"lista-textura\" type=\"text\" placeholder=\"Textura\" required />\n        <datalist id=\"lista-textura\">\n          ").concat(opcionesTextura.map(function (t) { return "<option value=\"".concat(t, "\"></option>"); }).join(''), "\n        </datalist>\n\n        <input id=\"red-dureza\" type=\"number\" step=\"1\" min=\"1\" max=\"10\" placeholder=\"Dureza (1-10)\" required />\n\n        <input id=\"red-tamano\" type=\"number\" step=\"1\" min=\"0\" placeholder=\"Tama\u00F1o del grano (mm)\" required />\n\n        <input id=\"red-tamanoCristal\" type=\"number\" step=\"1\" min=\"0\" max=\"10\" placeholder=\"Tama\u00F1o de cristal\" required />\n    \n        <input id=\"red-temperatura\" type=\"number\" step=\"1\" min=\"-100\" max=\"100\" placeholder=\"Temperatura de formaci\u00F3n (K)\" required />\n\n        <input id=\"red-estructura\" type=\"text\" placeholder=\"Estructura\" required />\n      </form>\n    ");
    };
    IntroduccionReducida.prototype.leerCamposSimples = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        return ids.map(function (id) {
            var el = document.getElementById(id);
            if (!el)
                throw new Error("No existe el elemento con id ".concat(id));
            return el.value;
        });
    };
    IntroduccionReducida.prototype.dameMineral = function () {
        var _a = this.leerCamposSimples("red-id", "red-nombre", "red-origen", "red-clasificacion", "red-textura", "red-dureza", "red-tamano", "red-tamanoCristal", "red-temperatura", "red-estructura"), id = _a[0], nombre = _a[1], origen = _a[2], clasificacion = _a[3], textura = _a[4], dureza = _a[5], tamGrano = _a[6], tamCristal = _a[7], temperatura = _a[8], estructura = _a[9];
        return new Mineral(id !== null && id !== void 0 ? id : "", nombre !== null && nombre !== void 0 ? nombre : "", origen, parseFloat(dureza !== null && dureza !== void 0 ? dureza : "0"), parseFloat(tamGrano !== null && tamGrano !== void 0 ? tamGrano : "0"), clasificacion, parseFloat(tamCristal !== null && tamCristal !== void 0 ? tamCristal : "0"), parseFloat(temperatura !== null && temperatura !== void 0 ? temperatura : "0"), estructura !== null && estructura !== void 0 ? estructura : "", textura);
    };
    IntroduccionReducida.prototype.validarFormulario = function () {
        var _a, _b, _c;
        var ids = [
            "red-id",
            "red-nombre",
            "red-origen",
            "red-clasificacion",
            "red-textura",
            "red-dureza",
            "red-tamano",
            "red-tamanoCristal",
            "red-temperatura",
            "red-estructura"
        ];
        var valores = this.leerCamposSimples.apply(this, ids);
        for (var i = 0; i < ids.length; i++) {
            if (((_a = valores[i]) !== null && _a !== void 0 ? _a : "").trim() === "") {
                var nombreCampo = ((_b = ids[i]) !== null && _b !== void 0 ? _b : "").slice(4);
                return "El campo \"".concat(nombreCampo, "\" es obligatorio.");
            }
        }
        var idValor = (_c = valores[0]) !== null && _c !== void 0 ? _c : "";
        var regexID = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
        if (!regexID.test(idValor)) {
            return "El ID debe seguir el formato LLDDDDLL (ejemplo: AB1234CD).";
        }
        return null;
    };
    return IntroduccionReducida;
}());
var Astronauta = /** @class */ (function () {
    function Astronauta(identificador, nombreCompleto, edad) {
        this.identificador = identificador;
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
    }
    Astronauta.prototype.dameId = function () { return this.identificador; };
    Astronauta.prototype.dameNombre = function () { return this.nombreCompleto; };
    Astronauta.prototype.dameEdad = function () { return this.edad; };
    return Astronauta;
}());
var Mision = /** @class */ (function () {
    function Mision(piloto, criterio, entrada, salida) {
        this.piloto = piloto;
        this.criterio = criterio;
        this.entrada = entrada;
        this.salida = salida;
    }
    Mision.prototype.analiza = function () {
        var mineral = this.entrada.dameMineral();
        var esValido = this.criterio.esValido(mineral);
        var resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = "\n      <h2>Misi\u00F3n de ".concat(this.piloto.dameNombre(), "</h2>\n      <p><strong>Criterio:</strong> ").concat(this.criterio.descripcion(), "</p>\n      <p><strong>Resultado:</strong> ").concat(esValido ? "✅ Válido" : "❌ No válido", "</p>\n      <div>").concat(this.salida.muestra(mineral), "</div>\n      <div style=\"font-size:2em;\">").concat(esValido ? "😄" : "😠", "</div>\n    ");
        return esValido;
    };
    return Mision;
}());
var Estrella = /** @class */ (function () {
    function Estrella(entorno) {
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
    Estrella.prototype.iniciarPosicionAleatoria = function () {
        this.x = Math.random() * this.entorno.ancho;
        this.y = Math.random() * this.entorno.alto;
        this.velocidad = 2 + Math.random() * 3;
        this.longitud = 15 + Math.random() * 25;
        this.opacidad = this.esMeteoro ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.5;
        this.dx = this.velocidad;
        this.dy = this.velocidad * 0.3;
        this.color = this.esMeteoro
            ? "rgba(".concat(200 + Math.random() * 55, ",").concat(200 + Math.random() * 55, ",255,")
            : "rgba(255,255,255,";
        this.estela = [];
    };
    Estrella.prototype.reiniciar = function () {
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
            ? "rgba(".concat(200 + Math.random() * 55, ",").concat(200 + Math.random() * 55, ",255,")
            : "rgba(255,255,255,";
        this.estela = [];
    };
    Estrella.prototype.dibujar = function (pincel, entorno) {
        this.estela.push({ x: this.x, y: this.y });
        if (this.estela.length > this.longitud)
            this.estela.shift();
        for (var i = 0; i < this.estela.length - 1; i++) {
            var p1 = this.estela[i];
            var p2 = this.estela[i + 1];
            if (!p1 || !p2)
                continue;
            var alfa = (i / this.estela.length) * this.opacidad;
            pincel.beginPath();
            pincel.moveTo(p1.x, p1.y);
            pincel.lineTo(p2.x, p2.y);
            pincel.strokeStyle = "".concat(this.color).concat(alfa, ")");
            pincel.lineWidth = this.esMeteoro ? 3 : 2;
            pincel.stroke();
        }
        pincel.beginPath();
        pincel.arc(this.x, this.y, this.esMeteoro ? 4 : 3, 0, Math.PI * 2);
        pincel.fillStyle = "".concat(this.color).concat(this.opacidad + 0.3, ")");
        pincel.fill();
        this.x -= this.dx;
        this.y += this.dy;
        var primero = this.estela[0];
        if (primero && (primero.x < -50 || primero.y > entorno.alto + 50)) {
            this.reiniciar();
        }
    };
    return Estrella;
}());
window.onload = function () {
    var inicio = document.getElementById("inicio-mision");
    var formaEntradaDiv = document.getElementById("forma-entrada");
    var datosMisionDiv = document.getElementById("datos-mision");
    var mineralFormDiv = document.getElementById("mineral-form");
    var botonNuevaMision = document.getElementById("nueva-mision");
    var resultadoDiv = document.getElementById("resultado");
    var validarMineralBtn = document.getElementById("validar-mineral");
    var formAstro = document.getElementById("form-astronauta");
    var lienzo = document.createElement("canvas");
    // Animación de fondo
    lienzo.id = "canvas-fondo";
    lienzo.style.position = "fixed";
    lienzo.style.top = "0";
    lienzo.style.left = "0";
    lienzo.style.width = "100%";
    lienzo.style.height = "100%";
    lienzo.style.zIndex = "-1";
    document.body.appendChild(lienzo);
    var pincel = lienzo.getContext("2d");
    var entorno = {
        ancho: window.innerWidth,
        alto: window.innerHeight
    };
    var ajustarTamano = function () {
        entorno.ancho = window.innerWidth;
        entorno.alto = window.innerHeight;
        lienzo.width = entorno.ancho;
        lienzo.height = entorno.alto;
    };
    window.addEventListener("resize", ajustarTamano);
    ajustarTamano();
    var estrellas = [];
    for (var i = 0; i < 150; i++) {
        estrellas.push(new Estrella(entorno));
    }
    var animar = function () {
        pincel.clearRect(0, 0, entorno.ancho, entorno.alto);
        estrellas.forEach(function (e) { return e.dibujar(pincel, entorno); });
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
    var misionActual;
    inicio.addEventListener("click", function (e) {
        var target = e.target;
        if (target.tagName !== "BUTTON")
            return;
        inicio.style.display = "none";
        formAstro.style.display = "flex";
        formAstro.criterioElegido = target.dataset.criterio;
    });
    document.getElementById("aceptar-astro").addEventListener("click", function () {
        formAstro.style.display = "none";
        formaEntradaDiv.style.display = "flex";
        botonNuevaMision.style.display = "flex";
        var id = document.getElementById("astro-id").value || "AGM001";
        var nombre = document.getElementById("astro-nombre").value || "Agmunsen";
        var edad = parseInt(document.getElementById("astro-edad").value) || 40;
        var astronauta = new Astronauta(id, nombre, edad);
        var criterio;
        var tipoMaterial;
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
        datosMisionDiv.innerHTML = "\n      <h2>Datos de la Misi\u00F3n</h2>\n      <p><strong>Astronauta:</strong> ".concat(astronauta.dameNombre(), "</p>\n      <p><strong>Identificador:</strong> ").concat(astronauta.dameId(), "</p>\n      <p><strong>Edad:</strong> ").concat(astronauta.dameEdad(), "</p>\n      <p><strong>Fecha inicio:</strong> ").concat(new Date().toLocaleString(), "</p>\n      <p><strong>Tipo de material a recolectar:</strong> ").concat(tipoMaterial, "</p>\n    ");
        datosMisionDiv.style.display = "flex";
        formaEntradaDiv.innerHTML = "\n      <button id=\"extendida\">Forma Extendida</button>\n      <button id=\"reducida\">Forma Reducida</button>\n    ";
        formaEntradaDiv.addEventListener("click", function (e) {
            var targetEntrada = e.target;
            if (!targetEntrada.id)
                return;
            var entradaSistema;
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
    validarMineralBtn.addEventListener("click", function () {
        var mineral = misionActual.entrada.dameMineral();
        var checkValidity = misionActual.entrada.validarFormulario();
        if (checkValidity !== null) {
            alert(checkValidity);
            return;
        }
        var esValido = misionActual.criterio.esValido(mineral);
        var formatoEuropeo = new FormatoEuropeo();
        var formatoAmericano = new FormatoAmericano();
        resultadoDiv.innerHTML = "\n      <h2>Misi\u00F3n de ".concat(misionActual.piloto.dameNombre(), "</h2>\n      <p> ").concat(misionActual.criterio.descripcion(), "</p>\n      <p><strong>Resultado:</strong> ").concat(esValido ? "✅ Válido" : "❌ No válido", "</p>\n      <div style=\"display:flex; gap:30px; flex-wrap:wrap;\">\n        <div style=\"border:1px solid #ccc; padding:10px; width:45%;\">").concat(formatoEuropeo.muestra(mineral), "</div>\n        <div style=\"border:1px solid #ccc; padding:10px; width:45%;\">").concat(formatoAmericano.muestra(mineral), "</div>\n      </div>\n      <div class=\"emojis\">").concat(esValido ? "😄" : "😠", "</div>\n    ");
        resultadoDiv.style.display = "flex";
    });
    botonNuevaMision.addEventListener("click", function () { return location.reload(); });
};
