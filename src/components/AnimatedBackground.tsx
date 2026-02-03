'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

interface AnimatedBackgroundProps {
  variant?: 'magnetic-field' | 'cubes' | 'particle-explode' | 'orb-flow' | 'grid-warp' | 'matrix-rain';
  intensity?: 'subtle' | 'medium' | 'high';
}

export default function AnimatedBackground({
  variant = 'magnetic-field',
  intensity = 'subtle'
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const linkRgb = getComputedStyle(document.documentElement)
      .getPropertyValue('--link-rgb')
      .trim() || '99, 102, 241'

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animationId: number
    let width = 0
    let height = 0

    function handleResize() {
      if (!canvas) return
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Center initial mouse
    mouseRef.current = { x: width / 2, y: height / 2 }

    if (variant === 'magnetic-field') {
      renderMagneticField(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else if (variant === 'cubes') {
      renderCubes(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else if (variant === 'particle-explode') {
      renderParticleExplode(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else if (variant === 'orb-flow') {
      renderOrbFlow(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else if (variant === 'grid-warp') {
      renderGridWarp(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else if (variant === 'matrix-rain') {
      renderMatrixRain(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else {
      renderMagneticField(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    }

    // --- Render Functions ---

    function renderMagneticField(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      reducedMotion: boolean,
      intensity: string,
      linkRgb: string
    ) {
      // Grid of lines that point to mouse
      const spacing = intensity === 'high' ? 30 : 50
      const rows = Math.ceil(canvas.height / spacing)
      const cols = Math.ceil(canvas.width / spacing)

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = `rgba(${linkRgb}, 0.3)`
        ctx.lineWidth = 1.5

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = i * spacing + spacing / 2
            const y = j * spacing + spacing / 2

            const dx = mouseRef.current.x - x
            const dy = mouseRef.current.y - y
            const angle = Math.atan2(dy, dx)
            const dist = Math.sqrt(dx * dx + dy * dy)

            // Length based on distance
            const lineLen = Math.min(spacing * 0.8, 10000 / dist) // longer when closer

            if (!reducedMotion) {
              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(x + Math.cos(angle) * lineLen, y + Math.sin(angle) * lineLen)
              ctx.stroke()
            } else {
              ctx.beginPath()
              ctx.arc(x, y, 2, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(${linkRgb}, 0.2)`
              ctx.fill()
            }
          }
        }
        if (!reducedMotion) animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    function renderCubes(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      reducedMotion: boolean,
      intensity: string,
      linkRgb: string
    ) {
      const cubes: { x: number, y: number, z: number, size: number }[] = []
      const count = intensity === 'high' ? 40 : 20

      for (let i = 0; i < count; i++) {
        cubes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 2 + 0.5,
          size: Math.random() * 20 + 10
        })
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        cubes.forEach(cube => {
          if (!reducedMotion) {
            // Move cubes slightly
            cube.y -= cube.z * 0.2
            if (cube.y < -50) cube.y = canvas.height + 50

            // Mouse avoid
            const dx = mouseRef.current.x - cube.x
            const dy = mouseRef.current.y - cube.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 200) {
              cube.x -= (dx / dist) * 2
              cube.y -= (dy / dist) * 2
            }
          }

          ctx.strokeStyle = `rgba(${linkRgb}, ${0.2 * cube.z})`
          ctx.strokeRect(cube.x, cube.y, cube.size, cube.size)

          // Fill if close to mouse
          const dx = mouseRef.current.x - cube.x
          const dy = mouseRef.current.y - cube.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.fillStyle = `rgba(${linkRgb}, ${0.1 * (1 - dist / 150)})`
            ctx.fillRect(cube.x, cube.y, cube.size, cube.size)
          }
        })
        if (!reducedMotion) animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    function renderParticleExplode(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      reducedMotion: boolean,
      intensity: string,
      linkRgb: string
    ) {
      const particles: { x: number, y: number, vx: number, vy: number, life: number, maxLife: number }[] = []

      // Continuously add particles
      function addParticles() {
        if (Math.random() > 0.1) return
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: Math.random() * 100 + 50
        })
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        addParticles()

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          if (!reducedMotion) {
            p.x += p.vx
            p.y += p.vy
            p.life++

            // Mouse attract
            const dx = mouseRef.current.x - p.x
            const dy = mouseRef.current.y - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 300) {
              p.vx += (dx / dist) * 0.1
              p.vy += (dy / dist) * 0.1
            }
          }

          const alpha = 1 - (p.life / p.maxLife)
          if (alpha <= 0) {
            particles.splice(i, 1)
            continue
          }

          ctx.fillStyle = `rgba(${linkRgb}, ${alpha * 0.5})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
        if (!reducedMotion) animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    function renderOrbFlow(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, reducedMotion: boolean, intensity: string, linkRgb: string) {
      const orbs: Array<{x: number; y: number; r: number; vx: number; vy: number}> = []
      for (let i = 0; i < 8; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 80 + 30,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        })
      }
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        orbs.forEach((orb: {x: number; y: number; r: number; vx: number; vy: number}) => {
          if (!reducedMotion) {
            orb.x += orb.vx; orb.y += orb.vy
            if (orb.x < -100 || orb.x > canvas.width + 100) orb.vx *= -1
            if (orb.y < -100 || orb.y > canvas.height + 100) orb.vy *= -1
            // Repel
            const dx = mouseRef.current.x - orb.x
            const dy = mouseRef.current.y - orb.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 300) { orb.x -= (dx / dist); orb.y -= (dy / dist) }
          }
          const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
          g.addColorStop(0, `rgba(${linkRgb}, 0.1)`); g.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2); ctx.fill()
        })
        if (!reducedMotion) animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    function renderGridWarp(
      ctx: CanvasRenderingContext2D, 
      canvas: HTMLCanvasElement, 
      reducedMotion: boolean, 
      intensity: string, 
      linkRgb: string
    ) {
      // Simple grid
      let time = 0
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (!reducedMotion) time += 0.01
        ctx.strokeStyle = `rgba(${linkRgb}, 0.1)`
        for (let x = 0; x < canvas.width; x += 50) {
          ctx.beginPath(); ctx.moveTo(x, 0);
          // simple wavy line
          for (let y = 0; y < canvas.height; y += 10) {
            const dx = x - mouseRef.current.x
            const dy = y - mouseRef.current.y
            const d = Math.sqrt(dx * dx + dy * dy)
            const warp = Math.max(0, (200 - d) / 200) * 20
            ctx.lineTo(x + Math.sin(y * 0.05 + time) * 5 + (dx / d) * warp, y)
          }
          ctx.stroke()
        }
        if (!reducedMotion) animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    function renderMatrixRain(
      ctx: CanvasRenderingContext2D, 
      canvas: HTMLCanvasElement, 
      reducedMotion: boolean, 
      intensity: string, 
      linkRgb: string
    ) {
      const fs = 14; const cols = Math.ceil(canvas.width / fs); const drops = new Array(cols).fill(1)
      function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.05)'; ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = `rgba(${linkRgb}, 0.8)`; ctx.font = fs + 'px monospace'
        for (let i = 0; i < drops.length; i++) {
          const t = String.fromCharCode(0x30A0 + Math.random() * 96)
          ctx.fillText(t, i * fs, drops[i] * fs)
          if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0
          const mx = Math.floor(mouseRef.current.x / fs)
          if (Math.abs(mx - i) < 2) drops[i] += 2
          if (!reducedMotion) drops[i]++
        }
        if (!reducedMotion) animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [variant, intensity])

  const style: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: 0.5,
    zIndex: 0
  }

  return <canvas ref={canvasRef} style={style} aria-hidden="true" />
}
