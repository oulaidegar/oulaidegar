"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Gamepad2,
  Sparkles,
  Users,
  User,
} from "lucide-react";

type GameDifficulty = "novice" | "scholar" | "neural";
type GameMode = "vs-ai" | "solitaire" | "two-player";

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game state
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<GameDifficulty>("scholar");
  const [gameMode, setGameMode] = useState<GameMode>("vs-ai");
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [currentRally, setCurrentRally] = useState(0);
  const [bestRally, setBestRally] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);

  // Audio Context ref for Web Audio API sound synthesis
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play synthesized tone
  const playBeep = useCallback((freq: number, duration: number, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext not allowed before user interaction
    }
  }, [soundEnabled]);

  // Load best rally from local storage
  useEffect(() => {
    const saved = localStorage.getItem("oulaidegar_pong_best_rally");
    if (saved) setBestRally(parseInt(saved, 10) || 0);
  }, []);

  // Mutable game loop reference
  const stateRef = useRef({
    // Canvas virtual coordinates (standardized at 800x480)
    width: 800,
    height: 480,

    // Paddles
    paddleWidth: 12,
    paddleHeight: 76,
    player1Y: 202,
    player2Y: 202,
    player1Speed: 0,
    player2Speed: 0,

    // Ball
    ballX: 400,
    ballY: 240,
    ballRadius: 7,
    ballSpeedX: 5.5,
    ballSpeedY: 2.5,
    baseSpeed: 5.5,

    // Particles on hit
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],

    // Keys pressed
    upPressed: false,
    downPressed: false,
    wPressed: false,
    sPressed: false,

    rally: 0,
    p1Score: 0,
    p2Score: 0,
  });

  // Reset ball to center
  const resetBall = useCallback((serveToPlayer: boolean) => {
    const s = stateRef.current;
    s.ballX = s.width / 2;
    s.ballY = s.height / 2;
    const angle = (Math.random() * Math.PI) / 4 - Math.PI / 8; // -22.5 to +22.5 deg
    const speed = s.baseSpeed;
    s.ballSpeedX = (serveToPlayer ? -1 : 1) * speed * Math.cos(angle);
    s.ballSpeedY = speed * Math.sin(angle);
    s.rally = 0;
    setCurrentRally(0);
  }, []);

  // Start fresh game
  const handleRestart = useCallback(() => {
    const s = stateRef.current;
    s.p1Score = 0;
    s.p2Score = 0;
    s.player1Y = (s.height - s.paddleHeight) / 2;
    s.player2Y = (s.height - s.paddleHeight) / 2;
    setPlayerScore(0);
    setAiScore(0);
    setWinnerMessage(null);
    resetBall(true);
    setIsPlaying(true);
  }, [resetBall]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        s.upPressed = true;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        s.downPressed = true;
      }
      if (e.key.toLowerCase() === "w") {
        s.wPressed = true;
      }
      if (e.key.toLowerCase() === "s") {
        s.sPressed = true;
      }
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.key === "ArrowUp") s.upPressed = false;
      if (e.key === "ArrowDown") s.downPressed = false;
      if (e.key.toLowerCase() === "w") s.wPressed = false;
      if (e.key.toLowerCase() === "s") s.sPressed = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Mouse & Touch tracking for responsive paddle control
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const scaleY = stateRef.current.height / rect.height;
    const targetY = relativeY * scaleY - stateRef.current.paddleHeight / 2;
    stateRef.current.player1Y = Math.max(
      10,
      Math.min(stateRef.current.height - stateRef.current.paddleHeight - 10, targetY)
    );
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const relativeY = e.touches[0].clientY - rect.top;
    const scaleY = stateRef.current.height / rect.height;
    const targetY = relativeY * scaleY - stateRef.current.paddleHeight / 2;
    stateRef.current.player1Y = Math.max(
      10,
      Math.min(stateRef.current.height - stateRef.current.paddleHeight - 10, targetY)
    );
  };

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const spawnParticles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 8; i++) {
        stateRef.current.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1.0,
          color,
        });
      }
    };

    const updatePhysics = () => {
      if (!isPlaying) return;
      const s = stateRef.current;

      // Player 1 Keyboard movement
      const moveSpeed = 8;
      if (s.wPressed || s.upPressed) {
        s.player1Y = Math.max(10, s.player1Y - moveSpeed);
      }
      if (s.sPressed || s.downPressed) {
        s.player1Y = Math.min(s.height - s.paddleHeight - 10, s.player1Y + moveSpeed);
      }

      // Player 2 / AI Movement
      if (gameMode === "two-player") {
        if (s.upPressed) s.player2Y = Math.max(10, s.player2Y - moveSpeed);
        if (s.downPressed) s.player2Y = Math.min(s.height - s.paddleHeight - 10, s.player2Y + moveSpeed);
      } else if (gameMode === "vs-ai") {
        // AI Tracking with difficulty curve
        const aiPaddleCenter = s.player2Y + s.paddleHeight / 2;
        let aiSpeed = 5.2;
        let reactionThreshold = 22;

        if (difficulty === "novice") {
          aiSpeed = 3.6;
          reactionThreshold = 36;
        } else if (difficulty === "neural") {
          aiSpeed = 7.5;
          reactionThreshold = 8;
        }

        // Only track when ball is moving toward AI or past mid court
        if (s.ballSpeedX > 0) {
          if (aiPaddleCenter < s.ballY - reactionThreshold) {
            s.player2Y = Math.min(s.height - s.paddleHeight - 10, s.player2Y + aiSpeed);
          } else if (aiPaddleCenter > s.ballY + reactionThreshold) {
            s.player2Y = Math.max(10, s.player2Y - aiSpeed);
          }
        }
      }

      // Ball physics
      s.ballX += s.ballSpeedX;
      s.ballY += s.ballSpeedY;

      // Top & Bottom Wall Collisions
      if (s.ballY - s.ballRadius <= 8) {
        s.ballY = 8 + s.ballRadius;
        s.ballSpeedY = -s.ballSpeedY;
        playBeep(260, 0.05, "sine");
        spawnParticles(s.ballX, s.ballY, "rgba(220, 215, 205, 0.6)");
      } else if (s.ballY + s.ballRadius >= s.height - 8) {
        s.ballY = s.height - 8 - s.ballRadius;
        s.ballSpeedY = -s.ballSpeedY;
        playBeep(260, 0.05, "sine");
        spawnParticles(s.ballX, s.ballY, "rgba(220, 215, 205, 0.6)");
      }

      // Solitaire Right Wall bounce
      if (gameMode === "solitaire" && s.ballX + s.ballRadius >= s.width - 16) {
        s.ballX = s.width - 16 - s.ballRadius;
        s.ballSpeedX = -s.ballSpeedX;
        playBeep(320, 0.08, "triangle");
        spawnParticles(s.ballX, s.ballY, "rgba(180, 170, 160, 0.8)");
      }

      // Player 1 Paddle Collision (Left)
      const p1Left = 32;
      const p1Right = p1Left + s.paddleWidth;
      if (
        s.ballX - s.ballRadius <= p1Right &&
        s.ballX + s.ballRadius >= p1Left &&
        s.ballY >= s.player1Y &&
        s.ballY <= s.player1Y + s.paddleHeight
      ) {
        s.ballX = p1Right + s.ballRadius;
        // Angle based on where ball struck paddle (-1 to 1)
        const hitOffset = (s.ballY - (s.player1Y + s.paddleHeight / 2)) / (s.paddleHeight / 2);
        const maxAngle = (Math.PI / 3) * 0.85; // 51 deg max
        const bounceAngle = hitOffset * maxAngle;
        const currentSpeed = Math.hypot(s.ballSpeedX, s.ballSpeedY) * 1.03; // slight rally acceleration
        const cappedSpeed = Math.min(14, currentSpeed);

        s.ballSpeedX = cappedSpeed * Math.cos(bounceAngle);
        s.ballSpeedY = cappedSpeed * Math.sin(bounceAngle);

        s.rally += 1;
        setCurrentRally(s.rally);
        if (s.rally > bestRally) {
          setBestRally(s.rally);
          localStorage.setItem("oulaidegar_pong_best_rally", String(s.rally));
        }

        playBeep(440 + Math.min(s.rally * 15, 400), 0.09, "sine");
        spawnParticles(p1Right, s.ballY, "rgba(245, 240, 230, 0.9)");
      }

      // Player 2 / AI Paddle Collision (Right)
      if (gameMode !== "solitaire") {
        const p2Right = s.width - 32;
        const p2Left = p2Right - s.paddleWidth;
        if (
          s.ballX + s.ballRadius >= p2Left &&
          s.ballX - s.ballRadius <= p2Right &&
          s.ballY >= s.player2Y &&
          s.ballY <= s.player2Y + s.paddleHeight
        ) {
          s.ballX = p2Left - s.ballRadius;
          const hitOffset = (s.ballY - (s.player2Y + s.paddleHeight / 2)) / (s.paddleHeight / 2);
          const maxAngle = (Math.PI / 3) * 0.85;
          const bounceAngle = hitOffset * maxAngle;
          const currentSpeed = Math.hypot(s.ballSpeedX, s.ballSpeedY) * 1.03;
          const cappedSpeed = Math.min(14, currentSpeed);

          s.ballSpeedX = -cappedSpeed * Math.cos(bounceAngle);
          s.ballSpeedY = cappedSpeed * Math.sin(bounceAngle);

          s.rally += 1;
          setCurrentRally(s.rally);
          if (s.rally > bestRally) {
            setBestRally(s.rally);
            localStorage.setItem("oulaidegar_pong_best_rally", String(s.rally));
          }

          playBeep(480 + Math.min(s.rally * 15, 400), 0.09, "sine");
          spawnParticles(p2Left, s.ballY, "rgba(245, 240, 230, 0.9)");
        }
      }

      // Scoring (Past Paddles)
      // Player 2 / AI scores (ball flew past left paddle)
      if (s.ballX + s.ballRadius < 0) {
        s.p2Score += 1;
        setAiScore(s.p2Score);
        playBeep(180, 0.25, "sawtooth");
        if (s.p2Score >= 7) {
          setWinnerMessage(gameMode === "two-player" ? "Player 2 Wins!" : "System Wins");
          setIsPlaying(false);
        } else {
          resetBall(true);
        }
      }

      // Player 1 scores (ball flew past right paddle)
      if (gameMode !== "solitaire" && s.ballX - s.ballRadius > s.width) {
        s.p1Score += 1;
        setPlayerScore(s.p1Score);
        playBeep(660, 0.18, "sine");
        if (s.p1Score >= 7) {
          setWinnerMessage("You Win!");
          setIsPlaying(false);
        } else {
          resetBall(false);
        }
      }

      // Update particle lifetimes
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) s.particles.splice(i, 1);
      }
    };

    const draw = () => {
      const s = stateRef.current;
      const w = s.width;
      const h = s.height;

      // Clear Court Background with deep monastic charcoal
      ctx.fillStyle = "#141312";
      ctx.fillRect(0, 0, w, h);

      // Court boundary hairline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      // Center court dashed net
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
      ctx.beginPath();
      ctx.moveTo(w / 2, 8);
      ctx.lineTo(w / 2, h - 8);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle Center Court Circle
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 64, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Particles
      s.particles.forEach((p) => {
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${p.life})`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Paddles
      // Player 1 Paddle
      ctx.fillStyle = "#f5f3ef";
      ctx.beginPath();
      ctx.roundRect(32, s.player1Y, s.paddleWidth, s.paddleHeight, 3);
      ctx.fill();

      // Player 2 Paddle (or Solitaire Back Wall)
      if (gameMode !== "solitaire") {
        ctx.fillStyle = "#e2ded6";
        ctx.beginPath();
        ctx.roundRect(w - 32 - s.paddleWidth, s.player2Y, s.paddleWidth, s.paddleHeight, 3);
        ctx.fill();
      } else {
        // Solitaire bouncy brick wall
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.fillRect(w - 18, 8, 10, h - 16);
      }

      // Draw Ball with soft radial glow
      const ballGrad = ctx.createRadialGradient(
        s.ballX,
        s.ballY,
        0,
        s.ballX,
        s.ballY,
        s.ballRadius * 1.5
      );
      ballGrad.addColorStop(0, "#ffffff");
      ballGrad.addColorStop(0.8, "#f2ede4");
      ballGrad.addColorStop(1, "rgba(242, 237, 228, 0)");

      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, s.ballRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, s.ballRadius, 0, Math.PI * 2);
      ctx.fill();

      // Pause / Overlay Message
      if (!isPlaying && !winnerMessage) {
        ctx.fillStyle = "rgba(20, 19, 18, 0.65)";
        ctx.fillRect(0, 0, w, h);

        ctx.font = "italic 22px Newsreader, Georgia, serif";
        ctx.fillStyle = "#f4efe6";
        ctx.textAlign = "center";
        ctx.fillText("Press Space or Click to Serve", w / 2, h / 2 - 10);

        ctx.font = "11px ui-monospace, Menlo, monospace";
        ctx.fillStyle = "#a8a29e";
        ctx.fillText("Mouse / Touch or W & S to guide paddle", w / 2, h / 2 + 20);
      }

      // Winner Overlay
      if (winnerMessage) {
        ctx.fillStyle = "rgba(20, 19, 18, 0.85)";
        ctx.fillRect(0, 0, w, h);

        ctx.font = "italic 32px Newsreader, Georgia, serif";
        ctx.fillStyle = "#f4efe6";
        ctx.textAlign = "center";
        ctx.fillText(winnerMessage, w / 2, h / 2 - 16);

        ctx.font = "12px ui-monospace, Menlo, monospace";
        ctx.fillStyle = "#d6d3d1";
        ctx.fillText("Click 'Restart Match' below to play again", w / 2, h / 2 + 22);
      }
    };

    const loop = () => {
      updatePhysics();
      draw();
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameMode, difficulty, bestRally, playBeep, winnerMessage]);

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* Game Dashboard & Scoreboard                                  */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-sm border border-stone-200/80 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/40 text-xs font-mono-meta">
        {/* Score */}
        <div className="flex items-center gap-6">
          <div className="space-y-0.5">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider">
              {gameMode === "two-player" ? "Player 1" : "You"}
            </span>
            <div className="font-serif-title text-2xl text-stone-900 dark:text-stone-100">
              {playerScore}
            </div>
          </div>

          <span className="text-stone-300 dark:text-stone-700 text-lg font-light">&bull;</span>

          <div className="space-y-0.5">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider">
              {gameMode === "solitaire"
                ? "Wall"
                : gameMode === "two-player"
                ? "Player 2"
                : "System"}
            </span>
            <div className="font-serif-title text-2xl text-stone-900 dark:text-stone-100">
              {gameMode === "solitaire" ? "—" : aiScore}
            </div>
          </div>

          <div className="h-8 border-l border-stone-200 dark:border-stone-800 pl-6 space-y-0.5">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider">Rally</span>
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {currentRally}
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span>Record</span>
            </span>
            <div className="text-sm text-stone-700 dark:text-stone-300 font-semibold">
              {bestRally}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="px-3 py-1.5 rounded-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{playerScore === 0 && aiScore === 0 ? "Serve" : "Resume"}</span>
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            title="Restart Match"
            className="p-1.5 rounded-sm border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSoundEnabled((s) => !s)}
            title={soundEnabled ? "Mute audio" : "Enable audio"}
            className="p-1.5 rounded-sm border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Pong Canvas                                                 */}
      {/* ============================================================ */}
      <div className="relative aspect-[5/3] w-full rounded-sm overflow-hidden border border-stone-800 shadow-2xl bg-[#141312] cursor-none select-none">
        <canvas
          ref={canvasRef}
          width={800}
          height={480}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={() => {
            if (!isPlaying && !winnerMessage) setIsPlaying(true);
            if (winnerMessage) handleRestart();
          }}
          className="w-full h-full block"
        />
      </div>

      {/* ============================================================ */}
      {/* Game Mode & Difficulty Toggles                               */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono-meta text-stone-500 pt-2 border-t border-stone-200/80 dark:border-stone-800/80">
        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-stone-400">Mode:</span>
          <div className="inline-flex rounded-sm p-0.5 border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60">
            <button
              onClick={() => {
                setGameMode("vs-ai");
                handleRestart();
              }}
              className={`px-2 py-1 rounded-xs cursor-pointer transition-colors ${
                gameMode === "vs-ai"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
                  : "hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              Single vs AI
            </button>
            <button
              onClick={() => {
                setGameMode("solitaire");
                handleRestart();
              }}
              className={`px-2 py-1 rounded-xs cursor-pointer transition-colors ${
                gameMode === "solitaire"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
                  : "hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              Zen Wall
            </button>
            <button
              onClick={() => {
                setGameMode("two-player");
                handleRestart();
              }}
              className={`px-2 py-1 rounded-xs cursor-pointer transition-colors ${
                gameMode === "two-player"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
                  : "hover:text-stone-800 dark:hover:text-stone-200"
              }`}
            >
              2-Player
            </button>
          </div>
        </div>

        {/* AI Difficulty Selector (if in AI mode) */}
        {gameMode === "vs-ai" && (
          <div className="flex items-center gap-2">
            <span className="text-stone-400">AI Difficulty:</span>
            <div className="inline-flex rounded-sm p-0.5 border border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60">
              {(["novice", "scholar", "neural"] as GameDifficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-2 py-1 capitalize rounded-xs cursor-pointer transition-colors ${
                    difficulty === d
                      ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium"
                      : "hover:text-stone-800 dark:hover:text-stone-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tactical instructions */}
      <div className="p-3.5 rounded-sm bg-stone-100/60 dark:bg-stone-900/30 border border-stone-200/80 dark:border-stone-800/80 text-[11px] font-mono-meta text-stone-500 dark:text-stone-400 flex flex-col sm:flex-row justify-between gap-2">
        <div>
          <span className="font-medium text-stone-700 dark:text-stone-300">Controls: </span>
          Slide mouse over canvas, touch & drag, or use <kbd className="px-1 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-[10px]">W</kbd>/<kbd className="px-1 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-[10px]">S</kbd> or <kbd className="px-1 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-[10px]">&uarr;</kbd>/<kbd className="px-1 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-[10px]">&darr;</kbd> keys.
        </div>
        <div>
          <span className="font-medium text-stone-700 dark:text-stone-300">Spacebar: </span>
          Pause / Resume &bull; First to 7 points wins.
        </div>
      </div>
    </div>
  );
}
