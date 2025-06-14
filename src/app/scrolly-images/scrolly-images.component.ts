
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para componentes standalone
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

@Component({
  selector: 'app-scrolly-images',
  standalone: true, // Esto lo define como un componente standalone
  imports: [CommonModule], // Importa CommonModule si usas directivas como ngIf, ngFor, etc.
  templateUrl: './scrolly-images.component.html',
  styleUrls: ['./scrolly-images.component.css']
})
export class ScrollyImagesComponent implements OnInit, AfterViewInit, OnDestroy {
  // Declaramos estas variables como propiedades de la clase para que sean accesibles en todos los métodos
  private smoother: ScrollSmoother | undefined;
  private skewSetter: Function | undefined;
  private clamp: Function | undefined;

  constructor() { }

  /**
   * ngOnInit se ejecuta después de que Angular inicializa las propiedades del componente.
   * Es el lugar ideal para registrar los plugins de GSAP, asegurando que estén disponibles
   * antes de intentar crear animaciones.
   */
  ngOnInit(): void {
    // Registra los plugins de GSAP. ¡Esto es crucial!
    // Solo necesitas registrarlos una vez en tu aplicación, pero hacerlo aquí es seguro
    // si este componente es el primero en usarlos.
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  }

  /**
   * ngAfterViewInit se ejecuta después de que la vista del componente y las vistas de sus hijos
   * han sido inicializadas. En este punto, los elementos DOM (como #wrapper, #content, y las <img>)
   * ya están disponibles, lo cual es esencial para que GSAP pueda seleccionarlos y animarlos.
   */
  ngAfterViewInit(): void {
    // Inicializa skewSetter y clamp una vez que los elementos DOM están disponibles
    this.skewSetter = gsap.quickTo("img", "skewY");
    this.clamp = gsap.utils.clamp(-20, 20);

    // Crea la instancia de ScrollSmoother
    this.smoother = ScrollSmoother.create({
      wrapper: "#wrapper",
      content: "#content",
      smooth: 2,
      // La propiedad 'speed' en ScrollSmoother no es estándar en las últimas versiones.
      // Si el efecto no es el esperado, considera eliminarla o ajustarla según tu versión de GSAP.
      // Para este ejemplo, la mantengo ya que estaba en tu JS original.
      speed: 3,
      effects: true, // Habilita los efectos de data-speed en los elementos hijos

      // Callback que se ejecuta en cada actualización del scroll (mientras el usuario scrolllea)
      onUpdate: (self) => {
        // Solo aplica el skew si skewSetter y clamp están definidos
        if (this.skewSetter && this.clamp) {
          // Calcula el skew basado en la velocidad del scroll
          this.skewSetter(this.clamp(self.getVelocity() / -50));
        }
      },
      // Callback que se ejecuta cuando el scroll se detiene
      onStop: () => {
        // Resetea el skew a 0 cuando el scroll se detiene
        if (this.skewSetter) {
          this.skewSetter(0);
        }
      }
    });
  }

  /**
   * ngOnDestroy se ejecuta justo antes de que Angular destruya el componente.
   * Es crucial limpiar cualquier instancia de GSAP (como ScrollSmoother o ScrollTrigger)
   * para evitar fugas de memoria y asegurar que las animaciones se detengan correctamente
   * si el componente se retira del DOM (por ejemplo, al navegar a otra ruta).
   */
  ngOnDestroy(): void {
    // Destruye la instancia de ScrollSmoother para limpiar los listeners de eventos
    if (this.smoother) {
      this.smoother.kill();
    }
    // Asegúrate de que ScrollTrigger también se limpie si se crean instancias individuales
    // Aunque ScrollSmoother suele manejar esto para sus ScrollTriggers internos,
    // es una buena práctica si tuvieras otros ScrollTriggers no vinculados a smoother.
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}
