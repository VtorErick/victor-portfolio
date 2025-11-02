'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

interface AnimatedBackgroundProps {
  variant?: 'dots' | 'waves' | 'gradient';
  intensity?: 'subtle' | 'medium' | 'high';
}

export default function AnimatedBackground({ 
  variant = 'dots', 
  intensity = 'subtle' 
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get the computed RGB values from CSS variables
    const linkRgb = getComputedStyle(document.documentElement)
      .getPropertyValue('--link-rgb')
      .trim() || '59, 130, 246'

    // Respect reduced motion preferences
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animationId: number

    function handleResize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    if (variant === 'dots') {
      renderDots(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else if (variant === 'waves') {
      renderWaves(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    } else if (variant === 'gradient') {
      renderGradient(ctx, canvas, prefersReducedMotion, intensity, linkRgb)
    }

    function renderDots(
      ctx: CanvasRenderingContext2D, 
      canvas: HTMLCanvasElement,
      reducedMotion: boolean,
      intensity: string,
      linkRgb: string
    ) {
      const dots: Array<{x: number, y: number, size: number, dy: number, opacity: number}> = []
      const dotCount = intensity === 'high' ? 50 : intensity === 'medium' ? 30 : 20
      
      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          dy: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.3 + 0.1
        })
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        dots.forEach(dot => {
          if (!reducedMotion) {
            dot.y += dot.dy
            if (dot.y > canvas.height) dot.y = 0
            if (dot.y < 0) dot.y = canvas.height
          }
          
          ctx.beginPath()
          ctx.fillStyle = `rgba(${linkRgb}, ${dot.opacity})`
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
          ctx.fill()
        })

        if (!reducedMotion) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animate()
    }

    function renderWaves(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      reducedMotion: boolean,
      intensity: string,
      linkRgb: string
    ) {
      let time = 0
      const waveCount = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1
      const speed = intensity === 'high' ? 0.02 : intensity === 'medium' ? 0.015 : 0.01

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        if (!reducedMotion) {
          time += speed
        }

        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${linkRgb}, ${0.1 - w * 0.03})`
          ctx.lineWidth = 2
          
          for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + 
                     Math.sin((x / canvas.width) * Math.PI * 2 + time + w) * 30 +
                     Math.sin((x / canvas.width) * Math.PI * 4 + time * 1.5 + w) * 15
            
            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          
          ctx.stroke()
        }

        if (!reducedMotion) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animate()
    }

    function renderGradient(
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      reducedMotion: boolean,
      intensity: string,
      linkRgb: string
    ) {
      let time = 0
      const speed = intensity === 'high' ? 0.005 : intensity === 'medium' ? 0.003 : 0.002

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        if (!reducedMotion) {
          time += speed
        }

        const x = canvas.width / 2 + Math.cos(time) * canvas.width * 0.3
        const y = canvas.height / 2 + Math.sin(time) * canvas.height * 0.3

        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, canvas.width * 0.6
        )
        
        const opacity = intensity === 'high' ? 0.15 : intensity === 'medium' ? 0.1 : 0.06
        gradient.addColorStop(0, `rgba(${linkRgb}, ${opacity})`)
        gradient.addColorStop(1, `rgba(${linkRgb}, 0)`)
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (!reducedMotion) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animate()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [variant, intensity])

  const style: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: 0.6
  }

  return <canvas ref={canvasRef} style={style} aria-hidden="true" />
}
