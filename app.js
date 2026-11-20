
/* ===========================================
   LUCKY SHOES - CUADRO DE MANDO INTEGRAL
   Dashboard Rosa Empolvado
=========================================== */

// PALETA ORIGINAL - NO MODIFICADA
const COLORES_LUCKY = {
    financiera: '#956582',
    cliente: '#A6788D',
    procesos: '#C9918A',
    aprendizaje: '#926A9B',
    principal: '#A6788D',
    oscuro: '#382B36',
    fondoGrafico: '#F0E4E9',
    borde: '#E8D9D7'
};

// DATOS INICIALES DEL EXCEL
const datosIniciales = {
    financiera: {
        id: 'financiera',
        nombre: 'Perspectiva Financiera',
        color: COLORES_LUCKY.financiera,
        bgLight: 'bg-emerald-50',
        textCol: 'text-emerald-700',
        descripcion: 'Incrementar las ventas y mejorar la rentabilidad mediante una gestión eficiente de costos.',
        indicadores: [
            {
                id: 'fin_1',
                objetivo: '1. Ventas',
                nombre: 'Tasa de crecimiento de ventas',
                actual: 5,
                meta: 15,
                unidad: '%',
                frecuencia: 'Mensual',
                fuente: 'Registro de Ventas',
                responsable: 'Gerente de ventas',
                iniciativa: 'Campañas promocionales',
                estrategiaDetalle: 'Incrementar las ventas mensuales de calzado femenino.'
            },
            {
                id: 'fin_2',
                objetivo: '2. Rentabilidad',
                nombre: 'Margen de utilidad neta',
                actual: 10,
                meta: 20,
                unidad: '%',
                frecuencia: 'Trimestral',
                fuente: 'Estados financieros',
                responsable: 'Gerentes financieros',
                iniciativa: 'Optimizar costos',
                estrategiaDetalle: 'Aumentar la rentabilidad mediante una mejor gestión de costos.'
            }
        ]
    },

    cliente: {
        id: 'cliente',
        nombre: 'Perspectiva del Cliente',
        color: COLORES_LUCKY.cliente,
        bgLight: 'bg-rose-50',
        textCol: 'text-rose-700',
        descripcion: 'Mejorar la satisfacción y fidelización de las clientas mediante atención personalizada.',
        indicadores: [
            {
                id: 'cli_1',
                objetivo: '3. Satisfacción',
                nombre: 'Índice de satisfacción',
                actual: 75,
                meta: 95,
                unidad: '%',
                frecuencia: 'Mensual',
                fuente: 'Encuestas',
                responsable: 'Encargado de atención',
                iniciativa: 'Encuestas de satisfacción',
                estrategiaDetalle: 'Incrementar la satisfacción mediante una atención personalizada.'
            },
            {
                id: 'cli_2',
                objetivo: '4. Fidelización',
                nombre: 'Tasa de recompra',
                actual: 40,
                meta: 65,
                unidad: '%',
                frecuencia: 'Trimestral',
                fuente: 'Registro de clientes',
                responsable: 'Gerente de ventas',
                iniciativa: 'Descuentos para clientes frecuentes',
                estrategiaDetalle: 'Fidelizar a las clientas mediante descuentos y promociones especiales.'
            }
        ]
    },

    procesos: {
        id: 'procesos',
        nombre: 'Perspectiva de Procesos Internos',
        color: COLORES_LUCKY.procesos,
        bgLight: 'bg-amber-50',
        textCol: 'text-amber-700',
        descripcion: 'Optimizar los inventarios y garantizar la calidad del calzado.',
        indicadores: [
            {
                id: 'pro_1',
                objetivo: '5. Inventarios',
                nombre: 'Disponibilidad de productos',
                actual: 80,
                meta: 95,
                unidad: '%',
                frecuencia: 'Mensual',
                fuente: 'Registro de inventarios',
                responsable: 'Encargado de almacén',
                iniciativa: 'Control digital de inventarios',
                estrategiaDetalle: 'Optimizar inventarios para evitar la falta de modelos y tallas.'
            },
            {
                id: 'pro_2',
                objetivo: '6. Calidad',
                nombre: 'Porcentaje de productos conformes',
                actual: 90,
                meta: 98,
                unidad: '%',
                frecuencia: 'Mensual',
                fuente: 'Registro de control de calidad',
                responsable: 'Encargado de calidad',
                iniciativa: 'Inspección del calzado',
                estrategiaDetalle: 'Mejorar los procesos de control de calidad del calzado.'
            }
        ]
    },

    aprendizaje: {
        id: 'aprendizaje',
        nombre: 'Aprendizaje y Crecimiento',
        color: COLORES_LUCKY.aprendizaje,
        bgLight: 'bg-sky-50',
        textCol: 'text-sky-700',
        descripcion: 'Fortalecer las habilidades de marketing digital y promover la innovación del equipo.',
        indicadores: [
            {
                id: 'apr_1',
                objetivo: '7. Marketing',
                nombre: 'Alcance de campañas digitales',
                actual: 5000,
                meta: 10000,
                unidad: ' personas',
                frecuencia: 'Mensual',
                fuente: 'Meta Business Suite',
                responsable: 'Encargado de Marketing',
                iniciativa: 'Publicidad en redes sociales',
                estrategiaDetalle: 'Fortalecer las habilidades de marketing digital del equipo.'
            },
            {
                id: 'apr_2',
                objetivo: '8. Innovación',
                nombre: 'Número de mejoras implementadas',
                actual: 2,
                meta: 6,
                unidad: ' mejoras',
                frecuencia: 'Semestral',
                fuente: 'Registro de mejoras',
                responsable: 'Gerente general',
                iniciativa: 'Implementar nuevas estrategias',
                estrategiaDetalle: 'Promover la participación de los trabajadores en propuestas de mejora.'
            }
        ]
    }
};

