// 1. BASE DE DATOS INICIAL EXTRAÍDA DEL EXCEL (luckyshoesunidad4.xlsx)
const datosIniciales = {
    financiera: {
        id: 'financiera',
        nombre: 'Perspectiva Financiera',
        color: '#10b981',
        bgLight: 'bg-emerald-50',
        textCol: 'text-emerald-700',
        descripcion: 'Incrementar las ventas mensuales de calzado femenino y aumentar la rentabilidad mediante una mejor gestión de costos.',
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
        color: '#e11d48',
        bgLight: 'bg-rose-50',
        textCol: 'text-rose-700',
        descripcion: 'Incrementar la satisfacción mediante atención personalizada y fidelizar clientes con descuentos especiales.',
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
                estrategiaDetalle: 'Incrementar la satisfacción de los clientes mediante atención personalizada.'
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
                estrategiaDetalle: 'Fidelizar a los clientes mediante descuentos y promociones especiales.'
            }
        ]
    },
    procesos: {
        id: 'procesos',
        nombre: 'Perspectiva de Procesos Internos',
        color: '#f59e0b',
        bgLight: 'bg-amber-50',
        textCol: 'text-amber-700',
        descripcion: 'Si garantizamos o mejoramos la calidad de nuestros productos, entonces optimizaremos la gestión de inventarios.',
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
                estrategiaDetalle: 'Optimizar el control de inventarios para evitar falta de modelos y tallas.'
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
        color: '#0284c7',
        bgLight: 'bg-sky-50',
        textCol: 'text-sky-700',
        descripcion: 'Fortalecer habilidades de marketing digital del equipo y promover participación en propuestas de mejora.',
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

// Cargar desde LocalStorage si el usuario ya hizo simulaciones previas
let bscData = JSON.parse(localStorage.getItem('luckyShoesBSC')) || JSON.parse(JSON.stringify(datosIniciales));
let vistaActual = 'general';
let chartsActivos = [];
let indicadorEditando = null;

function calcularCumplimiento(ind) {
    return Math.min(Math.round((ind.actual / ind.meta) * 100), 100);
}

function calcularPromedioPerspectiva(key) {
    const inds = bscData[key].indicadores;
    const suma = inds.reduce((acc, item) => acc + calcularCumplimiento(item), 0);
    return Math.round(suma / inds.length);
}

function destruirGraficas() {
    chartsActivos.forEach(chart => chart.destroy());
    chartsActivos = [];
}

function cambiarVista(vista) {
    vistaActual = vista;
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`nav-${vista}`).classList.add('active');
    
    destruirGraficas();
    if (vista === 'general') {
        renderVistaGeneral();
    } else {
        renderVistaPerspectiva(vista);
    }
    lucide.createIcons();
}

