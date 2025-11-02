'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

interface Vector2D {
  x: number
  y: number
}

class Particle implements Vector2D {
  x: number
  y: number
  size: number
  private dx: number
  private dy: number

  constructor() {
    this.x = 0
    this.y = 0
    this.size = 2
    this.dx = 0
    this.dy = 0
  }

  static create(width: number, height: number): Particle {
    const p = new Particle()
    p.x = Math.random() * width
    p.y = Math.random() * height
    p.size = Math.random() * 3 + 1
    p.dx = Math.random() * 3 - 1.5
    p.dy = Math.random() * 3 - 1.5
    return p
  }

  update(width: number, height: number): void {
    this.x += this.dx
    this.y += this.dy

    if (this.x > width) this.x = 0
    if (this.x < 0) this.x = width
    if (this.y > height) this.y = 0
    if (this.y < 0) this.y = height
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }

  drawConnectionTo(ctx: CanvasRenderingContext2D, other: Particle): void {
    const dx = this.x - other.x
    const dy = this.y - other.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 100) {
      ctx.beginPath()
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`
      ctx.lineWidth = 1
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(other.x, other.y)
      ctx.stroke()
    }
  }
}

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect reduced motion preferences
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const particles: Particle[] = []

    function createParticles() {
      particles.splice(0, particles.length)
      for (let i = 0; i < 100; i++) {
        particles.push(Particle.create(canvas.width, canvas.height))
      }
    }

    function handleResize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    let animationId: number

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.update(canvas.width, canvas.height)
        p.draw(ctx)
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          particles[i].drawConnectionTo(ctx, particles[j])
        }
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(render)
    } else {
      // Draw a single static frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => p.draw(ctx))
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  const style: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    background: 'transparent'
  }

  return <canvas ref={canvasRef} style={style} />
}

export default Canvas
