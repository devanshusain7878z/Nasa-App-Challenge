import React, { useState, useEffect, useMemo, useCallback } from "react";

const PerformanceOptimizer = ({ children, enableOptimizations = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    frameRate: 60,
  });

  // Debounced visibility check
  const checkVisibility = useCallback(() => {
    const rect = children?.ref?.current?.getBoundingClientRect();
    if (rect) {
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      setIsVisible(visible);
    }
  }, [children]);

  // Performance monitoring
  useEffect(() => {
    if (!enableOptimizations) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measurePerformance = (currentTime) => {
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setPerformanceMetrics((prev) => ({
          ...prev,
          frameRate: fps,
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      if (performance.memory) {
        setPerformanceMetrics((prev) => ({
          ...prev,
          memoryUsage: Math.round(
            performance.memory.usedJSHeapSize / 1024 / 1024
          ),
        }));
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enableOptimizations]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableOptimizations) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const element = children?.ref?.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [children, enableOptimizations]);

  // Memoized children with performance optimizations
  const optimizedChildren = useMemo(() => {
    if (!enableOptimizations || isVisible) {
      return children;
    }

    // Return placeholder for non-visible components
    return (
      <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }, [children, isVisible, enableOptimizations]);

  return (
    <div className="performance-optimized">
      {optimizedChildren}

      {/* Performance Debug Panel (only in development) */}
      {process.env.NODE_ENV === "development" && enableOptimizations && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
          <div>FPS: {performanceMetrics.frameRate}</div>
          <div>Memory: {performanceMetrics.memoryUsage}MB</div>
          <div>Visible: {isVisible ? "Yes" : "No"}</div>
        </div>
      )}
    </div>
  );
};

// Higher-order component for performance optimization
export const withPerformanceOptimization = (Component) => {
  return React.memo((props) => (
    <PerformanceOptimizer>
      <Component {...props} />
    </PerformanceOptimizer>
  ));
};

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
  });

  const startRender = useCallback(() => {
    return performance.now();
  }, []);

  const endRender = useCallback((startTime) => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    setMetrics((prev) => ({
      renderCount: prev.renderCount + 1,
      lastRenderTime: renderTime,
      averageRenderTime: (prev.averageRenderTime + renderTime) / 2,
    }));
  }, []);

  return { metrics, startRender, endRender };
};

export default PerformanceOptimizer;
