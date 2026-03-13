import { useRef, useState, useCallback, useEffect } from 'react'

const BRUSH_RADIUS = 30
const REVEAL_THRESHOLD = 0.5 // 50% scratched

interface ScratchState {
  isRevealed: boolean
  canvasRef: React.RefObject<HTMLCanvasElement>
  initCanvas: (canvas: HTMLCanvasElement) => void
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseUp: () => void
  onTouchStart: (e: React.TouchEvent<HTMLCanvasElement>) => void
  onTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void
  onTouchEnd: () => void
}

function getPos(canvas: HTMLCanvasElement, clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  }
}

function scratch(canvas: HTMLCanvasElement, x: number, y: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2)
  ctx.fill()
}

function getRevealedRatio(canvas: HTMLCanvasElement): number {
  const ctx = canvas.getContext('2d')
  if (!ctx) return 0
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  let transparent = 0
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] === 0) transparent++
  }
  return transparent / (canvas.width * canvas.height)
}

function revealAll(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export function useScratch(onReveal: () => void): ScratchState {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const isDrawing = useRef(false)
  const revealed = useRef(false)

  const drawGoldOverlay = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.globalCompositeOperation = 'source-over'

    // TODO: Replace gradient with actual gold texture:
    //   const img = new Image(); img.src = scratchTexture
    //   img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const grad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    )
    grad.addColorStop(0, 'hsl(42, 90%, 65%)')
    grad.addColorStop(0.5, 'hsl(42, 80%, 50%)')
    grad.addColorStop(1, 'hsl(42, 70%, 40%)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const initCanvas = useCallback((canvas: HTMLCanvasElement) => {
    drawGoldOverlay(canvas)
  }, [drawGoldOverlay])

  useEffect(() => {
    if (canvasRef.current) initCanvas(canvasRef.current)
  }, [initCanvas])

  function checkReveal(canvas: HTMLCanvasElement) {
    if (revealed.current) return
    const ratio = getRevealedRatio(canvas)
    if (ratio >= REVEAL_THRESHOLD) {
      revealed.current = true
      revealAll(canvas)
      setIsRevealed(true)
      onReveal()
    }
  }

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (revealed.current || !canvasRef.current) return
    isDrawing.current = true
    const { x, y } = getPos(canvasRef.current, e.clientX, e.clientY)
    scratch(canvasRef.current, x, y)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return
    const { x, y } = getPos(canvasRef.current, e.clientX, e.clientY)
    scratch(canvasRef.current, x, y)
  }, [])

  const onMouseUp = useCallback(() => {
    if (!isDrawing.current || !canvasRef.current) return
    isDrawing.current = false
    checkReveal(canvasRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (revealed.current || !canvasRef.current) return
    e.preventDefault()
    isDrawing.current = true
    const touch = e.touches[0]
    const { x, y } = getPos(canvasRef.current, touch.clientX, touch.clientY)
    scratch(canvasRef.current, x, y)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return
    e.preventDefault()
    const touch = e.touches[0]
    const { x, y } = getPos(canvasRef.current, touch.clientX, touch.clientY)
    scratch(canvasRef.current, x, y)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!isDrawing.current || !canvasRef.current) return
    isDrawing.current = false
    checkReveal(canvasRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isRevealed,
    canvasRef,
    initCanvas,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
