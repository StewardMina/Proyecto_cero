<template>
  <div
    id="app"
    class="font-inter antialiased text-gray-900 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100"
  >
    <div
      v-if="ventana === 'inicio'"
      class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <nav
        id="inicio"
        class="flex justify-between items-center p-3 md:p-6 max-w-7xl mx-auto shadow-soft bg-white/80 backdrop-blur-sm rounded-2xl m-3 md:m-4 nav-premium"
      >
        <div class="flex items-center gap-2 md:gap-3">
          <div
            class="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-2 md:p-3 rounded-xl font-black shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            C
          </div>
          <span class="text-base md:text-2xl font-black text-blue-900 tracking-tighter"
            >PROYECTO C.E.R.O.</span
          >
        </div>
        <div class="flex gap-1 md:gap-4 items-center">
          <button
            @click="ventana = 'login'"
            class="px-3 md:px-6 py-2 md:py-3 text-sm md:text-base font-bold text-blue-600 hover:text-blue-800 transition-all duration-300 hover:bg-blue-50 rounded-xl"
          >
            Entrar
          </button>
          <button
            @click="ventana = 'contactar'"
            class="hidden sm:block px-3 md:px-6 py-2 md:py-3 text-sm md:text-base font-bold text-blue-600 hover:text-blue-800 transition-all duration-300 hover:bg-blue-50 rounded-xl"
          >
            Contáctanos
          </button>
          <button
            @click="ventana = 'registroColegio'"
            class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 md:px-6 py-2 md:py-3 text-xs md:text-base rounded-xl font-bold hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 btn-premium"
          >
            <span class="hidden sm:inline">Registrar Colegio</span>
            <span class="sm:hidden">Registro</span>
          </button>
        </div>
      </nav>

      <div
        class="relative w-full h-80 overflow-hidden rounded-2xl shadow-2xl mb-12 mx-4 transform hover:scale-[1.02] transition-all duration-500 carousel-section"
      >
        <transition-group name="fade" tag="div">
          <div
            v-for="(img, index) in imagenesCarrusel"
            :key="img"
            v-show="indiceCarrusel === index"
            class="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000"
            :style="{ backgroundImage: `url(${img})` }"
          >
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
            >
              <div class="text-center px-6 animate-fade-in">
                <h2
                  class="text-white text-4xl md:text-5xl font-black text-center mb-4 drop-shadow-lg"
                >
                  {{ frasesCarrusel[index] }}
                </h2>
                <div class="w-24 h-1 bg-white/80 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <header class="py-10 md:py-20 px-4 md:px-6 text-center max-w-5xl mx-auto animate-fade-in">
        <div class="mb-6">
          <span
            class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
          >
            Sistema Nacional de Convivencia Escolar
          </span>
        </div>
        <h1
          class="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 mb-8 tracking-tight uppercase leading-tight animate-slide-up"
        >
          Convivencia y Respeto Escolar
        </h1>
        <p
          class="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed font-medium max-w-4xl mx-auto"
        >
          Una herramienta diseñada para la gestión moderna del clima
          institucional, alineada con los estándares de protección y bienestar
          estudiantil en Colombia.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/ley1620.html"
            class="bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200"
          >
            Saber más sobre la Ley 1620
          </a>
          <button
            @click="ventana = 'login'"
            class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Acceder al Sistema
          </button>
        </div>
      </header>

      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h3
            class="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight"
          >
            Clasificación de Situaciones
          </h3>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sistema de categorización oficial según la Ley 1620 para una
            respuesta adecuada y proporcional
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <div class="text-center mb-6">
              <div
                class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300"
              >
                I
              </div>
              <h4 class="font-black text-gray-900 mb-3 uppercase text-xl">
                Situación Tipo I
              </h4>
              <div class="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-4"></div>
            </div>
            <div class="text-center">
              <p class="text-blue-700 font-bold italic text-lg mb-4">
                Conflictos esporádicos
              </p>
              <p class="text-gray-700 leading-relaxed">
                Malentendidos que no afectan la integridad física ni mental de
                forma sistemática. Requieren diálogo y mediación básica.
              </p>
            </div>
          </div>

          <div
            class="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-3xl border border-orange-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <div class="text-center mb-6">
              <div
                class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300"
              >
                II
              </div>
              <h4 class="font-black text-gray-900 mb-3 uppercase text-xl">
                Situación Tipo II
              </h4>
              <div
                class="w-16 h-1 bg-orange-500 rounded-full mx-auto mb-4"
              ></div>
            </div>
            <div class="text-center">
              <p class="text-orange-700 font-bold italic text-lg mb-4">
                Acoso o Ciberacoso
              </p>
              <p class="text-gray-700 leading-relaxed">
                Agresiones repetitivas que no son delitos pero dañan gravemente
                el clima escolar. Requieren intervención especializada.
              </p>
            </div>
          </div>

          <div
            class="group bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-3xl border border-red-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <div class="text-center mb-6">
              <div
                class="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300"
              >
                III
              </div>
              <h4 class="font-black text-gray-900 mb-3 uppercase text-xl">
                Situación Tipo III
              </h4>
              <div class="w-16 h-1 bg-red-500 rounded-full mx-auto mb-4"></div>
            </div>
            <div class="text-center">
              <p class="text-red-700 font-bold italic text-lg mb-4">
                Presunto Delito
              </p>
              <p class="text-gray-700 leading-relaxed">
                Agresiones que por su gravedad constituyen delitos penales bajo
                la ley colombiana. Requieren intervención judicial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        v-if="ventana === 'inicio'"
        class="py-24 bg-gradient-to-br from-gray-50 to-blue-50 px-6"
      >
        <div class="max-w-6xl mx-auto">
          <div
            class="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-2xl"
          >
            <div class="text-center mb-12">
              <div
                class="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-lg"
              >
                Datos Reales
              </div>
              <h3
                class="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight"
              >
                Panorama Nacional en Colombia
              </h3>
              <p
                class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                Porcentaje de estudiantes que manifiestan haber sido víctimas de
                agresiones
                <span class="block text-sm text-gray-500 mt-2"
                  >(Cifras aproximadas según Ley 1620)</span
                >
              </p>
            </div>

            <div
              class="relative h-[520px] w-full mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 chart-container"
            >
              <canvas id="graficaBullying" class="w-full h-full"></canvas>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div
                class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div class="text-4xl font-black text-blue-600 mb-2">32%</div>
                <div
                  class="w-12 h-1 bg-blue-500 rounded-full mx-auto mb-3"
                ></div>
                <div
                  class="text-sm font-bold text-gray-600 uppercase tracking-wide"
                >
                  Verbal
                </div>
              </div>

              <div
                class="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div class="text-4xl font-black text-indigo-600 mb-2">26%</div>
                <div
                  class="w-12 h-1 bg-indigo-500 rounded-full mx-auto mb-3"
                ></div>
                <div
                  class="text-sm font-bold text-gray-600 uppercase tracking-wide"
                >
                  Social
                </div>
              </div>

              <div
                class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div class="text-4xl font-black text-purple-600 mb-2">18%</div>
                <div
                  class="w-12 h-1 bg-purple-500 rounded-full mx-auto mb-3"
                ></div>
                <div
                  class="text-sm font-bold text-gray-600 uppercase tracking-wide"
                >
                  Ciberacoso
                </div>
              </div>

              <div
                class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div class="text-4xl font-black text-blue-800 mb-2">12%</div>
                <div
                  class="w-12 h-1 bg-blue-600 rounded-full mx-auto mb-3"
                ></div>
                <div
                  class="text-sm font-bold text-gray-600 uppercase tracking-wide"
                >
                  Físico
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="ruta-atencion"
        class="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white px-6 rounded-3xl mx-4 my-16 shadow-2xl relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
        ></div>
        <div class="relative z-10 max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h3
              class="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
            >
              Ruta de Atención C.E.R.O.
            </h3>
            <p class="text-blue-200 font-bold text-xl mb-2">
              Protocolo oficial según el Decreto 1965
            </p>
            <div class="w-24 h-1 bg-white rounded-full mx-auto"></div>
          </div>

          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="relative mb-6">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 text-blue-900 rounded-2xl flex items-center justify-center text-3xl font-black mx-auto shadow-xl transform group-hover:scale-110 transition-all duration-300 rotate-3"
                >
                  1
                </div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping"
                ></div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
                ></div>
              </div>
              <h4 class="font-black uppercase text-xl mb-4">Reporte</h4>
              <p class="text-blue-100 leading-relaxed">
                Se activa la alerta a través de la plataforma de forma anónima o
                identificada. El sistema registra el caso inmediatamente.
              </p>
            </div>

            <div class="text-center group">
              <div class="relative mb-6">
                <div
                  class="w-20 h-20 bg-white text-blue-900 rounded-2xl flex items-center justify-center text-3xl font-black mx-auto shadow-xl transform group-hover:scale-110 transition-all duration-300 -rotate-3"
                >
                  2
                </div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-blue-300 rounded-full animate-ping"
                ></div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full"
                ></div>
              </div>
              <h4 class="font-black uppercase text-xl mb-4">Atención</h4>
              <p class="text-blue-100 leading-relaxed">
                El comité de convivencia recibe el caso y brinda protección
                inmediata a los involucrados.
              </p>
            </div>

            <div class="text-center group">
              <div class="relative mb-6">
                <div
                  class="w-20 h-20 bg-white text-blue-900 rounded-2xl flex items-center justify-center text-3xl font-black mx-auto shadow-xl transform group-hover:scale-110 transition-all duration-300 rotate-3"
                >
                  3
                </div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-green-300 rounded-full animate-ping"
                ></div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"
                ></div>
              </div>
              <h4 class="font-black uppercase text-xl mb-4">Mediación</h4>
              <p class="text-blue-100 leading-relaxed">
                Se citan a las partes para buscar acuerdos y restaurar la
                convivencia escolar de manera pacífica.
              </p>
            </div>

            <div class="text-center group">
              <div class="relative mb-6">
                <div
                  class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 text-blue-900 rounded-2xl flex items-center justify-center text-3xl font-black mx-auto shadow-xl transform group-hover:scale-110 transition-all duration-300"
                >
                  4
                </div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-green-300 rounded-full animate-ping"
                ></div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"
                ></div>
              </div>
              <h4 class="font-black uppercase text-xl mb-4">Seguimiento</h4>
              <p class="text-blue-100 leading-relaxed">
                Se verifica el cumplimiento de compromisos y el bienestar
                emocional de todos los involucrados.
              </p>
            </div>
          </div>

          <!-- Indicador de progreso visual -->
          <div class="mt-16 flex justify-center">
            <div class="flex items-center space-x-4">
              <div
                class="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"
              ></div>
              <div
                class="h-1 w-16 bg-gradient-to-r from-yellow-400 to-blue-400 rounded-full"
              ></div>
              <div class="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <div
                class="h-1 w-16 bg-gradient-to-r from-blue-400 to-white rounded-full"
              ></div>
              <div class="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              <div
                class="h-1 w-16 bg-gradient-to-r from-white to-green-400 rounded-full"
              ></div>
              <div
                class="w-4 h-4 bg-green-400 rounded-full animate-pulse"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <footer
        class="bg-[#0f172a] text-white pt-16 pb-8 mt-20 border-t-4 border-blue-600"
      >
        <div class="max-w-7xl mx-auto px-6">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          >
            <div class="space-y-6">
              <div class="flex items-center gap-2">
                <div class="bg-blue-600 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-.382-3.016z"
                    />
                  </svg>
                </div>
                <h2
                  class="text-2xl font-black tracking-tighter uppercase italic"
                >
                  Proyecto <span class="text-blue-400">C.E.R.O.</span>
                </h2>
              </div>
              <p class="text-gray-400 text-sm leading-relaxed">
                Plataforma líder en gestión del clima escolar y convivencia en
                Colombia. Alineada con la Ley 1620 para proteger el bienestar
                estudiantil.
              </p>
            </div>

            <div>
              <h3
                class="text-sm font-black uppercase tracking-widest text-blue-400 mb-6"
              >
                Navegación
              </h3>
              <ul class="space-y-4 text-sm font-bold text-gray-300">
                <li>
                  <a
                    href="/ley1620.html"
                    class="hover:text-white hover:translate-x-1 transition-all inline-block"
                    >Ley 1620</a
                  >
                </li>
                <li>
                  <a
                    href="#ruta-atencion"
                    class="hover:text-white hover:translate-x-1 transition-all inline-block"
                    >Ruta de Atención</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="hover:text-white hover:translate-x-1 transition-all inline-block"
                    >Manual de Convivencia</a
                  >
                </li>
              </ul>
            </div>

            <div>
              <h3
                class="text-sm font-black uppercase tracking-widest text-blue-400 mb-6"
              >
                Soporte
              </h3>
              <ul class="space-y-4 text-sm text-gray-300">
                <li class="flex items-center gap-3">
                  <span class="bg-blue-900/50 p-2 rounded-lg text-blue-400"
                    >📧</span
                  >
                  <span class="font-medium">soporte@proyectocero.com</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="bg-blue-900/50 p-2 rounded-lg text-blue-400"
                    >📍</span
                  >
                  <span class="font-medium">Puerto Tejada, Cauca</span>
                </li>
                <li class="flex items-center gap-3 text-green-400 italic">
                  <span
                    class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  ></span>
                  <span>Sistema Operativo 24/7</span>
                </li>
              </ul>
            </div>

            <div>
              <h3
                class="text-sm font-black uppercase tracking-widest text-blue-400 mb-6"
              >
                Institucional
              </h3>
              <p class="text-xs text-gray-400 mb-4">
                ¿Necesitas implementar C.E.R.O en tu institución?
              </p>
              <button
                @click="ventana = 'contactar'"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 uppercase text-xs"
              >
                Contactar Asesor
              </button>
            </div>
          </div>

          <div
            class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500"
          >
            <p>© 2026 PROYECTO C.E.R.O. - Todos los derechos reservados</p>
            <div class="flex gap-6">
              <a href="#" class="hover:text-blue-400 transition-colors"
                >Términos</a
              >
              <a href="#" class="hover:text-blue-400 transition-colors"
                >Privacidad</a
              >
              <a href="#" class="hover:text-blue-400 transition-colors"
                >Cookies</a
              >
            </div>
          </div>
        </div>

        <button
          @click="volverArriba"
          class="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-blue-600 text-white p-3 md:p-4 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all z-50"
        >
          ↑
        </button>
      </footer>
    </div>

    <div
      v-else-if="cargando"
      class="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-blue-900/90 backdrop-blur-sm"
    >
      <div
        class="w-24 h-24 border-8 border-blue-200 border-t-yellow-400 rounded-full animate-spin"
      ></div>
      <p
        class="mt-6 text-white font-black text-xl uppercase tracking-widest animate-pulse"
      >
        Procesando...
      </p>
    </div>

    <div
      v-else-if="ventana === 'login'"
      class="min-h-screen flex items-center justify-center p-4 bg-gray-100 form-section"
    >
      <div
        class="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl w-full max-w-md border border-gray-100 text-center animate-fade-in"
      >
        <h2 class="text-2xl md:text-3xl font-black text-blue-900 mb-6 md:mb-8 uppercase">
          Acceso C.E.R.O.
        </h2>
        <form @submit.prevent="iniciarSesion" class="space-y-4 md:space-y-6">
          <input
            v-model="formAuth.correo"
            type="text"
            placeholder="Correo o NIT"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <input
            v-model="formAuth.password"
            type="password"
            placeholder="Contraseña"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base md:text-lg hover:bg-blue-700 transition-all uppercase shadow-lg"
          >
            Ingresar
          </button>
          <button
            @click="ventana = 'olvidoPassword'"
            type="button"
            class="w-full text-blue-400 hover:text-blue-600 font-bold text-xs transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button
            @click="ventana = 'inicio'"
            type="button"
            class="w-full mt-2 text-gray-400 font-bold text-xs uppercase"
          >
            ← Volver
          </button>
        </form>
      </div>
    </div>

    <!-- VENTANA OLVIDÉ MI CONTRASEÑA -->
    <div
      v-else-if="ventana === 'olvidoPassword'"
      class="min-h-screen flex items-center justify-center p-4 bg-gray-100 form-section"
    >
      <div
        class="bg-white p-6 sm:p-10 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100 text-center animate-fade-in"
      >
        <div class="text-5xl mb-4">🔑</div>
        <h2 class="text-2xl font-black text-blue-900 mb-2 uppercase">Restaurar Contraseña</h2>
        <p class="text-sm text-gray-500 mb-6">
          Ingresa tu correo registrado y te enviaremos un enlace para crear una nueva contraseña.
        </p>
        <form @submit.prevent="solicitarResetPassword" class="space-y-4">
          <input
            v-model="resetCorreo"
            type="email"
            placeholder="Tu correo registrado"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <button
            type="submit"
            :disabled="cargandoReset"
            class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base hover:bg-blue-700 transition-all uppercase shadow-lg disabled:opacity-50"
          >
            {{ cargandoReset ? 'Enviando...' : 'Enviar enlace' }}
          </button>
          <p v-if="mensajeReset" class="text-sm font-bold" :class="errorReset ? 'text-red-500' : 'text-green-600'">
            {{ mensajeReset }}
          </p>
          <button
            @click="ventana = 'login'"
            type="button"
            class="w-full mt-2 text-gray-400 font-bold text-xs uppercase"
          >
            ← Volver al login
          </button>
        </form>
      </div>
    </div>

    <!-- VENTANA NUEVA CONTRASEÑA (desde enlace del correo) -->
    <div
      v-else-if="ventana === 'resetPassword'"
      class="min-h-screen flex items-center justify-center p-4 bg-gray-100 form-section"
    >
      <div
        class="bg-white p-6 sm:p-10 rounded-[2rem] shadow-xl w-full max-w-md border border-gray-100 text-center animate-fade-in"
      >
        <div class="text-5xl mb-4">🔒</div>
        <h2 class="text-2xl font-black text-blue-900 mb-2 uppercase">Nueva Contraseña</h2>
        <p class="text-sm text-gray-500 mb-6">Elige una nueva contraseña segura para tu cuenta.</p>
        <form @submit.prevent="confirmarResetPassword" class="space-y-4">
          <input
            v-model="resetNuevaPassword"
            type="password"
            placeholder="Nueva contraseña"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
            minlength="6"
          />
          <input
            v-model="resetConfirmarPassword"
            type="password"
            placeholder="Confirmar contraseña"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
            minlength="6"
          />
          <button
            type="submit"
            :disabled="cargandoReset"
            class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-base hover:bg-blue-700 transition-all uppercase shadow-lg disabled:opacity-50"
          >
            {{ cargandoReset ? 'Guardando...' : 'Guardar nueva contraseña' }}
          </button>
          <p v-if="mensajeReset" class="text-sm font-bold" :class="errorReset ? 'text-red-500' : 'text-green-600'">
            {{ mensajeReset }}
          </p>
        </form>
      </div>
    </div>

    <div
      v-else-if="ventana === 'registroColegio'"
      class="min-h-screen flex items-center justify-center p-4 bg-blue-50 form-section"
    >
      <div
        class="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl w-full max-w-md border border-blue-100 text-center animate-fade-in"
      >
        <h2 class="text-2xl md:text-3xl font-black text-blue-900 mb-2 uppercase">
          Registro Institucional
        </h2>
        <p class="text-gray-500 mb-8 font-medium italic text-sm">
          Configura la plataforma para tu institución
        </p>
        <form @submit.prevent="registrarColegio" class="space-y-4">
          <input
            v-model="formColegio.nombre"
            type="text"
            placeholder="Nombre de la Institución"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <input
            v-model="formColegio.rector"
            type="text"
            placeholder="Nombre del Rector(a)"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <input
            v-model="formColegio.nit"
            type="text"
            placeholder="NIT / Identificación"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              v-model="formColegio.ciudad"
              type="text"
              placeholder="Ciudad"
              class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
              required
            />
            <select
              v-model="formColegio.sector"
              class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            >
              <option value="Oficial">Oficial</option>
              <option value="Privado">Privado</option>
            </select>
          </div>
          <input
            v-model="formColegio.password"
            type="password"
            placeholder="Contraseña de Administrador"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />

          <div class="text-left space-y-2 mb-4">
            <label
              class="text-[10px] font-black text-blue-600 uppercase ml-2 tracking-widest"
              >Código de Activación</label
            >
            <div class="relative">
              <input
                v-model="formColegio.codigoActivacion"
                type="password"
                placeholder="••••••••"
                class="w-full p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl font-bold outline-none focus:border-blue-600 transition-all"
                required
              />
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
            </div>
            <p class="text-xs text-gray-500 ml-2 mt-1">
              ¿No tienes el código? Contáctate con los administradores de
              <span class="font-bold text-blue-600">Proyecto C.E.R.O.</span>
              para obtenerlo.
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all uppercase shadow-lg"
          >
            Crear Cuenta
          </button>
          <button
            @click="ventana = 'inicio'"
            type="button"
            class="w-full mt-2 text-gray-400 font-bold text-xs uppercase"
          >
            ← Cancelar
          </button>
        </form>
      </div>
    </div>

    <div
      v-else-if="ventana === 'cambioPassword'"
      class="min-h-screen flex items-center justify-center p-4 bg-yellow-50"
    >
      <div
        class="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl w-full max-w-md border border-yellow-100 text-center animate-fade-in"
      >
        <div
          class="bg-yellow-100 text-yellow-600 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-black text-blue-900 mb-2 uppercase">
          Seguridad Requerida
        </h2>
        <p class="text-sm text-gray-500 mb-8">
          Por ser tu primer ingreso, debes asignar una contraseña nueva y
          segura.
        </p>

        <form @submit.prevent="actualizarPasswordObligatoria" class="space-y-4">
          <input
            v-model="nuevaPass"
            type="password"
            placeholder="Nueva Contraseña"
            class="w-full p-4 sm:p-5 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <input
            v-model="confirmarPass"
            type="password"
            placeholder="Confirmar Contraseña"
            class="w-full p-4 sm:p-5 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-blue-700 transition-all uppercase shadow-lg"
          >
            Actualizar y Entrar
          </button>
        </form>
      </div>
    </div>

    <!-- VENTANA CONTACTAR ASESOR -->
    <div
      v-else-if="ventana === 'contactar'"
      class="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-5 animate-fade-in"
    >
      <div class="w-full max-w-md bg-slate-800/70 backdrop-blur border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
        <h2 class="text-2xl font-black mb-2" style="background: linear-gradient(to right, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Canales de Contacto
        </h2>
        <p class="text-slate-400 text-sm mb-8">Estamos disponibles para soporte y consultas técnicas.</p>

        <div class="flex flex-col gap-4 mb-8">
          <a href="mailto:soporte@proyectocero.com" class="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-blue-500 transition-all text-left group">
            <div class="bg-blue-500/10 text-blue-400 p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <span class="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Correo Electrónico</span>
              <span class="text-white font-medium text-sm">soporte@proyectocero.com</span>
            </div>
          </a>

          <a href="tel:+1234567890" class="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-blue-500 transition-all text-left group">
            <div class="bg-blue-500/10 text-blue-400 p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </div>
            <div>
              <span class="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Teléfono / Soporte</span>
              <span class="text-white font-medium text-sm">+1 (234) 567-890</span>
            </div>
          </a>

          <a href="#" class="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-2xl hover:border-blue-500 transition-all text-left group">
            <div class="bg-blue-500/10 text-blue-400 p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            </div>
            <div>
              <span class="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-0.5">Chat en Vivo</span>
              <span class="text-white font-medium text-sm">@dev_community</span>
            </div>
          </a>
        </div>

        <button
          @click="ventana = 'inicio'"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all uppercase text-sm shadow-lg"
        >
          ← Volver al Inicio
        </button>
      </div>
    </div>

    <div
      v-else-if="ventana === 'sistema'"
      class="min-h-screen bg-gray-50 flex animate-fade-in"
    >
      <!-- Sidebar desktop -->
      <aside
        class="hidden md:flex w-64 bg-blue-900 text-white flex-col shadow-2xl shrink-0"
      >
        <div class="p-8 text-center border-b border-blue-800">
          <h2 class="text-2xl font-black tracking-tighter uppercase">
            C.E.R.O.
          </h2>
          <p class="text-xs text-blue-300 font-bold mt-1 truncate">
            {{ usuarioActivo?.nombre_colegio }}
          </p>
        </div>
        <nav class="flex-1 p-4 space-y-2 navigation-section">
          <button
            @click="subTab = 'menu'"
            :class="subTab === 'menu' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'"
            class="w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all"
          >🏠 Inicio</button>
          <button
            @click="subTab = 'reportes'; obtenerReportes();"
            :class="subTab === 'reportes' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'"
            class="w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all"
          >📊 Mis Reportes</button>
          <button
            @click="subTab = 'nuevoReporte'"
            :class="subTab === 'nuevoReporte' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'"
            class="w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all"
          >📝 Nuevo Reporte</button>
          <button
            v-if="usuarioActivo?.rol === 'admin' || usuarioActivo?.rol === 'rector'"
            @click="subTab = 'usuarios'; cargarUsuarios();"
            :class="subTab === 'usuarios' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'"
            class="w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all"
          >👥 Usuarios</button>
        </nav>
        <div class="p-4 border-t border-blue-800">
          <button
            @click="cerrarSesion"
            class="w-full p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >🚪 Salir</button>
        </div>
      </aside>

      <!-- Navegación móvil (barra inferior) -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-blue-900 text-white z-50 flex border-t border-blue-800 shadow-2xl">
        <button
          @click="subTab = 'menu'"
          :class="subTab === 'menu' ? 'bg-blue-700' : ''"
          class="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-black uppercase transition-all"
        >
          <span class="text-lg">🏠</span>Inicio
        </button>
        <button
          @click="subTab = 'reportes'; obtenerReportes();"
          :class="subTab === 'reportes' ? 'bg-blue-700' : ''"
          class="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-black uppercase transition-all"
        >
          <span class="text-lg">📊</span>Reportes
        </button>
        <button
          @click="subTab = 'nuevoReporte'"
          :class="subTab === 'nuevoReporte' ? 'bg-blue-700' : ''"
          class="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-black uppercase transition-all"
        >
          <span class="text-lg">📝</span>Nuevo
        </button>
        <button
          v-if="usuarioActivo?.rol === 'admin' || usuarioActivo?.rol === 'rector'"
          @click="subTab = 'usuarios'; cargarUsuarios();"
          :class="subTab === 'usuarios' ? 'bg-blue-700' : ''"
          class="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-black uppercase transition-all"
        >
          <span class="text-lg">👥</span>Usuarios
        </button>
        <button
          @click="cerrarSesion"
          class="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-black uppercase text-red-400 transition-all"
        >
          <span class="text-lg">🚪</span>Salir
        </button>
      </nav>

      <main class="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8">
        <div
          class="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] shadow-lg animate-fade-in relative overflow-hidden system-header"
        >
          <div class="absolute right-[-20px] top-[-20px] opacity-10">
            <svg width="200" height="200" fill="white" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2z" />
            </svg>
          </div>
          <div class="relative z-10">
            <p
              class="text-blue-100 font-black uppercase text-[10px] tracking-[0.2em] mb-1"
            >
              Sesión Iniciada
            </p>
            <h2
              class="text-2xl md:text-3xl font-black text-white leading-tight"
            >
              {{ obtenerSaludo }},
              <span class="text-yellow-400">{{ usuarioActivo?.nombre }}</span>
            </h2>
            <p class="text-blue-50 text-xs font-medium mt-2 italic">
              Hoy es {{ nuevaFecha }} · Construyendo un entorno escolar seguro.
            </p>
          </div>
        </div>

        <header v-if="subTab !== 'menu' && subTab !== 'infoClasificacion' && subTab !== 'infoPanorama'" class="flex justify-between items-center mb-6 md:mb-10">
          <div class="flex items-center gap-3">
            <button
              @click="subTab = 'menu'"
              class="flex items-center gap-1 text-blue-500 hover:text-blue-700 font-bold text-sm transition-colors"
            >← Menú</button>
            <span class="text-gray-300">|</span>
            <h1 class="text-xl md:text-3xl font-black text-blue-900 uppercase">
              Panel de Gestión
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <span
              class="text-[10px] md:text-xs font-black bg-blue-100 text-blue-600 px-3 md:px-4 py-1 md:py-2 rounded-full uppercase tracking-widest"
              >{{ usuarioActivo?.rol }}</span
            >
          </div>
        </header>

        <!-- MENÚ PRINCIPAL -->
        <section v-if="subTab === 'menu'" class="animate-fade-in space-y-6">
          <!-- Acciones del sistema -->
          <div>
            <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Sistema</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                @click="subTab = 'reportes'; obtenerReportes();"
                class="bg-white border-2 border-blue-100 hover:border-blue-400 rounded-[2rem] p-6 text-left flex items-start gap-4 shadow-sm hover:shadow-lg transition-all group"
              >
                <span class="text-4xl">📊</span>
                <div>
                  <p class="text-base font-black text-blue-900 group-hover:text-blue-600 transition-colors">Panel de Gestión</p>
                  <p class="text-xs text-gray-400 mt-1">Ver y gestionar reportes de tu institución</p>
                </div>
              </button>
              <button
                @click="subTab = 'nuevoReporte'"
                class="bg-white border-2 border-blue-100 hover:border-blue-400 rounded-[2rem] p-6 text-left flex items-start gap-4 shadow-sm hover:shadow-lg transition-all group"
              >
                <span class="text-4xl">📝</span>
                <div>
                  <p class="text-base font-black text-blue-900 group-hover:text-blue-600 transition-colors">Nuevo Reporte</p>
                  <p class="text-xs text-gray-400 mt-1">Registrar un nuevo caso o situación escolar</p>
                </div>
              </button>
              <button
                v-if="usuarioActivo?.rol === 'admin' || usuarioActivo?.rol === 'rector'"
                @click="subTab = 'usuarios'; cargarUsuarios();"
                class="bg-white border-2 border-blue-100 hover:border-blue-400 rounded-[2rem] p-6 text-left flex items-start gap-4 shadow-sm hover:shadow-lg transition-all group"
              >
                <span class="text-4xl">👥</span>
                <div>
                  <p class="text-base font-black text-blue-900 group-hover:text-blue-600 transition-colors">Gestión de Usuarios</p>
                  <p class="text-xs text-gray-400 mt-1">Administrar estudiantes y personal</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Información y recursos -->
          <div>
            <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Información y Recursos</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="/ley1620.html"
                target="_blank"
                class="bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-[2rem] p-6 text-left flex items-start gap-4 shadow-sm hover:shadow-lg transition-all group"
              >
                <span class="text-4xl">📋</span>
                <div>
                  <p class="text-base font-black text-indigo-900 group-hover:text-indigo-600 transition-colors">Ley 1620</p>
                  <p class="text-xs text-gray-400 mt-1">Conoce la ley de convivencia escolar</p>
                </div>
              </a>
              <button
                @click="subTab = 'infoClasificacion'"
                class="bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-[2rem] p-6 text-left flex items-start gap-4 shadow-sm hover:shadow-lg transition-all group"
              >
                <span class="text-4xl">🗂️</span>
                <div>
                  <p class="text-base font-black text-indigo-900 group-hover:text-indigo-600 transition-colors">Clasificación</p>
                  <p class="text-xs text-gray-400 mt-1">Tipos de situaciones según la Ley 1620</p>
                </div>
              </button>
              <button
                @click="subTab = 'infoPanorama'"
                class="bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-[2rem] p-6 text-left flex items-start gap-4 shadow-sm hover:shadow-lg transition-all group"
              >
                <span class="text-4xl">📈</span>
                <div>
                  <p class="text-base font-black text-indigo-900 group-hover:text-indigo-600 transition-colors">Panorama Nacional</p>
                  <p class="text-xs text-gray-400 mt-1">Cifras de acoso escolar en Colombia</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Cerrar sesión -->
          <button
            @click="cerrarSesion"
            class="w-full bg-white border-2 border-red-100 hover:border-red-400 rounded-[2rem] p-5 text-left flex items-center gap-4 shadow-sm hover:shadow-lg transition-all group"
          >
            <span class="text-3xl">🚪</span>
            <div>
              <p class="text-base font-black text-gray-700 group-hover:text-red-600 transition-colors">Cerrar Sesión</p>
              <p class="text-xs text-gray-400">Salir de tu cuenta de forma segura</p>
            </div>
          </button>
        </section>

        <!-- INFO: CLASIFICACIÓN -->
        <section v-if="subTab === 'infoClasificacion'" class="animate-fade-in space-y-6">
          <button @click="subTab = 'menu'" class="flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors mb-2">
            ← Volver al menú
          </button>
          <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight">Clasificación de Situaciones</h2>
          <p class="text-gray-500 text-sm">Sistema de categorización oficial según la Ley 1620 para una respuesta adecuada y proporcional.</p>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border border-blue-200 shadow-md">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg">I</div>
              <h3 class="text-xl font-black text-blue-800 text-center mb-3">Tipo I</h3>
              <p class="text-blue-700 text-sm text-center leading-relaxed">Conflictos esporádicos o malentendidos entre estudiantes que no afectan de forma sistemática la integridad personal.</p>
              <div class="mt-4 bg-blue-200 rounded-xl p-3 text-xs text-blue-800 font-bold text-center">Resolución: hasta 5 días hábiles</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-3xl border border-yellow-200 shadow-md">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg">II</div>
              <h3 class="text-xl font-black text-yellow-800 text-center mb-3">Tipo II</h3>
              <p class="text-yellow-700 text-sm text-center leading-relaxed">Acoso escolar o ciberacoso: agresiones repetitivas que dañan gravemente el bienestar del estudiante.</p>
              <div class="mt-4 bg-yellow-200 rounded-xl p-3 text-xs text-yellow-800 font-bold text-center">Requiere intervención del Comité</div>
            </div>
            <div class="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-3xl border border-red-200 shadow-md">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4 shadow-lg">III</div>
              <h3 class="text-xl font-black text-red-800 text-center mb-3">Tipo III</h3>
              <p class="text-red-700 text-sm text-center leading-relaxed">Situaciones que pueden constituir delitos contra la libertad, integridad o formación sexual.</p>
              <div class="mt-4 bg-red-200 rounded-xl p-3 text-xs text-red-800 font-bold text-center">Requiere activación de autoridades</div>
            </div>
          </div>
        </section>

        <!-- INFO: PANORAMA NACIONAL -->
        <section v-if="subTab === 'infoPanorama'" class="animate-fade-in space-y-6">
          <button @click="subTab = 'menu'" class="flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors mb-2">
            ← Volver al menú
          </button>
          <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight">Panorama Nacional en Colombia</h2>
          <p class="text-gray-500 text-sm">Porcentaje de estudiantes que manifiestan haber sido víctimas de agresiones (cifras aproximadas según Ley 1620).</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div class="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <div class="text-3xl md:text-4xl font-black text-blue-600 mb-1">32%</div>
              <div class="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide">Verbal</div>
            </div>
            <div class="text-center p-4 md:p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200">
              <div class="text-3xl md:text-4xl font-black text-indigo-600 mb-1">26%</div>
              <div class="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide">Físico</div>
            </div>
            <div class="text-center p-4 md:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div class="text-3xl md:text-4xl font-black text-purple-600 mb-1">18%</div>
              <div class="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide">Ciberacoso</div>
            </div>
            <div class="text-center p-4 md:p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl border border-pink-200">
              <div class="text-3xl md:text-4xl font-black text-pink-600 mb-1">14%</div>
              <div class="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide">Exclusión</div>
            </div>
          </div>
          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p class="text-sm text-gray-500 leading-relaxed">Según el Ministerio de Educación Nacional, Colombia registra altos índices de violencia escolar. La Ley 1620 de 2013 busca mitigar estas cifras a través de la gestión activa de los Comités de Convivencia Escolar en cada institución.</p>
          </div>
        </section>

        <section v-if="subTab === 'reportes'" class="animate-fade-in space-y-8">
          <div
            class="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead
                  class="bg-gray-50 text-gray-400 text-xs uppercase font-black"
                >
                  <tr>
                    <th class="p-3 md:p-6">ID</th>
                    <th class="p-3 md:p-6">Tipo</th>
                    <th
                      v-if="usuarioActivo?.rol === 'admin' || usuarioActivo?.rol === 'rector'"
                      class="p-3 md:p-6"
                    >Estudiante</th>
                    <th class="p-3 md:p-6">Descripción</th>
                    <th class="p-3 md:p-6">Estado</th>
                    <th
                      v-if="usuarioActivo?.rol === 'admin' || usuarioActivo?.rol === 'rector'"
                      class="p-3 md:p-6 text-center"
                    >Gestión</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="reporte in reportes"
                    :key="reporte.id"
                    class="hover:bg-blue-50/30 transition-all"
                  >
                    <td class="p-6 font-bold text-gray-400">
                      #{{ reporte.id }}
                    </td>
                    <td class="p-6">
                      <!-- Admin: botones para clasificar directamente -->
                      <div v-if="usuarioActivo?.rol === 'admin'" class="flex flex-col gap-1">
                        <div class="flex gap-1">
                          <button
                            @click="clasificarTipo(reporte, 'Tipo I')"
                            :class="reporte.tipo === 'Tipo I' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600'"
                            class="px-2 py-1 rounded-md font-black text-[9px] uppercase transition-all"
                          >I</button>
                          <button
                            @click="clasificarTipo(reporte, 'Tipo II')"
                            :class="reporte.tipo === 'Tipo II' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-orange-100 hover:text-orange-600'"
                            class="px-2 py-1 rounded-md font-black text-[9px] uppercase transition-all"
                          >II</button>
                          <button
                            @click="clasificarTipo(reporte, 'Tipo III')"
                            :class="reporte.tipo === 'Tipo III' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'"
                            class="px-2 py-1 rounded-md font-black text-[9px] uppercase transition-all"
                          >III</button>
                        </div>
                        <span
                          :class="{
                            'text-red-600': reporte.tipo === 'Tipo III',
                            'text-orange-500': reporte.tipo === 'Tipo II',
                            'text-blue-600': reporte.tipo === 'Tipo I',
                            'text-gray-400 animate-pulse': reporte.tipo === 'Por Clasificar',
                          }"
                          class="text-[9px] font-bold uppercase"
                        >{{ reporte.tipo }}</span>
                      </div>
                      <!-- Rector/Estudiante: solo badge -->
                      <span
                        v-else
                        :class="{
                          'text-red-600 bg-red-50 border-red-100': reporte.tipo === 'Tipo III',
                          'text-orange-600 bg-orange-50 border-orange-100': reporte.tipo === 'Tipo II',
                          'text-blue-600 bg-blue-50 border-blue-100': reporte.tipo === 'Tipo I',
                          'text-gray-500 bg-gray-100 border-gray-200 animate-pulse': reporte.tipo === 'Por Clasificar',
                        }"
                        class="px-3 py-1 rounded-lg border font-black uppercase text-[10px] tracking-tighter"
                      >{{ reporte.tipo }}</span>
                    </td>
                    <td
                      v-if="usuarioActivo?.rol === 'admin' || usuarioActivo?.rol === 'rector'"
                      class="p-3 md:p-6"
                    >
                      <div class="flex flex-col">
                        <span class="font-black text-blue-900 text-xs md:text-sm uppercase">{{ reporte.nombre_usuario || "Anónimo" }}</span>
                        <span class="text-[10px] text-gray-400 font-bold italic">Remitente</span>
                      </div>
                    </td>
                    <td class="p-2 sm:p-3 md:p-6 text-gray-600 max-w-[100px] sm:max-w-[160px] md:max-w-xs font-medium">
                      <div class="flex flex-col gap-1">
                        <span class="truncate block">{{ reporte.descripcion }}</span>
                        <span
                          v-if="reporte.tipo && reporte.tipo !== 'Por Clasificar'"
                          :class="{
                            'text-blue-600 bg-blue-50': reporte.tipo === 'Tipo I',
                            'text-orange-600 bg-orange-50': reporte.tipo === 'Tipo II',
                            'text-red-600 bg-red-50': reporte.tipo === 'Tipo III',
                          }"
                          class="text-[9px] font-black uppercase px-2 py-0.5 rounded-md w-fit"
                        >
                          {{
                            reporte.tipo === 'Tipo I' ? 'Tipo I · Conflicto esporádico' :
                            reporte.tipo === 'Tipo II' ? 'Tipo II · Acoso / Ciberacoso' :
                            reporte.tipo === 'Tipo III' ? 'Tipo III · Presunto Delito' : reporte.tipo
                          }}
                        </span>
                        <span
                          v-else-if="reporte.tipo === 'Por Clasificar'"
                          class="text-[9px] font-black uppercase px-2 py-0.5 rounded-md w-fit text-gray-400 bg-gray-100 animate-pulse"
                        >
                          Por Clasificar
                        </span>
                      </div>
                    </td>
                    <td class="p-3 md:p-6">
                      <span
                        :class="{
                          'bg-orange-100 text-orange-600': reporte.estado === 'nuevo',
                          'bg-blue-100 text-blue-600': reporte.estado === 'revision',
                          'bg-green-100 text-green-600': reporte.estado === 'resuelto',
                        }"
                        class="px-2 py-1 rounded-full text-[10px] font-black uppercase italic whitespace-nowrap"
                        >{{ reporte.estado }}</span>
                    </td>
                    <td class="p-2 sm:p-3 md:p-6 text-center">
                      <div class="flex justify-center gap-1 sm:gap-2">
                        <button
                          v-if="
                            reporte.estado === 'nuevo' && reporte.editado != 1
                          "
                          @click="
                            reporteParaEditar = { ...reporte };
                            mostrarModalEdicion = true;
                          "
                          class="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all shadow-sm"
                          title="Corregir Reporte"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <span
                          v-else-if="
                            reporte.editado == 1 && reporte.estado === 'nuevo'
                          "
                          class="text-[9px] font-bold text-gray-400 uppercase"
                          >Editado</span
                        >
                        <button
                          v-if="
                            usuarioActivo?.rol === 'admin' ||
                            usuarioActivo?.rol === 'rector'
                          "
                          @click="abrirSeguimiento(reporte)"
                          class="bg-indigo-600 text-white px-2 sm:px-4 py-2 rounded-xl font-bold text-[10px] sm:text-xs hover:bg-indigo-700 transition-all uppercase whitespace-nowrap"
                        >
                          ⚙️ Gestionar
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section v-if="subTab === 'usuarios'" class="animate-fade-in space-y-8">
          <div
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <h2 class="text-lg sm:text-xl font-black text-blue-900 uppercase">
              Gestión de Usuarios
            </h2>
            <input
              v-model="filtroNombre"
              type="text"
              placeholder="Buscar usuario..."
              class="w-full sm:w-auto p-3 bg-gray-50 border-2 rounded-xl text-sm font-bold outline-none focus:border-blue-500"
            />
            <button
              @click="mostrarModalUsuario = true"
              class="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Nuevo Usuario
            </button>
          </div>

          <div
            class="bg-indigo-50 p-5 sm:p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed border-indigo-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6"
          >
            <div class="flex items-center gap-4">
              <div class="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-black text-indigo-900 uppercase text-sm">
                  Carga Masiva de Estudiantes
                </h3>
                <p
                  class="text-[10px] text-indigo-400 font-bold uppercase italic tracking-widest"
                >
                  Columnas: nombre, correo, grado, grupo
                </p>
              </div>
            </div>
            <div class="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
              <input
                type="file"
                @change="procesarExcel"
                accept=".xlsx, .xls"
                class="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer transition-all"
              />
              <button
                @click="descargarPlantilla"
                class="text-[10px] font-black text-indigo-500 underline uppercase tracking-widest hover:text-indigo-700"
              >
                Descargar Plantilla .xlsx
              </button>
            </div>
          </div>

          <div
            class="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead
                  class="bg-gray-50 text-gray-400 text-xs uppercase font-black"
                >
                  <tr>
                    <th class="p-2 sm:p-3 md:p-6 hidden sm:table-cell">ID</th>
                    <th class="p-2 sm:p-3 md:p-6">Nombre</th>
                    <th class="p-2 sm:p-3 md:p-6 hidden md:table-cell">Correo / ID</th>
                    <th class="p-2 sm:p-3 md:p-6">Rol</th>
                    <th class="p-2 sm:p-3 md:p-6 hidden sm:table-cell">Grado</th>
                    <th class="p-2 sm:p-3 md:p-6 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="usuario in usuariosFiltrados"
                    :key="usuario.id"
                    class="hover:bg-blue-50/30 transition-all"
                  >
                    <td class="p-2 sm:p-3 md:p-6 font-bold text-gray-400 hidden sm:table-cell whitespace-nowrap">
                      #{{ usuario.id }}
                    </td>
                    <td class="p-2 sm:p-3 md:p-6 font-black text-blue-900">
                      <div class="leading-tight">{{ usuario.nombre }}</div>
                      <div class="text-[10px] text-gray-400 font-normal md:hidden">{{ usuario.correo }}</div>
                    </td>
                    <td class="p-2 sm:p-3 md:p-6 font-medium text-gray-600 hidden md:table-cell">
                      {{ usuario.correo }}
                    </td>
                    <td class="p-2 sm:p-3 md:p-6">
                      <span
                        class="px-2 py-1 rounded-lg bg-blue-100 text-blue-600 font-black text-[10px] uppercase whitespace-nowrap"
                        >{{ usuario.rol }}</span
                      >
                    </td>
                    <td class="p-2 sm:p-3 md:p-6 text-gray-500 font-bold hidden sm:table-cell">
                      {{ usuario.grado || "N/A" }}
                    </td>
                    <td class="p-2 sm:p-3 md:p-6 text-center">
                      <button
                        v-if="
                          usuario.rol === 'estudiante' &&
                          usuario.id !== usuarioActivo?.id
                        "
                        @click="eliminarUsuario(usuario.id, usuario.nombre)"
                        class="text-red-400 hover:text-red-600 p-2 transition-colors inline-flex items-center justify-center bg-red-50 rounded-lg hover:bg-red-100"
                        title="Eliminar Estudiante"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>

                      <span
                        v-else
                        class="text-[9px] text-gray-300 font-bold uppercase italic tracking-tighter"
                      >
                        🔒 Protegido
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section
          v-if="subTab === 'nuevoReporte'"
          class="max-w-2xl animate-slide-up"
        >
          <div
            class="bg-white p-5 sm:p-7 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100"
          >
            <h2 class="text-xl md:text-2xl font-black text-blue-900 mb-4 md:mb-6 uppercase">
              Nuevo Reporte
            </h2>
            <div class="space-y-4">
              <div v-if="usuarioActivo?.rol !== 'estudiante'" class="space-y-2">
                <label
                  class="text-[10px] font-black text-gray-400 uppercase ml-2"
                  >Clasificación de la Situación (Ley 1620)</label
                >
                <select
                  v-model="form.tipo"
                  class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="Tipo I">
                    Situación Tipo I (Conflictos esporádicos)
                  </option>
                  <option value="Tipo II">
                    Situación Tipo II (Acoso / Bullying sistemático)
                  </option>
                  <option value="Tipo III">
                    Situación Tipo III (Presunto Delito / Agresión Grave)
                  </option>
                </select>
              </div>
              <div
                v-else
                class="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-4"
              >
                <p
                  class="text-[11px] text-blue-700 font-bold uppercase tracking-tight italic"
                >
                  ℹ️ El Comité de Convivencia clasificará este caso tras
                  analizar tu reporte.
                </p>
              </div>
              <input
                v-model="form.ubicacion"
                type="text"
                placeholder="¿Dónde ocurrió? (Ej: Salón, Patio, Baños)"
                class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-500"
              />
              <textarea
                v-model="form.descripcion"
                rows="5"
                placeholder="Descripción detallada de los hechos..."
                class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-500"
              ></textarea>
              <button
                @click="enviarReporte"
                class="w-full bg-blue-600 text-white py-4 md:py-5 rounded-2xl font-black text-base md:text-xl hover:bg-blue-700 shadow-lg transition-all"
              >
                Enviar Reporte
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- MODAL NUEVO USUARIO -->
    <div
      v-if="mostrarModalUsuario"
      class="fixed inset-0 z-[120] flex items-center justify-center bg-blue-900/80 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white w-full max-w-md rounded-[1.5rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto"
      >
        <h3 class="text-xl md:text-2xl font-black text-blue-900 mb-4 md:mb-6 uppercase">
          Registrar Usuario
        </h3>
        <form @submit.prevent="crearUsuario" class="space-y-4">
          <input
            v-model="formUsuario.nombre"
            type="text"
            placeholder="Nombre completo"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <input
            v-model="formUsuario.correo"
            type="text"
            placeholder="ID"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <input
            v-model="formUsuario.correo_recuperacion"
            type="email"
            placeholder="Correo para recuperar contraseña"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <input
            v-model="formUsuario.password"
            type="password"
            placeholder="Contraseña temporal"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            required
          />
          <select
            v-model="formUsuario.rol"
            class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
          >
            <option value="estudiante">Estudiante</option>
            <option value="rector">Rector / Directivo</option>
            <option value="admin">Administrador (TI)</option>
          </select>

          <div v-if="formUsuario.rol === 'estudiante'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              v-model="formUsuario.grado"
              type="text"
              placeholder="Grado"
              class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            />
            <input
              v-model="formUsuario.grupo"
              type="text"
              placeholder="Grupo"
              class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            />
          </div>

          <div class="flex gap-4 pt-4">
            <button
              type="button"
              @click="mostrarModalUsuario = false"
              class="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 shadow-lg"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL SEGUIMIENTO -->
    <div
      v-if="mostrarModalSeguimiento"
      class="fixed inset-0 z-[110] flex items-center justify-center bg-blue-900/80 backdrop-blur-sm p-4 modal-section"
    >
      <div
        class="bg-white w-full max-w-2xl rounded-[1.5rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto"
      >
        <h3 class="text-xl md:text-2xl font-black text-blue-900 mb-2 uppercase">
          Gestión de Intervención
        </h3>
        <div class="space-y-6 mt-4">
          <div>
            <label
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >Historial de Seguimiento</label
            >
            <div
              class="bg-gray-50 p-5 rounded-2xl mt-2 text-sm border whitespace-pre-wrap text-gray-600 italic"
            >
              {{ reporteSeleccionado?.seguimiento || "Sin registros previos." }}
            </div>
          </div>
          <div>
            <label
              class="text-[10px] font-black text-blue-600 uppercase tracking-widest"
              >Nuevas Acciones y Compromisos</label
            >
            <textarea
              v-model="nuevaIntervencion"
              rows="4"
              placeholder="Escribe aquí los acuerdos, citaciones o acciones tomadas..."
              class="w-full p-4 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
            ></textarea>
          </div>

          <div class="space-y-4">
            <label
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >Cambiar Estado del Caso</label
            >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                @click="reporteSeleccionado.estado = 'revision'"
                :class="reporteSeleccionado.estado === 'revision' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'"
                class="p-3 md:p-4 rounded-2xl font-black uppercase text-xs transition-all"
              >En Revisión</button>
              <button
                @click="reporteSeleccionado.estado = 'resuelto'"
                :class="reporteSeleccionado.estado === 'resuelto' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'"
                class="p-3 md:p-4 rounded-2xl font-black uppercase text-xs transition-all"
              >Cerrar Caso</button>
            </div>
          </div>

          <!-- Clasificación de tipo: solo admin -->
          <div v-if="usuarioActivo?.rol === 'admin'" class="space-y-3 border-t border-gray-100 pt-4">
            <label class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              Tipo de Acoso
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                @click="reporteSeleccionado.tipo = 'Tipo I'"
                :class="reporteSeleccionado?.tipo === 'Tipo I' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'"
                class="p-3 rounded-2xl font-black uppercase text-xs transition-all text-center leading-tight"
              >Tipo I · <span class="font-medium normal-case">Conflicto esporádico</span></button>
              <button
                @click="reporteSeleccionado.tipo = 'Tipo II'"
                :class="reporteSeleccionado?.tipo === 'Tipo II' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600'"
                class="p-3 rounded-2xl font-black uppercase text-xs transition-all text-center leading-tight"
              >Tipo II · <span class="font-medium normal-case">Acoso / Ciberacoso</span></button>
              <button
                @click="reporteSeleccionado.tipo = 'Tipo III'"
                :class="reporteSeleccionado?.tipo === 'Tipo III' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600'"
                class="p-3 rounded-2xl font-black uppercase text-xs transition-all text-center leading-tight"
              >Tipo III · <span class="font-medium normal-case">Presunto delito</span></button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              @click="mostrarModalSeguimiento = false"
              class="flex-1 py-3 sm:py-4 font-bold text-gray-400 hover:text-gray-600 uppercase text-xs"
            >
              Cancelar
            </button>
            <button
              v-if="reporteSeleccionado?.estado === 'resuelto'"
              @click="descargarActa(reporteSeleccionado)"
              class="flex-1 bg-gray-100 text-gray-600 py-3 sm:py-4 px-4 rounded-2xl font-black hover:bg-gray-200 transition-all uppercase text-xs"
            >
              📄 Descargar Acta
            </button>
            <button
              @click="guardarYGenerarActa"
              class="flex-1 sm:flex-[2] bg-indigo-600 text-white py-3 sm:py-4 px-6 rounded-2xl font-black hover:bg-indigo-700 shadow-xl transition-all uppercase text-xs"
            >
              Guardar Gestión
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDICIÓN -->
    <div
      v-if="mostrarModalEdicion"
      class="fixed inset-0 z-[120] flex items-center justify-center bg-blue-900/80 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white w-full max-w-lg rounded-[1.5rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl animate-slide-up"
      >
        <h3 class="text-xl md:text-2xl font-black text-blue-900 mb-2 uppercase">
          Corregir Reporte
        </h3>
        <p class="text-xs text-gray-400 mb-6 font-bold italic">
          Solo puedes editar la descripción antes de que sea gestionado.
        </p>
        <textarea
          v-model="reporteParaEditar.descripcion"
          rows="6"
          class="w-full p-5 bg-gray-50 border-2 rounded-2xl font-bold outline-none focus:border-blue-600"
        ></textarea>
        <div class="flex gap-4 mt-6">
          <button
            @click="mostrarModalEdicion = false"
            class="flex-1 py-4 font-bold text-gray-400"
          >
            Cancelar
          </button>
          <button
            @click="guardarEdicionBackend"
            class="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 shadow-lg"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>

    <!-- MOLDE ACTA PDF (OCULTO) -->
    <div style="display: none">
      <div
        id="molde-acta-pdf"
        class="p-10 bg-white text-black"
        style="width: 800px; font-family: sans-serif"
      >
        <div class="text-center border-b-2 border-blue-600 pb-4 mb-6">
          <h1 class="text-2xl font-bold uppercase">
            Acta de Seguimiento de Convivencia
          </h1>
          <p class="text-sm font-bold">{{ usuarioActivo?.nombre_colegio }}</p>
          <p class="text-xs italic">Proyecto C.E.R.O. - Puerto Tejada</p>
        </div>
        <div class="space-y-4" v-if="reporteSeleccionado">
          <p><strong>ID del Caso:</strong> #{{ reporteSeleccionado.id }}</p>
          <p>
            <strong>Tipo de Situación:</strong> {{ reporteSeleccionado.tipo }}
          </p>
          <p><strong>Ubicación:</strong> {{ reporteSeleccionado.ubicacion }}</p>
          <hr />
          <p><strong>Descripción de los Hechos:</strong></p>
          <div class="p-4 bg-gray-50 border rounded italic">
            {{ reporteSeleccionado.descripcion }}
          </div>
          <p><strong>Acciones y Seguimiento Realizado:</strong></p>
          <div class="p-4 border rounded whitespace-pre-wrap">
            {{ reporteSeleccionado.seguimiento }}
          </div>
          <div class="mt-20 flex justify-between">
            <div class="border-t border-black w-48 text-center pt-2 text-xs">
              Firma Rector/Coordinador
            </div>
            <div class="border-t border-black w-48 text-center pt-2 text-xs">
              Firma Acudiente/Estudiante
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- INDICADOR DE CARGA -->
    <div
      v-if="cargando"
      class="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-blue-900/90 backdrop-blur-sm"
    >
      <div
        class="w-24 h-24 border-8 border-blue-200 border-t-yellow-400 rounded-full animate-spin"
      ></div>
      <p
        class="mt-6 text-white font-black text-xl uppercase tracking-widest animate-pulse"
      >
        Procesando...
      </p>
    </div>

    <!-- BOTONES FLOTANTES GLOBALES -->
    <button
      @click="mostrarChatbot = !mostrarChatbot"
      type="button"
      class="fixed bottom-20 right-4 md:bottom-24 md:right-8 bg-blue-900 text-white p-3 md:p-4 rounded-full shadow-2xl z-[100] hover:scale-110 active:scale-95 transition-all cursor-pointer"
    >
      <svg
        v-if="!mostrarChatbot"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <button
      v-if="mostrarBotonArriba"
      @click="volverArriba"
      class="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-blue-600 text-white p-3 md:p-4 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all z-50"
    >
      ↑
    </button>

    <!-- VENTANA CHATBOT -->
    <div
      v-show="mostrarChatbot"
      class="fixed bottom-16 right-2 w-[calc(100vw-1rem)] max-w-sm md:bottom-40 md:right-8 md:w-80 bg-white shadow-2xl rounded-3xl overflow-hidden z-50 border border-gray-100 flex flex-col animate-fade-in"
    >
      <div class="bg-blue-900 p-4 text-white">
        <h3 class="font-black text-sm uppercase tracking-tighter">
          Asistente C.E.R.O
        </h3>
        <p class="text-[10px] text-blue-300">En línea para ayudarte</p>
      </div>

      <div
        ref="chatContainer"
        class="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50 text-xs"
      >
        <div
          v-for="(msg, idx) in historialChat"
          :key="idx"
          :class="[
            'p-3 rounded-2xl max-w-[80%] shadow-sm text-xs leading-relaxed',
            msg.emisor === 'bot'
              ? 'bg-white text-gray-700 rounded-bl-none'
              : 'bg-blue-600 text-white ml-auto rounded-br-none',
          ]"
        >
          {{ msg.texto }}
        </div>
        <!-- Indicador escribiendo -->
        <div v-if="chatCargando" class="bg-white p-3 rounded-2xl rounded-bl-none max-w-[60%] shadow-sm flex gap-1 items-center">
          <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
          <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
          <span class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
        </div>
      </div>

      <div class="p-3 border-t bg-white flex gap-2">
        <input
          v-model="mensajeChat"
          @keyup.enter="enviarDuda"
          :disabled="chatCargando"
          type="text"
          placeholder="Escribe tu duda..."
          class="flex-1 text-xs p-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
        />
        <button
          @click="enviarDuda"
          :disabled="chatCargando"
          type="button"
          class="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "./services/api";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";