// ==========================================
// RENDER 1: VISTA PRINCIPAL PARA EL GERENTE
// ==========================================
function renderVistaGeneral() {
    document.getElementById('titulo-vista').innerText = 'Panel Ejecutivo de Gerencia';
    document.getElementById('subtitulo-vista').innerText = 'Visión Global de Lucky Shoes • Cumplimiento de Expectativas por Perspectiva';

    const pFin = calcularPromedioPerspectiva('financiera');
    const pCli = calcularPromedioPerspectiva('cliente');
    const pPro = calcularPromedioPerspectiva('procesos');
    const pApr = calcularPromedioPerspectiva('aprendizaje');
    const globalScore = Math.round((pFin + pCli + pPro + pApr) / 4);

    const contenedor = document.getElementById('contenedor-principal');
    contenedor.innerHTML = `
        <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-1 max-w-2xl">
                <span class="px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-semibold">
                    Premisa Causa - Efecto
                </span>
                <h3 class="text-lg font-bold pt-1">"Si garantizamos o mejoramos la calidad de nuestros productos, entonces optimizaremos la gestión de inventarios."</h3>
                <p class="text-sm text-slate-300">Estrategia: Penetración del mercado mediante campañas publicitarias, promociones atractivas y atención personalizada.</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl text-center border border-white/15 shrink-0">
                <p class="text-xs uppercase tracking-wider text-rose-200 font-semibold">Cumplimiento Global</p>
                <p class="text-4xl font-extrabold text-white mt-1">${globalScore}%</p>
                <p class="text-xs text-slate-300 mt-1">Meta Corporativa: 100%</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            ${crearTarjetaResumen('financiera', pFin, 'trending-up')}
            ${crearTarjetaResumen('cliente', pCli, 'heart-handshake')}
            ${crearTarjetaResumen('procesos', pPro, 'layers')}
            ${crearTarjetaResumen('aprendizaje', pApr, 'sparkles')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                    <h4 class="font-bold text-slate-800 text-base">Distribución de Avance (Pastel)</h4>
                    <p class="text-xs text-slate-500 mb-4">Proporción de cumplimiento actual entre áreas</p>
                </div>
                <div class="relative h-64 flex items-center justify-center">
                    <canvas id="chartPastelGeneral"></canvas>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 text-center">
                    Haz clic en las tarjetas superiores para simular mejoras por área.
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2 flex flex-col justify-between">
                <div>
                    <h4 class="font-bold text-slate-800 text-base">Brecha de Expectativas: Actual vs. Meta (8 Indicadores)</h4>
                    <p class="text-xs text-slate-500 mb-4">Nivel de logro porcentual respecto a la meta establecida en el plan</p>
                </div>
                <div class="relative h-64">
                    <canvas id="chartBarrasGeneral"></canvas>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-slate-800 text-base">Matriz de Control Gerencial y Responsables</h4>
                    <p class="text-xs text-slate-500">Haz clic en "Simular" en cualquier fila para probar escenarios de mejora</p>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                            <th class="py-3.5 px-6 font-semibold">Perspectiva / Objetivo</th>
                            <th class="py-3.5 px-6 font-semibold">Indicador (KPI)</th>
                            <th class="py-3.5 px-6 font-semibold">Actual</th>
                            <th class="py-3.5 px-6 font-semibold">Meta</th>
                            <th class="py-3.5 px-6 font-semibold">Progreso</th>
                            <th class="py-3.5 px-6 font-semibold">Responsable</th>
                            <th class="py-3.5 px-6 font-semibold text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-sm">
                        ${generarFilasTablaGeneral()}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const ctxPie = document.getElementById('chartPastelGeneral').getContext('2d');
    chartsActivos.push(new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Financiera', 'Cliente', 'Procesos Internos', 'Aprendizaje'],
            datasets: [{
                data: [pFin, pCli, pPro, pApr],
                backgroundColor: ['#10b981', '#e11d48', '#f59e0b', '#0284c7'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ` ${ctx.label}: ${ctx.raw}% de cumplimiento promedio`
                    }
                }
            }
        }
    }));

    const todosInds = [
        ...bscData.financiera.indicadores,
        ...bscData.cliente.indicadores,
        ...bscData.procesos.indicadores,
        ...bscData.aprendizaje.indicadores
    ];

    const ctxBar = document.getElementById('chartBarrasGeneral').getContext('2d');
    chartsActivos.push(new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: todosInds.map(i => i.objetivo),
            datasets: [
                {
                    label: '% Logrado Actual',
                    data: todosInds.map(i => calcularCumplimiento(i)),
                    backgroundColor: '#e11d48',
                    borderRadius: 6
                },
                {
                    label: 'Brecha para Meta (100%)',
                    data: todosInds.map(i => 100 - calcularCumplimiento(i)),
                    backgroundColor: '#e2e8f0',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, max: 100, ticks: { callback: v => v + '%' } }
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    }));
}

function crearTarjetaResumen(key, porcentaje, icono) {
    const p = bscData[key];
    return `
        <div onclick="cambiarVista('${key}')" class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm card-hover cursor-pointer flex flex-col justify-between">
            <div class="flex justify-between items-start">
                <div class="p-2.5 rounded-xl ${p.bgLight} ${p.textCol}">
                    <i data-lucide="${icono}" class="w-5 h-5"></i>
                </div>
                <span class="text-xs font-bold px-2.5 py-1 rounded-full ${porcentaje >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                    ${porcentaje}% Logro
                </span>
            </div>
            <div class="mt-4">
                <h3 class="font-bold text-slate-800 text-sm">${p.nombre}</h3>
                <p class="text-xs text-slate-500 mt-0.5">${p.indicadores.length} Objetivos estratégicos</p>
            </div>
            <div class="mt-4">
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500" style="width: ${porcentaje}%; background-color: ${p.color}"></div>
                </div>
            </div>
        </div>
    `;
}

function generarFilasTablaGeneral() {
    let html = '';
    Object.keys(bscData).forEach(key => {
        const persp = bscData[key];
        persp.indicadores.forEach(ind => {
            const porc = calcularCumplimiento(ind);
            html += `
                <tr class="hover:bg-slate-50/80 transition">
                    <td class="py-3.5 px-6">
                        <span class="text-xs font-bold ${persp.textCol} block">${persp.nombre}</span>
                        <span class="font-medium text-slate-800">${ind.objetivo}</span>
                    </td>
                    <td class="py-3.5 px-6 text-slate-600">${ind.nombre}</td>
                    <td class="py-3.5 px-6 font-bold text-slate-900">${ind.actual}${ind.unidad}</td>
                    <td class="py-3.5 px-6 font-semibold text-emerald-600">${ind.meta}${ind.unidad}</td>
                    <td class="py-3.5 px-6">
                        <div class="flex items-center gap-2">
                            <div class="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div class="h-full rounded-full" style="width: ${porc}%; background-color: ${persp.color}"></div>
                            </div>
                            <span class="text-xs font-bold text-slate-700">${porc}%</span>
                        </div>
                    </td>
                    <td class="py-3.5 px-6 text-xs text-slate-500">${ind.responsable}</td>
                    <td class="py-3.5 px-6 text-right">
                        <button onclick="abrirModal('${key}', '${ind.id}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white rounded-lg text-xs font-semibold transition">
                            Simular
                        </button>
                    </td>
                </tr>
            `;
        });
    });
    return html;
}

// ==========================================
// RENDER 2: VISTAS ESPECÍFICAS POR PERSPECTIVA
// ==========================================
function renderVistaPerspectiva(key) {
    const persp = bscData[key];
    const promedio = calcularPromedioPerspectiva(key);

    document.getElementById('titulo-vista').innerText = persp.nombre;
    document.getElementById('subtitulo-vista').innerText = persp.descripcion;

    const contenedor = document.getElementById('contenedor-principal');
    contenedor.innerHTML = `
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl ${persp.bgLight} ${persp.textCol} flex items-center justify-center font-bold text-2xl">
                    ${promedio}%
                </div>
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider ${persp.textCol}">Estado de la Perspectiva</span>
                    <h3 class="text-xl font-bold text-slate-900">Nivel de Cumplimiento Actual</h3>
                    <p class="text-sm text-slate-500">Ajusta los indicadores abajo para proyectar cómo alcanzar el 100% de la meta.</p>
                </div>
            </div>
            <button onclick="cambiarVista('general')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Volver a Vista Gerencial
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            ${persp.indicadores.map((ind, index) => {
                const faltante = Math.max(0, ind.meta - ind.actual);
                return `
                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-6">
                    <div class="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                            <span class="px-2.5 py-1 rounded-md text-xs font-bold ${persp.bgLight} ${persp.textCol}">
                                ${ind.objetivo}
                            </span>
                            <h4 class="text-lg font-bold text-slate-900 mt-2">${ind.nombre}</h4>
                            <p class="text-xs text-slate-500 mt-1">${ind.estrategiaDetalle}</p>
                        </div>
                        <button onclick="abrirModal('${key}', '${ind.id}')" class="px-3.5 py-2 bg-slate-900 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shrink-0">
                            <i data-lucide="sliders" class="w-3.5 h-3.5"></i> Mejorar Dato
                        </button>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div class="h-48 relative flex items-center justify-center">
                            <canvas id="chartInd_${index}"></canvas>
                        </div>
                        <div class="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div>
                                <p class="text-xs text-slate-500">Valor Actual</p>
                                <p class="text-2xl font-extrabold text-slate-900">${ind.actual}${ind.unidad}</p>
                            </div>
                            <div>
                                <p class="text-xs text-slate-500">Meta Esperada</p>
                                <p class="text-lg font-bold text-emerald-600">${ind.meta}${ind.unidad}</p>
                            </div>
                            <div class="pt-2 border-t border-slate-200">
                                <p class="text-xs text-slate-500">Brecha por cubrir:</p>
                                <p class="text-sm font-bold text-rose-600">
                                    ${faltante > 0 ? `+${faltante}${ind.unidad} para llegar a la meta` : '¡Meta Alcanzada!'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                        <div class="bg-slate-50 p-3 rounded-lg">
                            <span class="text-slate-400 block">Iniciativa Clave:</span>
                            <span class="font-semibold text-slate-800">${ind.iniciativa}</span>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-lg">
                            <span class="text-slate-400 block">Responsable:</span>
                            <span class="font-semibold text-slate-800">${ind.responsable}</span>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-lg">
                            <span class="text-slate-400 block">Frecuencia:</span>
                            <span class="font-semibold text-slate-800">${ind.frecuencia}</span>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-lg">
                            <span class="text-slate-400 block">Fuente de Datos:</span>
                            <span class="font-semibold text-slate-800">${ind.fuente}</span>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 class="font-bold text-slate-800 text-base mb-1">Comparativa Directa: Situación Actual vs. Meta</h4>
            <p class="text-xs text-slate-500 mb-4">Visualización en unidades reales de medición</p>
            <div class="h-64">
                <canvas id="chartComparativaPerspectiva"></canvas>
            </div>
        </div>
    `;

    persp.indicadores.forEach((ind, index) => {
        const logrado = ind.actual;
        const restante = Math.max(0, ind.meta - ind.actual);
        const ctx = document.getElementById(`chartInd_${index}`).getContext('2d');
        chartsActivos.push(new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Actual Logrado', 'Faltante para Meta'],
                datasets: [{
                    data: [logrado, restante],
                    backgroundColor: [persp.color, '#e2e8f0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }
                }
            }
        }));
    });

    const ctxComp = document.getElementById('chartComparativaPerspectiva').getContext('2d');
    chartsActivos.push(new Chart(ctxComp, {
        type: 'bar',
        data: {
            labels: persp.indicadores.map(i => i.nombre),
            datasets: [
                {
                    label: 'Valor Actual',
                    data: persp.indicadores.map(i => i.actual),
                    backgroundColor: persp.color,
                    borderRadius: 6
                },
                {
                    label: 'Meta Establecida',
                    data: persp.indicadores.map(i => i.meta),
                    backgroundColor: '#1e293b',
                    borderRadius: 6
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    }));
}

// ==========================================
// MODAL INTERACTIVO PARA SIMULAR EXPECTATIVAS
// ==========================================
function abrirModal(perspKey, indId) {
    const persp = bscData[perspKey];
    const ind = persp.indicadores.find(i => i.id === indId);
    indicadorEditando = { perspKey, indId };

    const maxSlider = Math.max(ind.meta * 1.2, ind.actual * 1.2);
    const step = ind.unidad === ' personas' ? 100 : 1;

    document.getElementById('modal-contenido').innerHTML = `
        <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span class="text-xs font-bold ${persp.textCol}">${persp.nombre}</span>
            <p class="font-bold text-slate-900 text-sm">${ind.nombre}</p>
            <p class="text-xs text-slate-500 mt-1">Iniciativa: <strong>${ind.iniciativa}</strong></p>
        </div>

        <div>
            <div class="flex justify-between text-sm font-semibold mb-1">
                <label class="text-slate-700">Nuevo Valor Actual (${ind.unidad.trim()}):</label>
                <span id="preview-actual" class="text-rose-600 font-bold">${ind.actual}${ind.unidad}</span>
            </div>
            <input type="range" id="input-slider-actual" min="0" max="${maxSlider}" step="${step}" value="${ind.actual}"
                oninput="document.getElementById('input-num-actual').value = this.value; document.getElementById('preview-actual').innerText = this.value + '${ind.unidad}'"
                class="w-full accent-rose-600 cursor-pointer">
            <input type="number" id="input-num-actual" value="${ind.actual}" step="${step}"
                oninput="document.getElementById('input-slider-actual').value = this.value; document.getElementById('preview-actual').innerText = this.value + '${ind.unidad}'"
                class="mt-2 w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold">
        </div>

        <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Ajustar Meta / Expectativa (${ind.unidad.trim()}):</label>
            <input type="number" id="input-num-meta" value="${ind.meta}" step="${step}"
                class="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50/40">
        </div>
    `;

    const modal = document.getElementById('modal-simulador');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    lucide.createIcons();
}

function cerrarModal() {
    const modal = document.getElementById('modal-simulador');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    indicadorEditando = null;
}

function guardarSimulacion() {
    if (!indicadorEditando) return;
    const { perspKey, indId } = indicadorEditando;
    const ind = bscData[perspKey].indicadores.find(i => i.id === indId);

    const nuevoActual = parseFloat(document.getElementById('input-num-actual').value);
    const nuevaMeta = parseFloat(document.getElementById('input-num-meta').value);

    if (!isNaN(nuevoActual) && nuevoActual >= 0) ind.actual = nuevoActual;
    if (!isNaN(nuevaMeta) && nuevaMeta > 0) ind.meta = nuevaMeta;

    localStorage.setItem('luckyShoesBSC', JSON.stringify(bscData));
    
    cerrarModal();
    cambiarVista(vistaActual);
}

function resetearDatos() {
    if (confirm('¿Deseas restaurar los valores originales del Excel de Lucky Shoes?')) {
        localStorage.removeItem('luckyShoesBSC');
        bscData = JSON.parse(JSON.stringify(datosIniciales));
        cambiarVista(vistaActual);
    }
}

window.onload = () => {
    cambiarVista('general');
};