// ALMACENAMIENTO LOCAL
function copiarDatos(datos) {
    return JSON.parse(JSON.stringify(datos));
}

let bscData;

try {
    const guardados = JSON.parse(
        localStorage.getItem('luckyShoesBSC')
    );

    const valido = guardados &&
        Object.keys(datosIniciales).every(key =>
            Array.isArray(guardados[key]?.indicadores) &&
            guardados[key].indicadores.length === 2
        );

    bscData = valido
        ? guardados
        : copiarDatos(datosIniciales);

} catch (error) {
    bscData = copiarDatos(datosIniciales);
}

// MANTENER LOS COLORES ORIGINALES
function aplicarColores() {
    Object.keys(datosIniciales).forEach(key => {
        bscData[key].color = COLORES_LUCKY[key];
    });
}

aplicarColores();

let vistaActual = 'general';
let chartsActivos = [];
let indicadorEditando = null;

// CALCULAR CUMPLIMIENTO
function calcularCumplimiento(ind) {
    if (ind.meta <= 0) return 0;

    return Math.min(
        Math.max(Math.round(ind.actual / ind.meta * 100), 0),
        100
    );
}

function calcularPromedioPerspectiva(key) {
    const indicadores = bscData[key].indicadores;

    const suma = indicadores.reduce(
        (total, ind) => total + calcularCumplimiento(ind),
        0
    );

    return Math.round(suma / indicadores.length);
}

function destruirGraficas() {
    chartsActivos.forEach(grafico => grafico.destroy());
    chartsActivos = [];
}