import Chart from "chart.js/auto";
import "aos/dist/aos.css";

export default {
  data() {
    return {
      mostrarChatbot: false,
      mensajeChat: "",
      chatCargando: false,
      historialChat: [
        {
          emisor: "bot",
          texto:
            "¡Hola! Soy el asistente de C.E.R.O. Puedo ayudarte con información sobre acoso escolar, Ley 1620, cómo reportar casos y más. ¿En qué puedo ayudarte?",
        },
      ],
      // Base de conocimiento para respuestas rápidas
      respuestasBot: {
        "ley 1620":
          "La Ley 1620 de 2013 crea el Sistema Nacional de Convivencia Escolar para prevenir el bullying y promover los derechos humanos.",
        reportar:
          "Para reportar un caso, ve a la sección 'Reportar' en tu panel, describe lo sucedido y selecciona la ubicación.",
        anonimo:
          "Sí, todos los reportes pueden ser anónimos para proteger tu identidad y seguridad.",
        password:
          "Si olvidaste tu contraseña, debes contactar al administrador o rector de tu institución para un reinicio.",
      },

      mostrarBotonArriba: false,
      // Datos del Carrusel
      indiceCarrusel: 0,
      imagenesCarrusel: [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
      ],
      frasesCarrusel: [
        "Unidos por una convivencia en paz",
        "Tu voz es tu poder, ¡reporta!",
        "En este colegio, todos somos amigos",
      ],
      // Modales y Edición
      mostrarModalEdicion: false,
      reporteParaEditar: { id: null, descripcion: "" },
      mostrarModalSeguimiento: false,
      reporteSeleccionado: null,
      estadoOriginalReporte: null,
      mostrarModalUsuario: false,

      // Datos de usuario y navegación
      ventana: "inicio",
      subTab: "menu",
      usuarioActivo: null,
      cargando: false,

      // Listas
      reportes: [],
      listaUsuarios: [],

      // Filtros y Formularios
      filtroNombre: "",
      nuevaClave: "",
      confirmarClave: "",
      nuevaIntervencion: "",
      formColegio: {
        nit: "",
        nombre: "",
        password: "",
        rector: "",
        ciudad: "",
        sector: "Oficial",
        codigoActivacion: "",
      },
      formUsuario: {
        nombre: "",
        correo: "",
        correo_recuperacion: "",
        password: "",
        rol: "estudiante",
        grado: "",
        grupo: "",
      },
      formAuth: { correo: "", password: "" },
      resetCorreo: "",
      resetNuevaPassword: "",
      resetConfirmarPassword: "",
      resetToken: "",
      cargandoReset: false,
      mensajeReset: "",
      errorReset: false,
      form: {
        tipo: "Tipo I",
        descripcion: "",
        ubicacion: "",
        anonimo: true,
      },
      nuevaPass: "",
      confirmarPass: "",
    };
  },

  computed: {
    sinAtender() {
      return this.reportes.filter((r) => r.estado === "nuevo").length;
    },
    enRevision() {
      return this.reportes.filter((r) => r.estado === "revision").length;
    },
    resueltos() {
      return this.reportes.filter((r) => r.estado === "resuelto").length;
    },

    usuariosFiltrados() {
      if (!this.filtroNombre) return this.listaUsuarios;
      const buscar = this.filtroNombre.toLowerCase();
      return this.listaUsuarios.filter(
        (u) =>
          u.nombre.toLowerCase().includes(buscar) ||
          u.correo.toLowerCase().includes(buscar),
      );
    },

    obtenerSaludo() {
      const hora = new Date().getHours();
      if (hora >= 5 && hora < 12) return "¡Buenos días!";
      if (hora >= 12 && hora < 18) return "¡Buenas tardes!";
      return "¡Buenas noches!";
    },

    nuevaFecha() {
      const opciones = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date().toLocaleDateString("es-ES", opciones);
    },
  },

  watch: {
    ventana(nuevaVentana) {
      if (nuevaVentana === "inicio") {
        this.$nextTick(() => {
          this.renderizarGrafica();
        });
      }
      if (nuevaVentana === "login") {
        this.formAuth = { correo: "", password: "" };
        this.mensajeReset = "";
        this.errorReset = false;
        this.resetCorreo = "";
      }
    },
    subTab(nuevoValor) {
      if (nuevoValor === "usuarios") {
        this.cargarUsuarios();
      }
    },
  },

  mounted() {
    this.controlarScrollRef = this.controlarScroll.bind(this);
    window.addEventListener("scroll", this.controlarScrollRef);

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      this.resetToken = token;
      this.ventana = "resetPassword";
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const ventanaParam = params.get("ventana");
    if (ventanaParam === "login") {
      this.ventana = "login";
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Interceptar botón atrás del navegador cuando hay sesión activa
    window.history.pushState({ sistema: true }, "");
    this._popstateHandler = () => {
      if (this.ventana === "sistema") {
        window.history.pushState({ sistema: true }, "");
        this.subTab = "menu";
      }
    };
    window.addEventListener("popstate", this._popstateHandler);

    const sesionGuardada = localStorage.getItem("usuarioProyecto");
    if (sesionGuardada && !token) {
      try {
        this.usuarioActivo = JSON.parse(sesionGuardada);
        this.ventana = "sistema";
        this.$nextTick(() => {
          this.obtenerReportes();
          if (this.usuarioActivo.rol === "admin" || this.usuarioActivo.rol === "rector") {
            this.cargarUsuarios();
          }
        });
      } catch (e) {
        localStorage.removeItem("usuarioProyecto");
      }
    }

    this.$nextTick(() => {
      this.renderizarGrafica();
    });

    setInterval(() => {
      this.indiceCarrusel =
        (this.indiceCarrusel + 1) % this.imagenesCarrusel.length;
    }, 5000);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.controlarScrollRef);
    window.removeEventListener("popstate", this._popstateHandler);
  },

  methods: {
    async solicitarResetPassword() {
      this.cargandoReset = true;
      this.mensajeReset = "";
      this.errorReset = false;
      try {
        const res = await api.post("/auth/forgot-password", { correo: this.resetCorreo });
        this.mensajeReset = res.data.message;
        this.errorReset = false;
      } catch (e) {
        this.mensajeReset = e.response?.data?.message || "Error al enviar el correo.";
        this.errorReset = true;
      } finally {
        this.cargandoReset = false;
      }
    },

    async confirmarResetPassword() {
      if (this.resetNuevaPassword !== this.resetConfirmarPassword) {
        this.mensajeReset = "Las contraseñas no coinciden.";
        this.errorReset = true;
        return;
      }
      this.cargandoReset = true;
      this.mensajeReset = "";
      this.errorReset = false;
      try {
        const res = await api.post("/auth/reset-password", {
          token: this.resetToken,
          nuevaPassword: this.resetNuevaPassword
        });
        this.mensajeReset = res.data.message;
        this.errorReset = false;
        setTimeout(() => { this.ventana = "login"; }, 2500);
      } catch (e) {
        this.mensajeReset = e.response?.data?.message || "Error al actualizar la contraseña.";
        this.errorReset = true;
      } finally {
        this.cargandoReset = false;
      }
    },

    async enviarDuda() {
      if (!this.mensajeChat || !this.mensajeChat.trim()) return;

      const mensaje = this.mensajeChat;
      this.historialChat.push({ emisor: "usuario", texto: mensaje });
      this.mensajeChat = "";
      this.chatCargando = true;

      this.$nextTick(() => {
        const container = this.$refs.chatContainer;
        if (container) container.scrollTop = container.scrollHeight;
      });

      try {
        const response = await api.post("/chatbot", {
          mensaje,
          historial: this.historialChat.slice(-8),
        });
        this.historialChat.push({
          emisor: "bot",
          texto: response.data.respuesta,
        });
      } catch {
        this.historialChat.push({
          emisor: "bot",
          texto: "Lo siento, no puedo responder en este momento. Intenta de nuevo más tarde.",
        });
      } finally {
        this.chatCargando = false;
        this.$nextTick(() => {
          const container = this.$refs.chatContainer;
          if (container) container.scrollTop = container.scrollHeight;
        });
      }
    },

    toggleChat() {
      this.mostrarChatbot = !this.mostrarChatbot;
    },

    controlarScroll() {
      const posicion = window.scrollY || window.pageYOffset;
      this.mostrarBotonArriba = posicion > 300;
    },

    volverArriba() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    limpiarFormulario() {
      this.form = {
        tipo: "Tipo I",
        ubicacion: "",
        descripcion: "",
        anonimo: true,
      };
    },

    renderizarGrafica() {
      const canvas = document.getElementById("graficaBullying");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (window.miGrafica) {
        window.miGrafica.destroy();
      }
      window.miGrafica = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Acoso Verbal",
            "Exclusión Social",
            "Ciberacoso",
            "Agresión Física",
          ],
          datasets: [
            {
              label: "% de estudiantes que reportan casos (Colombia)",
              data: [32, 26, 18, 12],
              backgroundColor: ["#4f46e5", "#818cf8", "#6366f1", "#4338ca"],
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "bottom" },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: "Porcentaje (%)" },
            },
          },
        },
      });
    },

    async guardarEdicionBackend() {
      if (!this.reporteParaEditar.descripcion.trim()) return;
      this.cargando = true;
      try {
        const response = await api.put(
          `/reportes/${this.reporteParaEditar.id}`,
          {
            descripcion: this.reporteParaEditar.descripcion,
          },
        );
        if (response.data.success) {
          const index = this.reportes.findIndex(
            (r) => r.id === this.reporteParaEditar.id,
          );
          if (index !== -1) {
            this.reportes[index].descripcion =
              this.reporteParaEditar.descripcion;
            this.reportes[index].editado = 1;
          }
          this.mostrarModalEdicion = false;
          alert("✅ Reporte corregido exitosamente.");
        }
      } catch (error) {
        alert(
          "❌ Error al guardar: " +
            (error.response?.data?.message || "Servidor no responde"),
        );
      } finally {
        this.cargando = false;
      }
    },

    async clasificarTipo(reporte, tipo) {
      try {
        await api.put(`/reportes/${reporte.id}`, { tipo });
        reporte.tipo = tipo;
      } catch (error) {
        alert("Error al clasificar el caso.");
      }
    },

    abrirSeguimiento(reporte) {
      this.reporteSeleccionado = reporte;
      this.estadoOriginalReporte = reporte.estado;
      this.nuevaIntervencion = "";
      this.mostrarModalSeguimiento = true;
    },

    async guardarYGenerarActa() {
      const tieneNota = this.nuevaIntervencion.trim().length > 0;
      const tipoValido = ['Tipo I', 'Tipo II', 'Tipo III'].includes(this.reporteSeleccionado.tipo);

      if (!tieneNota && !tipoValido) {
        alert(
          "Por favor, describe las acciones o compromisos, o clasifica el tipo de caso antes de guardar.",
        );
        return;
      }
      try {
        this.cargando = true;
        const fechaActual = new Date().toLocaleDateString();
        const seguimientoActualizado = tieneNota
          ? (this.reporteSeleccionado.seguimiento || "") +
            `\n\n[${fechaActual}]: ${this.nuevaIntervencion}`
          : this.reporteSeleccionado.seguimiento || "";

        await api.put(`/reportes/${this.reporteSeleccionado.id}`, {
          seguimiento: seguimientoActualizado,
          estado: this.reporteSeleccionado.estado,
          tipo: this.reporteSeleccionado.tipo,
        });

        this.reporteSeleccionado.seguimiento = seguimientoActualizado;
        await this.obtenerReportes();

        const recienResuelto = this.reporteSeleccionado.estado === "resuelto" && this.estadoOriginalReporte !== "resuelto";
        if (recienResuelto) {
          this.$nextTick(() => {
            this.descargarActa(this.reporteSeleccionado);
          });
        } else {
          alert("Gestión guardada con éxito en el historial.");
        }
        this.mostrarModalSeguimiento = false;
        this.nuevaIntervencion = "";
      } catch (error) {
        alert("Error de servidor. Verifica la consola para más detalles.");
      } finally {
        this.cargando = false;
      }
    },

    async iniciarSesion() {
      try {
        this.cargando = true;
        const res = await api.post("/login", this.formAuth);
        if (res.data.success) {
          this.listaUsuarios = [];
          this.reportes = [];
          this.filtroNombre = "";
          this.form = { tipo: "Tipo I", ubicacion: "", descripcion: "", anonimo: true };

          const user = res.data.user;
          this.usuarioActivo = user;

          if (user.mustChangePassword) {
            this.ventana = "cambioPassword";
            return;
          }

          localStorage.setItem("usuarioProyecto", JSON.stringify(user));
          this.ventana = "sistema";
          this.obtenerReportes();

          if (
            this.usuarioActivo.rol === "admin" ||
            this.usuarioActivo.rol === "rector"
          ) {
            this.cargarUsuarios();
          }
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error al ingresar");
      } finally {
        this.cargando = false;
      }
    },

    cerrarSesion() {
      localStorage.removeItem("usuarioProyecto");
      this.usuarioActivo = null;
      this.formAuth.correo = "";
      this.formAuth.password = "";
      this.ventana = "inicio";
    },

    async actualizarPasswordObligatoria() {
      if (this.nuevaPass !== this.confirmarPass) {
        alert("Las contraseñas no coinciden");
        return;
      }
      try {
        this.cargando = true;
        const res = await api.post("/usuarios/actualizar-password-inicial", {
          usuarioId: this.usuarioActivo.id,
          nuevoPassword: this.nuevaPass,
        });
        if (res.data.success) {
          alert("¡Contraseña actualizada con éxito!");
          this.usuarioActivo.mustChangePassword = false;
          localStorage.setItem(
            "usuarioProyecto",
            JSON.stringify(this.usuarioActivo),
          );
          this.nuevaPass = "";
          this.confirmarPass = "";
          this.ventana = "sistema";
          this.obtenerReportes();
        }
      } catch (error) {
        alert(
          error.response?.data?.message || "Error al conectar con el servidor",
        );
      } finally {
        this.cargando = false;
      }
    },

    async obtenerReportes() {
      if (!this.usuarioActivo?.colegio_id) return;
      try {
        const res = await api.get(
          `/estadisticas/${this.usuarioActivo.colegio_id}`,
          {
            params: {
              usuario_id: this.usuarioActivo.id,
              rol: this.usuarioActivo.rol,
            },
          },
        );
        this.reportes = res.data;
      } catch (e) {
        console.error("Error al obtener reportes:", e);
      }
    },

    async enviarReporte() {
      if (this.usuarioActivo.rol === "estudiante") {
        this.form.tipo = "Por Clasificar";
      }
      if (!this.form.descripcion) return alert("Escribe una descripción");
      try {
        const datosReporte = {
          ...this.form,
          usuario_id: this.usuarioActivo.id,
          colegio_id: this.usuarioActivo.colegio_id,
        };
        await api.post("/reportes", datosReporte);
        alert("Reporte enviado con éxito ✅");
        this.limpiarFormulario();
        this.subTab = "reportes";
        this.obtenerReportes();
      } catch (e) {
        alert("Error al enviar reporte");
      }
    },

    async cargarUsuarios() {
      if (!this.usuarioActivo?.colegio_id) return;
      this.cargando = true;
      try {
        const res = await api.get(`/usuarios/${this.usuarioActivo.colegio_id}`);
        this.listaUsuarios = res.data;
      } catch (e) {
        alert("No se pudieron cargar los usuarios");
      } finally {
        this.cargando = false;
      }
    },

    async eliminarUsuario(id, nombre) {
      if (!confirm(`¿Seguro que deseas eliminar a ${nombre}?`)) return;
      try {
        this.cargando = true;
        const res = await api.delete(`/usuarios/${id}`);
        if (res.data.success) {
          alert("Usuario eliminado");
          await this.cargarUsuarios();
        }
      } catch (e) {
        alert("No se pudo eliminar");
      } finally {
        this.cargando = false;
      }
    },

    async crearUsuario() {
      try {
        this.cargando = true;
        const datos = {
          ...this.formUsuario,
          colegio_id: this.usuarioActivo.colegio_id,
        };
        const res = await api.post("/usuarios", datos);
        if (res.data.success) {
          alert("¡Usuario creado con éxito!");
          this.mostrarModalUsuario = false;
          this.formUsuario = {
            nombre: "",
            correo: "",
            correo_recuperacion: "",
            password: "",
            rol: "estudiante",
            grado: "",
            grupo: "",
          };
          this.cargarUsuarios();
        }
      } catch (e) {
        alert(
          "Error al crear usuario: " +
            (e.response?.data?.message || "Error de servidor"),
        );
      } finally {
        this.cargando = false;
      }
    },

    async registrarColegio() {
      this.cargando = true;
      try {
        const LLAVE_DE_ACCESO = "CERO2026";
        if (this.formColegio.codigoActivacion !== LLAVE_DE_ACCESO) {
          alert("⚠️ Código de Activación no válido.");
          return;
        }
        const datosEnvio = {
          ...this.formColegio,
          ubicacion: this.formColegio.ciudad,
        };
        const res = await api.post("/colegios/registro", datosEnvio);
        if (res.data.success) {
          alert("¡Institución registrada con éxito!");
          this.ventana = "login";
          this.formColegio = {
            nit: "",
            nombre: "",
            password: "",
            rector: "",
            ciudad: "",
            sector: "Oficial",
            codigoActivacion: "",
          };
        }
      } catch (e) {
        alert(
          "Error en registro: " +
            (e.response?.data?.message || "Servidor no disponible"),
        );
      } finally {
        this.cargando = false;
      }
    },

    async descargarActa(reporte) {
      try {
        this.cargando = true;
        this.reporteSeleccionado = reporte;
        await this.$nextTick();
        await new Promise((resolve) => setTimeout(resolve, 800));
        const elemento = document.getElementById("molde-acta-pdf");
        if (!elemento) throw new Error("No se encontró el molde");

        const opciones = {
          margin: [0.5, 0.5],
          filename: `Acta_Caso_${reporte.id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            windowWidth: 800,
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        await html2pdf().set(opciones).from(elemento).save();
      } catch (error) {
        alert("Error al generar PDF");
      } finally {
        this.cargando = false;
      }
    },

    async procesarExcel(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      this.cargando = true;
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const listaEstudiantes = XLSX.utils.sheet_to_json(worksheet);
          const res = await api.post("/estudiantes/carga-masiva", {
            estudiantes: listaEstudiantes,
            colegio_id: this.usuarioActivo.colegio_id,
          });
          alert(res.data.message);
          this.cargarUsuarios();
        } catch (error) {
          alert("Error al procesar archivo");
        } finally {
          this.cargando = false;
          event.target.value = "";
        }
      };
      reader.readAsArrayBuffer(file);
    },

    descargarPlantilla() {
      const data = [{ nombre: "Ejemplo", correo: "ejemplo@colegio.edu.co", grado: "11", grupo: "A" }];
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");
      XLSX.writeFile(workbook, "Plantilla_CERO.xlsx");
    },
  },
};
</script>

<style scoped>
.relative { position: relative; }
.overflow-hidden { overflow: hidden; }
.w-full { width: 100%; }
.h-64 { height: 16rem; }
.fade-enter-active, .fade-leave-active { transition: opacity 1.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.bg-cover { background-size: cover; }
.bg-center { background-position: center; }
.absolute { position: absolute; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
.animate-slide-up { animation: slideUp 0.6s ease-out; }
button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
button:active { transform: translateY(0); }
.shadow-soft { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); }
.nav-premium { backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
.btn-premium { position: relative; overflow: hidden; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); transition: all 0.3s ease; }
.chart-container { background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%); border-radius: 1rem; padding: 1.5rem; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
.modal-section { animation: fadeIn 0.3s ease-out; }
.carousel-section { border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12); }
.form-section { background: linear-gradient(180deg, rgba(240, 248, 255, 0.9), rgba(255, 255, 255, 0.95)); }
</style>
