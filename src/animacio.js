// Punto único de GSAP: los plugins se registran una sola vez y todos importan de aquí.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Cuando llegan las fuentes cambia el tamaño del texto: hay que recalcular los triggers
document.fonts?.ready.then(() => ScrollTrigger.refresh())

// Solo se anima si el usuario no ha pedido reducir el movimiento.
// Con «reduce» no se crea nada y se ve el CSS por defecto, que es el estado final.
export const AMB_MOVIMENT = '(prefers-reduced-motion: no-preference)'

// Lee un color del @theme de Tailwind (GSAP no puede interpolar var(--...))
export const colorTema = (nom) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--color-${nom}`).trim()

export { gsap, ScrollTrigger, useGSAP }