// NAVEGACIÓN
function cambiarVista(vista) {
    vistaActual = vista;

    document.querySelectorAll('.sidebar-item').forEach(
        item => item.classList.remove('active')
    );

    const nav = document.getElementById(`nav-${vista}`);

    if (nav) nav.classList.add('active');

    destruirGraficas();

    if (vista === 'general') {
        renderVistaGeneral();
    } else {
        renderVistaPerspectiva(vista);
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// TARJETAS DE LAS CUATRO PERSPECTIVAS
function crearTarjetaResumen(key, porcentaje, icono) {
    const p = bscData[key];

    return `
        <div onclick="cambiarVista('${key}')"
             class="bg-white p-5 rounded-2xl border
                    border-slate-200 shadow-sm card-hover cursor-pointer">

            <div class="flex justify-between items-start">
                <div class="p-2.5 rounded-xl ${p.bgLight} ${p.textCol}">
                    <i data-lucide="${icono}" class="w-5 h-5"></i>
                </div>

                <span class="text-xs font-bold px-3 py-1 rounded-full"
                      style="background:#F5E9ED;color:#87576E">
                    ${porcentaje}% de cumplimiento
                </span>
            </div>

            <div class="mt-4">
                <h3 class="font-bold text-slate-800 text-sm">
                    ${p.nombre}
                </h3>
                <p class="text-xs text-slate-500 mt-1">
                    2 objetivos estratégicos
                </p>
            </div>

            <div class="mt-5 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="h-full rounded-full"
                     style="width:${porcentaje}%;background:${p.color}">
                </div>
            </div>
        </div>
    `;
}

// TABLA GENERAL
function generarFilasTablaGeneral() {
    let html = '';

    Object.keys(bscData).forEach(key => {
        const p = bscData[key];

        p.indicadores.forEach(ind => {
            const progreso = calcularCumplimiento(ind);

            html += `
                <tr class="border-b border-slate-100 hover:bg-slate-50">
                    <td class="py-4 px-5">
                        <span class="block text-xs font-bold"
                              style="color:${p.color}">
                            ${p.nombre}
                        </span>
                        <span class="text-sm text-slate-800">
                            ${ind.objetivo}
                        </span>
                    </td>

                    <td class="py-4 px-5 text-sm">
                        ${ind.nombre}
                    </td>

                    <td class="py-4 px-5 font-bold">
                        ${ind.actual}${ind.unidad}
                    </td>

                    <td class="py-4 px-5 font-bold"
                        style="color:#956582">
                        ${ind.meta}${ind.unidad}
                    </td>

                    <td class="py-4 px-5">
                        <div class="flex items-center gap-2">
                            <div class="w-20 bg-slate-200 h-2 rounded-full">
                                <div class="h-2 rounded-full"
                                     style="width:${progreso}%;background:${p.color}">
                                </div>
                            </div>
                            <span class="text-xs font-bold">
                                ${progreso}%
                            </span>
                        </div>
                    </td>

                    <td class="py-4 px-5 text-xs">
                        ${ind.responsable}
                    </td>

                    <td class="py-4 px-5">
                        <button onclick="abrirModal('${key}','${ind.id}')"
                                class="px-3 py-2 rounded-lg text-xs font-semibold"
                                style="background:#F5E9ED;color:#87576E">
                            Simular
                        </button>
                    </td>
                </tr>
            `;
        });
    });

    return html;
}

// =============================================
// VISTA GERENCIAL
// =============================================
function renderVistaGeneral() {

    document.getElementById('titulo-vista').innerText =
        'Panel Ejecutivo de Gerencia';

    document.getElementById('subtitulo-vista').innerText =
        'Seguimiento de indicadores estratégicos';

    const claves = [
        'financiera',
        'cliente',
        'procesos',
        'aprendizaje'
    ];

    const promedios = claves.map(
        key => calcularPromedioPerspectiva(key)
    );

    const globalScore = Math.round(
        promedios.reduce((a, b) => a + b, 0) / 4
    );

    const contenedor = document.getElementById(
        'contenedor-principal'
    );

    contenedor.innerHTML = `
        <!-- RESUMEN EJECUTIVO -->
        <div class="bg-white rounded-2xl border border-slate-200
                    px-6 py-5 flex flex-col sm:flex-row
                    justify-between items-center gap-4">

            <div>
                <h3 class="text-lg font-bold text-slate-900">
                    Resumen del desempeño empresarial
                </h3>

                <p class="text-sm text-slate-500 mt-1">
                    Seguimiento de las metas estratégicas de Lucky Shoes.
                </p>
            </div>

            <div class="text-center px-6 py-3 rounded-xl shrink-0"
                 style="background:#F5E9ED">

                <p class="text-xs font-semibold"
                   style="color:#87576E">
                    Cumplimiento global
                </p>

                <p class="text-3xl font-bold mt-1"
                   style="color:#87576E">
                    ${globalScore}%
                </p>
            </div>
        </div>

        <!-- PERSPECTIVAS -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            ${crearTarjetaResumen('financiera', promedios[0], 'trending-up')}
            ${crearTarjetaResumen('cliente', promedios[1], 'heart-handshake')}
            ${crearTarjetaResumen('procesos', promedios[2], 'layers')}
            ${crearTarjetaResumen('aprendizaje', promedios[3], 'sparkles')}
        </div>

        <!-- GRÁFICOS -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div class="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 class="font-bold text-slate-800">
                    Distribución del cumplimiento
                </h4>

                <p class="text-xs text-slate-500 mb-4">
                    Participación relativa de las cuatro perspectivas
                </p>

                <div class="relative h-64">
                    <canvas id="chartPastelGeneral"></canvas>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200 lg:col-span-2">
                <h4 class="font-bold text-slate-800">
                    Avance de indicadores
                </h4>

                <p class="text-xs text-slate-500 mb-4">
                    Cumplimiento respecto a las metas establecidas
                </p>

                <div class="relative h-64">
                    <canvas id="chartBarrasGeneral"></canvas>
                </div>
            </div>
        </div>

        <!-- TABLA DE INDICADORES -->
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden">

            <div class="p-6 border-b border-slate-100">
                <h4 class="font-bold text-slate-800">
                    Control de indicadores
                </h4>

                <p class="text-xs text-slate-500 mt-1">
                    Consulta y simula los resultados estratégicos
                </p>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-slate-50 text-xs">
                        <tr>
                            <th class="p-4">Perspectiva / Objetivo</th>
                            <th class="p-4">Indicador</th>
                            <th class="p-4">Actual</th>
                            <th class="p-4">Meta</th>
                            <th class="p-4">Cumplimiento</th>
                            <th class="p-4">Responsable</th>
                            <th class="p-4">Acción</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${generarFilasTablaGeneral()}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // GRÁFICO DE PASTEL
    const pastel = document.getElementById(
        'chartPastelGeneral'
    ).getContext('2d');

    chartsActivos.push(new Chart(pastel, {
        type: 'pie',
        data: {
            labels: [
                'Financiera',
                'Cliente',
                'Procesos Internos',
                'Aprendizaje'
            ],
            datasets: [{
                data: promedios,
                backgroundColor: [
                    COLORES_LUCKY.financiera,
                    COLORES_LUCKY.cliente,
                    COLORES_LUCKY.procesos,
                    COLORES_LUCKY.aprendizaje
                ],
                borderColor: '#FFFFFF',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: ctx =>
                            `${ctx.label}: ${ctx.raw}% de cumplimiento promedio`
                    }
                }
            }
        }
    }));

    // GRÁFICO GENERAL DE BARRAS
    const todos = claves.flatMap(
        key => bscData[key].indicadores
    );

    const barras = document.getElementById(
        'chartBarrasGeneral'
    ).getContext('2d');

    chartsActivos.push(new Chart(barras, {
        type: 'bar',
        data: {
            labels: todos.map(ind => ind.objetivo),
            datasets: [
                {
                    label: '% Logrado',
                    data: todos.map(calcularCumplimiento),
                    backgroundColor: COLORES_LUCKY.principal,
                    borderRadius: 6
                },
                {
                    label: 'Brecha para Meta',
                    data: todos.map(
                        ind => 100 - calcularCumplimiento(ind)
                    ),
                    backgroundColor: COLORES_LUCKY.fondoGrafico,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    max: 100,
                    ticks: {
                        callback: value => value + '%'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    }));
}

// =============================================
// VISTA INDIVIDUAL POR PERSPECTIVA
// =============================================
function renderVistaPerspectiva(key) {

    const p = bscData[key];
    const promedio = calcularPromedioPerspectiva(key);

    // CORRECCIÓN: TÍTULO Y SUBTÍTULO CORRECTOS
    document.getElementById('titulo-vista').innerText =
        p.nombre;

    document.getElementById('subtitulo-vista').innerText =
        p.descripcion;

    const contenedor = document.getElementById(
        'contenedor-principal'
    );

    contenedor.innerHTML = `
        <!-- RESUMEN DE PERSPECTIVA -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200">

            <div class="flex justify-between items-center gap-4">
                <div>
                    <p class="text-xs font-bold"
                       style="color:${p.color}">
                        RESULTADO DE LA PERSPECTIVA
                    </p>

                    <h3 class="text-xl font-bold text-slate-900 mt-2">
                        Cumplimiento actual: ${promedio}%
                    </h3>
                </div>

                <button onclick="cambiarVista('general')"
                        class="px-4 py-2 rounded-xl text-sm font-semibold"
                        style="background:#F5E9ED;color:#87576E">
                    Volver a Vista Gerencial
                </button>
            </div>
        </div>

        <!-- DOS INDICADORES -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            ${p.indicadores.map((ind, index) => {

                const faltante = Math.max(
                    0,
                    ind.meta - ind.actual
                );

                return `
                    <div class="bg-white rounded-2xl border
                                border-slate-200 p-6 space-y-5">

                        <div class="flex justify-between items-start gap-3">
                            <div>
                                <span class="text-xs font-bold"
                                      style="color:${p.color}">
                                    ${ind.objetivo}
                                </span>

                                <h4 class="text-lg font-bold mt-2">
                                    ${ind.nombre}
                                </h4>

                                <p class="text-xs text-slate-500 mt-1">
                                    ${ind.estrategiaDetalle}
                                </p>
                            </div>

                            <button onclick="abrirModal('${key}','${ind.id}')"
                                    class="px-3 py-2 rounded-lg text-white
                                           text-xs font-semibold shrink-0"
                                    style="background:#A6788D">
                                Mejorar Dato
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">

                            <div class="relative h-48">
                                <canvas id="chartInd_${index}"></canvas>
                            </div>

                            <div class="p-4 rounded-xl"
                                 style="background:#FCF6F8">

                                <p class="text-xs text-slate-500">
                                    Valor actual
                                </p>

                                <p class="text-2xl font-bold">
                                    ${ind.actual}${ind.unidad}
                                </p>

                                <p class="text-xs text-slate-500 mt-3">
                                    Meta establecida
                                </p>

                                <p class="text-lg font-bold"
                                   style="color:#956582">
                                    ${ind.meta}${ind.unidad}
                                </p>

                                <p class="text-xs text-slate-500 mt-3">
                                    Brecha por cubrir
                                </p>

                                <p class="text-sm font-bold"
                                   style="color:#A6788D">
                                    ${faltante > 0
                                        ? `+${faltante}${ind.unidad}`
                                        : '¡Meta alcanzada!'}
                                </p>
                            </div>
                        </div>

                        <!-- INFORMACIÓN COMPLEMENTARIA -->
                        <div class="grid grid-cols-2 gap-3 text-xs">

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <span class="text-slate-500 block">
                                    Iniciativa
                                </span>
                                <strong>${ind.iniciativa}</strong>
                            </div>

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <span class="text-slate-500 block">
                                    Responsable
                                </span>
                                <strong>${ind.responsable}</strong>
                            </div>

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <span class="text-slate-500 block">
                                    Frecuencia
                                </span>
                                <strong>${ind.frecuencia}</strong>
                            </div>

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <span class="text-slate-500 block">
                                    Fuente
                                </span>
                                <strong>${ind.fuente}</strong>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>

        <!-- COMPARACIÓN -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6">

            <h4 class="font-bold text-slate-800">
                Comparación: Actual vs. Meta
            </h4>

            <p class="text-xs text-slate-500 mb-4">
                Resultados de los indicadores de esta perspectiva
            </p>

            <div class="relative h-64">
                <canvas id="chartComparativaPerspectiva"></canvas>
            </div>
        </div>
    `;

    // GRÁFICOS CIRCULARES INDIVIDUALES
    p.indicadores.forEach((ind, index) => {

        const canvas = document.getElementById(
            `chartInd_${index}`
        );

        const actualMostrado = Math.min(
            Math.max(ind.actual, 0),
            ind.meta
        );

        const restante = Math.max(
            0,
            ind.meta - actualMostrado
        );

        chartsActivos.push(new Chart(
            canvas.getContext('2d'),
            {
                type: 'doughnut',
                data: {
                    labels: [
                        'Actual logrado',
                        'Faltante para meta'
                    ],
                    datasets: [{
                        data: [
                            actualMostrado,
                            restante
                        ],
                        backgroundColor: [
                            p.color,
                            COLORES_LUCKY.fondoGrafico
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            }
        ));
    });

    // GRÁFICO COMPARATIVO
    const comparativa = document.getElementById(
        'chartComparativaPerspectiva'
    ).getContext('2d');

    chartsActivos.push(new Chart(comparativa, {
        type: 'bar',
        data: {
            labels: p.indicadores.map(
                ind => ind.nombre
            ),
            datasets: [
                {
                    label: 'Valor actual',
                    data: p.indicadores.map(
                        ind => ind.actual
                    ),
                    backgroundColor: p.color,
                    borderRadius: 6
                },
                {
                    label: 'Meta establecida',
                    data: p.indicadores.map(
                        ind => ind.meta
                    ),
                    backgroundColor: COLORES_LUCKY.oscuro,
                    borderRadius: 6
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    }));
}

// =============================================
// SIMULACIÓN DE INDICADORES
// =============================================

function abrirModal(perspKey, indId) {

    const p = bscData[perspKey];

    const ind = p.indicadores.find(
        item => item.id === indId
    );

    if (!ind) return;

    indicadorEditando = {
        perspKey,
        indId
    };

    const maximo = Math.max(
        ind.meta * 1.2,
        ind.actual * 1.2,
        1
    );

    const paso = ind.unidad === ' personas'
        ? 100
        : 1;

    document.getElementById('modal-contenido').innerHTML = `
        <div class="p-4 rounded-xl"
             style="background:#FCF6F8">

            <p class="text-xs font-bold"
               style="color:${p.color}">
                ${p.nombre}
            </p>

            <h4 class="font-bold text-slate-900 mt-1">
                ${ind.nombre}
            </h4>

            <p class="text-xs text-slate-500 mt-1">
                Iniciativa: ${ind.iniciativa}
            </p>
        </div>

        <div class="mt-4">
            <label class="block text-sm font-semibold mb-2">
                Nuevo valor actual
            </label>

            <input type="range"
                   id="input-slider-actual"
                   min="0"
                   max="${maximo}"
                   step="${paso}"
                   value="${ind.actual}"
                   class="w-full"
                   style="accent-color:#A6788D">

            <input type="number"
                   id="input-num-actual"
                   min="0"
                   step="${paso}"
                   value="${ind.actual}"
                   class="mt-3 w-full border rounded-xl p-3">
        </div>

        <div class="mt-4">
            <label class="block text-sm font-semibold mb-2">
                Ajustar meta
            </label>

            <input type="number"
                   id="input-num-meta"
                   min="0.01"
                   step="${paso}"
                   value="${ind.meta}"
                   class="w-full border rounded-xl p-3">
        </div>
    `;

    const slider = document.getElementById(
        'input-slider-actual'
    );

    const numero = document.getElementById(
        'input-num-actual'
    );

    slider.addEventListener('input', () => {
        numero.value = slider.value;
    });

    numero.addEventListener('input', () => {
        slider.value = numero.value;
    });

    const modal = document.getElementById(
        'modal-simulador'
    );

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function cerrarModal() {

    const modal = document.getElementById(
        'modal-simulador'
    );

    modal.classList.add('hidden');
    modal.classList.remove('flex');

    indicadorEditando = null;
}

// GUARDAR CAMBIOS
function guardarSimulacion() {

    if (!indicadorEditando) return;

    const { perspKey, indId } = indicadorEditando;

    const ind = bscData[perspKey].indicadores.find(
        item => item.id === indId
    );

    const nuevoActual = parseFloat(
        document.getElementById('input-num-actual').value
    );

    const nuevaMeta = parseFloat(
        document.getElementById('input-num-meta').value
    );

    if (
        !Number.isFinite(nuevoActual) ||
        !Number.isFinite(nuevaMeta) ||
        nuevoActual < 0 ||
        nuevaMeta <= 0
    ) {
        alert(
            'Ingresa valores válidos. La meta debe ser mayor que cero.'
        );
        return;
    }

    ind.actual = nuevoActual;
    ind.meta = nuevaMeta;

    localStorage.setItem(
        'luckyShoesBSC',
        JSON.stringify(bscData)
    );

    cerrarModal();
    cambiarVista(vistaActual);
}

// RESTAURAR VALORES ORIGINALES
function resetearDatos() {

    const confirmar = confirm(
        '¿Deseas restaurar los valores originales del Excel de Lucky Shoes?'
    );

    if (!confirmar) return;

    localStorage.removeItem('luckyShoesBSC');

    bscData = copiarDatos(datosIniciales);

    aplicarColores();
    cambiarVista(vistaActual);
}

// INICIAR DASHBOARD
window.addEventListener('load', () => {
    cambiarVista('general');
});
