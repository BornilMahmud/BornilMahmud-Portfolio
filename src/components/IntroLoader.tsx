import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;
const easeInQuad = (t: number) => t * t;

const MAX_CLOUDS = 120;
const MAX_SPARKS = 200;

const IntroLoader = ({ onComplete }: IntroLoaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const doneRef = useRef(false);
  const [visible, setVisible] = useState(true);

  const stableOnComplete = useCallback(onComplete, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      stableOnComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const cloudX = new Float32Array(MAX_CLOUDS);
    const cloudY = new Float32Array(MAX_CLOUDS);
    const cloudVX = new Float32Array(MAX_CLOUDS);
    const cloudVY = new Float32Array(MAX_CLOUDS);
    const cloudR = new Float32Array(MAX_CLOUDS);
    const cloudLife = new Float32Array(MAX_CLOUDS);
    const cloudDecay = new Float32Array(MAX_CLOUDS);
    const cloudCR = new Uint8Array(MAX_CLOUDS);
    const cloudCG = new Uint8Array(MAX_CLOUDS);
    const cloudCB = new Uint8Array(MAX_CLOUDS);
    let cloudCount = 0;

    const sparkX = new Float32Array(MAX_SPARKS);
    const sparkY = new Float32Array(MAX_SPARKS);
    const sparkVX = new Float32Array(MAX_SPARKS);
    const sparkVY = new Float32Array(MAX_SPARKS);
    const sparkSize = new Float32Array(MAX_SPARKS);
    const sparkLife = new Float32Array(MAX_SPARKS);
    const sparkCR = new Uint8Array(MAX_SPARKS);
    const sparkCG = new Uint8Array(MAX_SPARKS);
    const sparkCB = new Uint8Array(MAX_SPARKS);
    let sparkCount = 0;

    const createCloudTexture = (r: number, g: number, b: number, size: number) => {
      const off = document.createElement("canvas");
      const s = Math.ceil(size * 2 * dpr);
      off.width = s;
      off.height = s;
      const oc = off.getContext("2d")!;
      const cx = s / 2;
      const grad = oc.createRadialGradient(cx, cx, 0, cx, cx, cx);
      grad.addColorStop(0, `rgba(${Math.min(255, r + 40)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 20)}, 0.22)`);
      grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.12)`);
      grad.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, 0.03)`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      oc.fillStyle = grad;
      oc.beginPath();
      oc.arc(cx, cx, cx, 0, Math.PI * 2);
      oc.fill();
      return off;
    };

    const redTex = createCloudTexture(230, 50, 15, 40);
    const blueTex = createCloudTexture(30, 100, 220, 40);
    const purpleTex = createCloudTexture(170, 90, 190, 35);

    const addCloud = (
      x: number, y: number, vx: number, vy: number,
      radius: number, r: number, g: number, b: number, decay: number
    ) => {
      if (cloudCount >= MAX_CLOUDS) return;
      const i = cloudCount++;
      cloudX[i] = x; cloudY[i] = y;
      cloudVX[i] = vx; cloudVY[i] = vy;
      cloudR[i] = radius; cloudLife[i] = 1;
      cloudDecay[i] = decay;
      cloudCR[i] = r; cloudCG[i] = g; cloudCB[i] = b;
    };

    const addSpark = (x: number, y: number, r: number, g: number, b: number, speed: number) => {
      if (sparkCount >= MAX_SPARKS) return;
      const angle = Math.random() * 6.2832;
      const spd = speed * (0.5 + Math.random());
      const i = sparkCount++;
      sparkX[i] = x; sparkY[i] = y;
      sparkVX[i] = Math.cos(angle) * spd;
      sparkVY[i] = Math.sin(angle) * spd;
      sparkSize[i] = 0.8 + Math.random() * 2;
      sparkLife[i] = 0.4 + Math.random() * 0.6;
      sparkCR[i] = r; sparkCG[i] = g; sparkCB[i] = b;
    };

    const drawYinYang = (x: number, y: number, r: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2);
      ctx.arc(0, r / 2, r / 2, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(0, -r / 2, r / 2, Math.PI / 2, -Math.PI / 2);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2);
      ctx.arc(0, -r / 2, r / 2, -Math.PI / 2, Math.PI / 2, true);
      ctx.arc(0, r / 2, r / 2, -Math.PI / 2, Math.PI / 2);
      ctx.closePath();
      ctx.fillStyle = "#d4af37";
      ctx.fill();

      const dotR = r * 0.12;
      ctx.fillStyle = "#d4af37";
      ctx.beginPath();
      ctx.arc(0, -r / 2, dotR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, r / 2, dotR, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const yyRadius = Math.min(W, H) * 0.22;
    const TRAVEL = 3.8;
    const COLLISION = 1.4;
    const FORMATION = 2.0;
    const FLASH = 1.5;
    const T1 = TRAVEL;
    const T2 = T1 + COLLISION;
    const T3 = T2 + FORMATION;
    const T4 = T3 + FLASH;

    const startTime = performance.now();
    let shockwaveTriggered = false;
    let prevTime = startTime;

    const redPath = (t: number) => {
      const mx = W / 2, my = H / 2;
      if (t < 0.35) {
        const p = t / 0.35;
        return { x: -60 + easeInQuad(p) * (W * 0.35), y: my + Math.sin(p * 6.2832) * 40 };
      } else if (t < 0.65) {
        const p = (t - 0.35) / 0.3;
        return { x: W * 0.35 - 60 + p * (W * 0.35), y: my + Math.sin(p * 9.4248 + 2) * 55 + Math.cos(p * 3.1416) * 30 };
      } else {
        const p = easeInOutCubic((t - 0.65) / 0.35);
        const startX = W * 0.7 - 60;
        return { x: startX + p * (mx - startX + 60), y: my + Math.sin(p * 3.1416) * 25 * (1 - p) };
      }
    };

    const bluePath = (t: number) => {
      const mx = W / 2, my = H / 2;
      if (t < 0.35) {
        const p = t / 0.35;
        return { x: W + 60 - easeInQuad(p) * (W * 0.35), y: my - Math.sin(p * 6.2832) * 40 };
      } else if (t < 0.65) {
        const p = (t - 0.35) / 0.3;
        return { x: W + 60 - W * 0.35 - p * (W * 0.35), y: my - Math.sin(p * 9.4248 + 2) * 55 - Math.cos(p * 3.1416) * 30 };
      } else {
        const p = easeInOutCubic((t - 0.65) / 0.35);
        const startX = W + 60 - W * 0.7;
        return { x: startX - p * (startX - mx + 60), y: my - Math.sin(p * 3.1416) * 25 * (1 - p) };
      }
    };

    const animate = (now: number) => {
      if (doneRef.current) return;

      const dt = Math.min((now - prevTime) / 16.667, 3);
      prevTime = now;

      const elapsed = (now - startTime) / 1000;
      const mx = W / 2;
      const my = H / 2;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = elapsed < T1 ? "rgba(4,4,12,0.08)" : "rgba(4,4,12,0.15)";
      ctx.fillRect(0, 0, W, H);

      if (elapsed < T1) {
        const t = elapsed / T1;
        const rPos = redPath(t);
        const bPos = bluePath(t);

        for (let i = 0; i < 2; i++) {
          const sz = 15 + Math.random() * 25;
          addCloud(
            rPos.x + (Math.random() - 0.5) * 35, rPos.y + (Math.random() - 0.5) * 40,
            -1.2 - Math.random() * 1.8, (Math.random() - 0.5) * 1.2,
            sz, 220, 45, 15, 0.007 + Math.random() * 0.005
          );
          addCloud(
            bPos.x + (Math.random() - 0.5) * 35, bPos.y + (Math.random() - 0.5) * 40,
            1.2 + Math.random() * 1.8, (Math.random() - 0.5) * 1.2,
            sz, 25, 90, 210, 0.007 + Math.random() * 0.005
          );
        }

        if (Math.random() < 0.2) {
          addSpark(rPos.x, rPos.y, 255, 130, 40, 1.5 + Math.random() * 2);
          addSpark(bPos.x, bPos.y, 90, 170, 255, 1.5 + Math.random() * 2);
        }

        ctx.globalCompositeOperation = "lighter";
        const headSize = 35 + t * 18;
        const intensity = 0.22 + t * 0.18;

        const rg = ctx.createRadialGradient(rPos.x, rPos.y, 0, rPos.x, rPos.y, headSize);
        rg.addColorStop(0, `rgba(255,200,160,${intensity * 0.45})`);
        rg.addColorStop(0.3, `rgba(230,80,20,${intensity * 0.25})`);
        rg.addColorStop(0.7, `rgba(180,30,5,${intensity * 0.06})`);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg;
        ctx.fillRect(rPos.x - headSize, rPos.y - headSize, headSize * 2, headSize * 2);

        const bg = ctx.createRadialGradient(bPos.x, bPos.y, 0, bPos.x, bPos.y, headSize);
        bg.addColorStop(0, `rgba(180,210,255,${intensity * 0.45})`);
        bg.addColorStop(0.3, `rgba(50,120,240,${intensity * 0.25})`);
        bg.addColorStop(0.7, `rgba(15,50,180,${intensity * 0.06})`);
        bg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = bg;
        ctx.fillRect(bPos.x - headSize, bPos.y - headSize, headSize * 2, headSize * 2);

        ctx.globalCompositeOperation = "source-over";

      } else if (elapsed < T2) {
        const t = (elapsed - T1) / COLLISION;

        if (!shockwaveTriggered) {
          shockwaveTriggered = true;
          for (let i = 0; i < 40; i++) addSpark(mx, my, 255, 200, 120, 4 + Math.random() * 6);
          for (let i = 0; i < 20; i++) {
            addSpark(mx, my, 240, 60, 25, 3 + Math.random() * 4);
            addSpark(mx, my, 50, 130, 255, 3 + Math.random() * 4);
          }
          for (let i = 0; i < 10; i++) {
            const ang = Math.random() * 6.2832;
            const dist = Math.random() * 25;
            addCloud(
              mx + Math.cos(ang) * dist, my + Math.sin(ang) * dist,
              Math.cos(ang) * (2 + Math.random() * 2.5), Math.sin(ang) * (2 + Math.random() * 2.5),
              18 + Math.random() * 28, 170, 120, 200, 0.009
            );
          }
        }

        ctx.globalCompositeOperation = "lighter";
        const flashA = t < 0.08 ? t / 0.08 : Math.max(0, 1 - (t - 0.08) / 0.3);
        if (flashA > 0.01) {
          const fg = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
          fg.addColorStop(0, `rgba(255,255,255,${flashA * 0.5})`);
          fg.addColorStop(0.25, `rgba(255,210,130,${flashA * 0.25})`);
          fg.addColorStop(0.6, `rgba(180,100,240,${flashA * 0.08})`);
          fg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = fg;
          ctx.fillRect(mx - 250, my - 250, 500, 500);
        }
        ctx.globalCompositeOperation = "source-over";

        const shockR = easeOutQuart(t) * Math.max(W, H) * 0.5;
        const shockA = Math.max(0, 0.5 * (1 - t));
        if (shockA > 0.01) {
          ctx.strokeStyle = `rgba(255,210,130,${shockA})`;
          ctx.lineWidth = 2.5 * (1 - t);
          ctx.beginPath();
          ctx.arc(mx, my, shockR, 0, 6.2832);
          ctx.stroke();
        }

        ctx.globalCompositeOperation = "lighter";
        const shrink = Math.max(0.05, 1 - t * 0.85);
        const orbitR = 100 * shrink;
        for (let i = 0; i < 40; i++) {
          const baseAngle = (i / 40) * 6.2832;
          const spinAngle = baseAngle + elapsed * 5;
          const wobble = Math.sin(i * 0.3 + elapsed * 3.5) * 5 * shrink;
          const px = mx + Math.cos(spinAngle) * (orbitR + wobble);
          const py = my + Math.sin(spinAngle) * (orbitR + wobble);
          const pSize = (0.8 + (i & 1) * 0.8) * shrink;
          const alpha = (0.14 + (1 - t) * 0.1) * shrink;
          ctx.fillStyle = i < 20
            ? `rgba(255,255,255,${alpha})`
            : `rgba(212,175,55,${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, pSize, 0, 6.2832);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";

        const glowR = 45 * (1 - t * 0.3);
        const centerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, glowR);
        centerGlow.addColorStop(0, `rgba(255,230,150,${0.12 * (1 - t * 0.5)})`);
        centerGlow.addColorStop(0.7, `rgba(212,175,55,${0.04 * (1 - t * 0.5)})`);
        centerGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = centerGlow;
        ctx.fillRect(mx - glowR, my - glowR, glowR * 2, glowR * 2);

      } else if (elapsed < T3) {
        const t = (elapsed - T2) / FORMATION;
        const appear = Math.min(1, t * 1.5);
        const smoothAppear = easeOutQuart(appear);
        const rot = t * Math.PI * 5;

        const clearAlpha = Math.min(1, t * 3);
        ctx.fillStyle = `rgba(4,4,12,${0.15 + clearAlpha * 0.25})`;
        ctx.fillRect(0, 0, W, H);

        const scale = 0.15 + smoothAppear * 0.85;
        const currentR = yyRadius * scale;

        ctx.globalCompositeOperation = "lighter";
        const glowSize = currentR * 2.2;
        const outerGlow = ctx.createRadialGradient(mx, my, currentR * 0.4, mx, my, glowSize);
        outerGlow.addColorStop(0, `rgba(255,255,255,${0.08 * smoothAppear})`);
        outerGlow.addColorStop(0.35, `rgba(212,175,55,${0.06 * smoothAppear})`);
        outerGlow.addColorStop(0.7, `rgba(180,150,40,${0.02 * smoothAppear})`);
        outerGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = outerGlow;
        ctx.fillRect(mx - glowSize, my - glowSize, glowSize * 2, glowSize * 2);
        ctx.globalCompositeOperation = "source-over";

        const fadeOrbs = Math.max(0, 1 - appear * 2);
        if (fadeOrbs > 0.02) {
          for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * 6.2832 + rot * 1.5;
            const dist = yyRadius * (1.2 + fadeOrbs * 2.2);
            const px = mx + Math.cos(angle) * dist;
            const py = my + Math.sin(angle) * dist;
            ctx.fillStyle = i < 15
              ? `rgba(255,255,255,${fadeOrbs * 0.25})`
              : `rgba(212,175,55,${fadeOrbs * 0.25})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.2 * fadeOrbs, 0, 6.2832);
            ctx.fill();
          }
        }

        drawYinYang(mx, my, currentR, rot, smoothAppear);

        if (smoothAppear > 0.3) {
          const gi = (smoothAppear - 0.3) * 1.43;
          const ringGlow = ctx.createRadialGradient(mx, my, currentR - 2, mx, my, currentR + 12);
          ringGlow.addColorStop(0, "rgba(0,0,0,0)");
          ringGlow.addColorStop(0.3, `rgba(212,190,80,${gi * 0.2})`);
          ringGlow.addColorStop(0.6, `rgba(255,240,180,${gi * 0.12})`);
          ringGlow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = ringGlow;
          ctx.fillRect(mx - currentR - 14, my - currentR - 14, (currentR + 14) * 2, (currentR + 14) * 2);
          ctx.globalCompositeOperation = "source-over";
        }

      } else if (elapsed < T4) {
        const t = (elapsed - T3) / FLASH;

        ctx.fillStyle = "rgba(4,4,12,0.3)";
        ctx.fillRect(0, 0, W, H);

        const holdAlpha = t < 0.25 ? 1 : Math.max(0, 1 - (t - 0.25) / 0.2);
        if (holdAlpha > 0.01) {
          const rot = Math.PI * 5 + t * Math.PI * 0.3;
          drawYinYang(mx, my, yyRadius, rot, holdAlpha);

          const ringGlow = ctx.createRadialGradient(mx, my, yyRadius - 2, mx, my, yyRadius + 14);
          ringGlow.addColorStop(0, "rgba(0,0,0,0)");
          ringGlow.addColorStop(0.3, `rgba(212,190,80,${holdAlpha * 0.25})`);
          ringGlow.addColorStop(0.6, `rgba(255,240,180,${holdAlpha * 0.15})`);
          ringGlow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = ringGlow;
          ctx.fillRect(mx - yyRadius - 16, my - yyRadius - 16, (yyRadius + 16) * 2, (yyRadius + 16) * 2);
          ctx.globalCompositeOperation = "source-over";
        }

        if (t > 0.12) {
          const ft = (t - 0.12) / 0.88;
          const flashR = Math.max(W, H) * easeOutQuart(ft) * 1.6;
          const fa = Math.min(1, ft * 2);
          const fg = ctx.createRadialGradient(mx, my, 0, mx, my, Math.max(flashR, 1));
          fg.addColorStop(0, `rgba(255,245,160,${fa})`);
          fg.addColorStop(0.15, `rgba(255,220,80,${fa * 0.95})`);
          fg.addColorStop(0.4, `rgba(255,190,50,${fa * 0.85})`);
          fg.addColorStop(0.7, `rgba(255,160,30,${fa * 0.6})`);
          fg.addColorStop(1, `rgba(255,140,15,${fa * 0.3})`);
          ctx.fillStyle = fg;
          ctx.fillRect(0, 0, W, H);
        }

        if (t > 0.5) {
          const wt = (t - 0.5) / 0.5;
          ctx.fillStyle = `rgba(255,252,240,${easeOutQuart(wt)})`;
          ctx.fillRect(0, 0, W, H);
        }
      } else {
        doneRef.current = true;
        setVisible(false);
        stableOnComplete();
        return;
      }

      ctx.globalCompositeOperation = "lighter";
      let writeIdx = 0;
      for (let i = 0; i < cloudCount; i++) {
        cloudLife[i] -= cloudDecay[i] * dt;
        if (cloudLife[i] <= 0) continue;

        cloudX[i] += cloudVX[i] * dt;
        cloudY[i] += cloudVY[i] * dt;
        cloudVX[i] *= 0.992;
        cloudVY[i] *= 0.992;
        cloudR[i] *= 1 + 0.003 * dt;

        const a = cloudLife[i] * cloudLife[i];
        const r = cloudCR[i];
        const tex = r > 150 ? redTex : r < 80 ? blueTex : purpleTex;
        const size = cloudR[i] * 2;

        ctx.globalAlpha = a * 0.85;
        ctx.drawImage(tex, cloudX[i] - size / 2, cloudY[i] - size / 2, size, size);

        if (writeIdx !== i) {
          cloudX[writeIdx] = cloudX[i]; cloudY[writeIdx] = cloudY[i];
          cloudVX[writeIdx] = cloudVX[i]; cloudVY[writeIdx] = cloudVY[i];
          cloudR[writeIdx] = cloudR[i]; cloudLife[writeIdx] = cloudLife[i];
          cloudDecay[writeIdx] = cloudDecay[i];
          cloudCR[writeIdx] = cloudCR[i]; cloudCG[writeIdx] = cloudCG[i]; cloudCB[writeIdx] = cloudCB[i];
        }
        writeIdx++;
      }
      cloudCount = writeIdx;
      ctx.globalAlpha = 1;

      writeIdx = 0;
      for (let i = 0; i < sparkCount; i++) {
        sparkLife[i] -= 0.014 * dt;
        if (sparkLife[i] <= 0) continue;

        sparkX[i] += sparkVX[i] * dt;
        sparkY[i] += sparkVY[i] * dt;
        sparkVY[i] += 0.035 * dt;
        sparkVX[i] *= 0.994;
        sparkVY[i] *= 0.994;

        const a = sparkLife[i] * sparkLife[i];
        ctx.fillStyle = `rgba(${sparkCR[i]},${sparkCG[i]},${sparkCB[i]},${a})`;
        ctx.beginPath();
        ctx.arc(sparkX[i], sparkY[i], sparkSize[i] * sparkLife[i], 0, 6.2832);
        ctx.fill();

        if (writeIdx !== i) {
          sparkX[writeIdx] = sparkX[i]; sparkY[writeIdx] = sparkY[i];
          sparkVX[writeIdx] = sparkVX[i]; sparkVY[writeIdx] = sparkVY[i];
          sparkSize[writeIdx] = sparkSize[i]; sparkLife[writeIdx] = sparkLife[i];
          sparkCR[writeIdx] = sparkCR[i]; sparkCG[writeIdx] = sparkCG[i]; sparkCB[writeIdx] = sparkCB[i];
        }
        writeIdx++;
      }
      sparkCount = writeIdx;
      ctx.globalCompositeOperation = "source-over";

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [stableOnComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: "#04040c" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
