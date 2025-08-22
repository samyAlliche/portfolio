/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import "./ProfileCard.css";

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
} as const;

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3): number =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = "<Placeholder for avatar URL>",
  iconUrl = "<Placeholder for icon URL>",
  grainUrl = "<Placeholder for grain URL>",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Samy Alliche",
  title = "Full Stack Developer",
  handle = "samyAlliche",
  status = "Ready to work",
  //contactText = "Hire Me",
  showUserInfo = true,
  // onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;

    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(
          Math.hypot(percentY - 50, percentX - 50) / 50,
          0,
          1
        )}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);

        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);

        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };

      rafId = requestAnimationFrame(animationLoop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap || !animationHandlers) return;

    animationHandlers.cancelAnimation();
    wrap.classList.add("active");
    card.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [animationHandlers]
  );

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap || !animationHandlers) return;

      const { beta, gamma } = event;
      if (!beta || !gamma) return;

      animationHandlers.updateCardTransform(
        card.clientHeight / 2 + gamma * mobileTiltSensitivity,
        card.clientWidth / 2 +
          (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        card,
        wrap
      );
    },
    [animationHandlers, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;

    if (!card || !wrap) return;

    const pointerMoveHandler = handlePointerMove as EventListener;
    const pointerEnterHandler = handlePointerEnter as EventListener;
    const pointerLeaveHandler = handlePointerLeave as EventListener;
    const deviceOrientationHandler = handleDeviceOrientation as EventListener;

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== "https:") return;
      if (
        typeof (window.DeviceMotionEvent as any).requestPermission ===
        "function"
      ) {
        (window.DeviceMotionEvent as any)
          .requestPermission()
          .then((state: string) => {
            if (state === "granted") {
              window.addEventListener(
                "deviceorientation",
                deviceOrientationHandler
              );
            }
          })
          .catch((err: any) => console.error(err));
      } else {
        window.addEventListener("deviceorientation", deviceOrientationHandler);
      }
    };

    card.addEventListener("pointerenter", pointerEnterHandler);
    card.addEventListener("pointermove", pointerMoveHandler);
    card.addEventListener("pointerleave", pointerLeaveHandler);
    card.addEventListener("click", handleClick);

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler);
      card.removeEventListener("pointermove", pointerMoveHandler);
      card.removeEventListener("pointerleave", pointerLeaveHandler);
      card.removeEventListener("click", handleClick);
      window.removeEventListener("deviceorientation", deviceOrientationHandler);
      animationHandlers.cancelAnimation();
    };
  }, [
    enableTilt,
    enableMobileTilt,
    animationHandlers,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        "--icon": iconUrl ? `url(${iconUrl})` : "none",
        "--grain": grainUrl ? `url(${grainUrl})` : "none",
        "--behind-gradient": showBehindGradient
          ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
          : "none",
        "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
      }) as React.CSSProperties,
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  // const handleContactClick = useCallback(() => {
  //   onContactClick?.();
  // }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <Image
              className="avatar"
              src={avatarUrl}
              width={339}
              height={472}
              alt={`${name || "User"} avatar`}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <Image
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || "User"} mini avatar`}
                      fill
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = "0.5";
                        target.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                <div className="relative">
                  <a
                    href="https://www.linkedin.com/in/samy-al-333911189/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pc-contact-btn absolute right-12"
                    style={{ pointerEvents: "auto" }}
                    type="button"
                    aria-label={`Contact ${name || "user"}`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      id="Linkedin--Streamline-Unicons"
                      height="16"
                      width="16"
                    >
                      <desc>
                        Linkedin Streamline Icon: https://streamlinehq.com
                      </desc>
                      <path
                        d="M14.6404 0.16013333333333332H1.3596C1.2103333333333333 0.15799999999999997 1.0620666666666665 0.1854 0.9233333333333333 0.24059999999999998 0.7846666666666666 0.2958666666666666 0.6581999999999999 0.37786666666666663 0.5511333333333333 0.4819333333333333 0.4441333333333333 0.5860666666666666 0.3586666666666667 0.7101999999999999 0.29966666666666664 0.8473333333333333c-0.05906666666666666 0.13713333333333333 -0.09046666666666665 0.28459999999999996 -0.09253333333333333 0.4338666666666667v13.4376c0.0020666666666666663 0.14926666666666666 0.033466666666666665 0.2967333333333333 0.09253333333333333 0.4338666666666667s0.14446666666666666 0.26126666666666665 0.2514666666666666 0.3654c0.10706666666666666 0.10413333333333333 0.23353333333333332 0.18613333333333332 0.3722 0.24133333333333332 0.13873333333333332 0.055266666666666665 0.287 0.08259999999999999 0.43626666666666664 0.08046666666666666h13.2808c0.14926666666666666 0.0021333333333333334 0.2975333333333333 -0.0252 0.4362 -0.08046666666666666 0.13879999999999998 -0.0552 0.2652 -0.1372 0.37226666666666663 -0.24133333333333332 0.107 -0.10413333333333333 0.19246666666666667 -0.22833333333333333 0.2514666666666666 -0.3654 0.05906666666666666 -0.13713333333333333 0.09046666666666665 -0.28459999999999996 0.09253333333333333 -0.4338666666666667V1.2812c-0.0020666666666666663 -0.14926666666666666 -0.033466666666666665 -0.29666666666666663 -0.09253333333333333 -0.4338666666666667 -0.059 -0.13713333333333333 -0.14446666666666666 -0.26126666666666665 -0.2514666666666666 -0.3654 -0.10706666666666666 -0.10406666666666665 -0.23346666666666666 -0.18613333333333332 -0.37226666666666663 -0.24133333333333332 -0.13866666666666666 -0.0552 -0.2869333333333333 -0.08259999999999999 -0.4362 -0.08046666666666666ZM4.9346 13.284066666666668h-2.352V6.228199999999999h2.352v7.055866666666667ZM3.7586 5.240333333333333c-0.3243333333333333 0 -0.6354 -0.1288 -0.8647999999999999 -0.35819999999999996 -0.2293333333333333 -0.2293333333333333 -0.35819999999999996 -0.5404 -0.35819999999999996 -0.8647999999999999 0 -0.3243333333333333 0.12886666666666666 -0.6354666666666666 0.35819999999999996 -0.8647999999999999 0.2294 -0.2294 0.5404666666666667 -0.35819999999999996 0.8647999999999999 -0.35819999999999996 0.17226666666666668 -0.019533333333333333 0.3466666666666667 -0.0024666666666666665 0.5118666666666667 0.05006666666666666 0.16519999999999999 0.05253333333333333 0.3174 0.1394 0.44666666666666666 0.25486666666666663 0.12933333333333333 0.11546666666666666 0.23273333333333335 0.25693333333333335 0.3036 0.41513333333333335 0.0708 0.1582 0.10746666666666667 0.3296 0.10746666666666667 0.5029333333333332 0 0.17333333333333334 -0.03666666666666667 0.34473333333333334 -0.10746666666666667 0.5029333333333332 -0.07086666666666666 0.1582 -0.17426666666666668 0.29966666666666664 -0.3036 0.41513333333333335 -0.12926666666666664 0.11546666666666666 -0.28146666666666664 0.2023333333333333 -0.44666666666666666 0.25486666666666663 -0.16519999999999999 0.052599999999999994 -0.33959999999999996 0.06966666666666665 -0.5118666666666667 0.050133333333333335ZM13.417333333333334 13.284066666666668h-2.351933333333333v-3.786666666666666c0 -0.9486 -0.33713333333333334 -1.5679333333333334 -1.1916666666666667 -1.5679333333333334 -0.2644666666666666 0.0019333333333333331 -0.522 0.08486666666666666 -0.7378666666666667 0.23766666666666664s-0.3797333333333333 0.36806666666666665 -0.4694666666666667 0.6168666666666667c-0.061399999999999996 0.18426666666666663 -0.088 0.3783333333333333 -0.0784 0.5722666666666667v3.92H6.235999999999999V6.2203333333333335h2.352v0.9956666666666667c0.2136 -0.37073333333333336 0.5244 -0.6761999999999999 0.8987333333333334 -0.8834 0.3744666666666666 -0.2072 0.7982666666666667 -0.30833333333333335 1.2258666666666667 -0.29259999999999997 1.5679999999999998 0 2.7047333333333334 1.0113333333333332 2.7047333333333334 3.183v4.061066666666666Z"
                        fill="#fff"
                        strokeWidth="0.6667"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/samyAlliche"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pc-contact-btn"
                    style={{ pointerEvents: "auto" }}
                    type="button"
                    aria-label={`Contact ${name || "user"}`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      id="Github--Streamline-Unicons"
                      height="16"
                      width="16"
                    >
                      <desc>
                        Github Streamline Icon: https://streamlinehq.com
                      </desc>
                      <path
                        d="M7.999933333333333 0.35346666666666665c-1.8616000000000001 0.00006666666666666667 -3.662466666666666 0.6626 -5.080266666666667 1.8689333333333331C1.5017999999999998 3.4287333333333327 0.5594666666666666 5.100266666666666 0.26126666666666665 6.937866666666666c-0.29819999999999997 1.8375333333333332 0.0672 3.7212666666666667 1.0308 5.3141333333333325 0.9635333333333334 1.5927333333333333 2.462466666666667 2.790733333333333 4.228533333333333 3.3795333333333333 0.39199999999999996 0.0686 0.5389999999999999 -0.1666 0.5389999999999999 -0.37239999999999995 0 -0.18619999999999998 -0.0098 -0.8036 -0.0098 -1.4602 -1.9697999999999998 0.36260000000000003 -2.4794 -0.4801333333333333 -2.6361999999999997 -0.9211333333333332 -0.174 -0.4288666666666666 -0.4498 -0.8089333333333333 -0.8036 -1.1074 -0.2744 -0.147 -0.6664 -0.5095999999999999 -0.0098 -0.5194 0.2507333333333333 0.027200000000000002 0.4911333333333333 0.11446666666666666 0.7010000000000001 0.2543333333333333 0.2098 0.13986666666666664 0.3828666666666667 0.3283333333333333 0.5044 0.5492666666666666 0.10719999999999999 0.1926 0.25139999999999996 0.36219999999999997 0.4242666666666666 0.499 0.17286666666666664 0.13679999999999998 0.37106666666666666 0.2382 0.5831999999999999 0.29819999999999997 0.2121333333333333 0.060066666666666664 0.434 0.07773333333333332 0.6529333333333334 0.05193333333333333s0.43066666666666664 -0.09453333333333333 0.6229333333333333 -0.2023333333333333c0.03393333333333333 -0.39859999999999995 0.2116 -0.7712666666666667 0.4998666666666667 -1.0486 -1.7444 -0.19599999999999998 -3.5671999999999997 -0.8722 -3.5671999999999997 -3.8709999999999996 -0.011 -0.7791333333333333 0.27646666666666664 -1.533 0.8036 -2.106933333333333 -0.23966666666666664 -0.6772 -0.21166666666666667 -1.4203999999999999 0.0784 -2.0776 0 0 0.6565333333333333 -0.20579999999999998 2.1559999999999997 0.8036 1.2828 -0.3528 2.6370666666666667 -0.3528 3.9199333333333333 0 1.4993999999999998 -1.0191999999999999 2.1559999999999997 -0.8036 2.1559999999999997 -0.8036 0.29006666666666664 0.6572 0.3181333333333333 1.4003999999999999 0.0784 2.0776 0.5286 0.5729333333333333 0.8164666666666666 1.3275333333333332 0.8036 2.106933333333333 0 3.0086 -1.8325999999999998 3.675 -3.577 3.8709999999999996 0.18706666666666666 0.1896 0.3311333333333333 0.41733333333333333 0.42246666666666666 0.6675333333333333 0.09133333333333334 0.2503333333333333 0.1277333333333333 0.5173333333333333 0.10673333333333332 0.7828666666666666 0 1.0486666666666666 -0.0098 1.8913333333333333 -0.0098 2.1559333333333335 0 0.20579999999999998 0.147 0.4508 0.5389999999999999 0.37239999999999995 1.7629333333333332 -0.5935333333333332 3.2575333333333334 -1.7943333333333333 4.217 -3.3879333333333332 0.9595333333333333 -1.5936666666666666 1.3214 -3.476466666666666 1.0211333333333332 -5.312266666666666 -0.3002666666666667 -1.8357333333333332 -1.2431333333333332 -3.5050666666666666 -2.6604 -4.709933333333333C11.659466666666667 1.0164666666666666 9.860133333333334 0.3544666666666666 7.999933333333333 0.35346666666666665Z"
                        fill="#fff"
                        strokeWidth="0.6667"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
