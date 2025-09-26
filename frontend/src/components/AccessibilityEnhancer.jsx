import React, { useState, useEffect, useRef } from "react";

const AccessibilityEnhancer = ({ children, enableAccessibility = true }) => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindFriendly: false,
  });

  const [announcements, setAnnouncements] = useState([]);
  const announcementRef = useRef();

  // Detect user preferences
  useEffect(() => {
    if (!enableAccessibility) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia(
      "(prefers-contrast: high)"
    ).matches;

    // Check for large text preference
    const prefersLargeText = window.matchMedia(
      "(prefers-reduced-data: no-preference)"
    ).matches;

    setAccessibilitySettings((prev) => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
      largeText: prefersLargeText,
    }));
  }, [enableAccessibility]);

  // Apply accessibility styles
  useEffect(() => {
    if (!enableAccessibility) return;

    const root = document.documentElement;

    if (accessibilitySettings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    if (accessibilitySettings.largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }

    if (accessibilitySettings.reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }

    if (accessibilitySettings.colorBlindFriendly) {
      root.classList.add("colorblind-friendly");
    } else {
      root.classList.remove("colorblind-friendly");
    }
  }, [accessibilitySettings, enableAccessibility]);

  // Screen reader announcements
  const announce = (message) => {
    if (!enableAccessibility) return;

    setAnnouncements((prev) => [...prev, { id: Date.now(), message }]);

    // Auto-remove announcement after 5 seconds
    setTimeout(() => {
      setAnnouncements((prev) => prev.slice(1));
    }, 5000);
  };

  // Keyboard navigation support
  useEffect(() => {
    if (!enableAccessibility || !accessibilitySettings.keyboardNavigation)
      return;

    const handleKeyDown = (event) => {
      // Skip to main content
      if (event.key === "Tab" && event.shiftKey && event.altKey) {
        event.preventDefault();
        const main = document.querySelector("main");
        if (main) {
          main.focus();
          announce("Skipped to main content");
        }
      }

      // Skip to navigation
      if (event.key === "Tab" && event.altKey) {
        event.preventDefault();
        const nav = document.querySelector("nav");
        if (nav) {
          nav.focus();
          announce("Skipped to navigation");
        }
      }

      // Escape key handling
      if (event.key === "Escape") {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          modal.focus();
          announce("Modal closed");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [accessibilitySettings.keyboardNavigation, enableAccessibility]);

  // Focus management
  const manageFocus = (element) => {
    if (!enableAccessibility) return;

    if (element && element.focus) {
      element.focus();
      announce("Focus moved to new element");
    }
  };

  return (
    <div className="accessibility-enhanced">
      {children}

      {/* Screen Reader Announcements */}
      <div
        ref={announcementRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcements.map((announcement) => (
          <div key={announcement.id}>{announcement.message}</div>
        ))}
      </div>

      {/* Accessibility Controls */}
      {enableAccessibility && (
        <div className="fixed top-4 left-4 bg-gray-800 bg-opacity-90 p-4 rounded-lg text-white text-sm">
          <h3 className="font-bold mb-2">Accessibility Options</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={accessibilitySettings.highContrast}
                onChange={(e) =>
                  setAccessibilitySettings((prev) => ({
                    ...prev,
                    highContrast: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <span>High Contrast</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={accessibilitySettings.largeText}
                onChange={(e) =>
                  setAccessibilitySettings((prev) => ({
                    ...prev,
                    largeText: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <span>Large Text</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={accessibilitySettings.reducedMotion}
                onChange={(e) =>
                  setAccessibilitySettings((prev) => ({
                    ...prev,
                    reducedMotion: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <span>Reduce Motion</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={accessibilitySettings.colorBlindFriendly}
                onChange={(e) =>
                  setAccessibilitySettings((prev) => ({
                    ...prev,
                    colorBlindFriendly: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <span>Color Blind Friendly</span>
            </label>
          </div>
        </div>
      )}

      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only">
        <a
          href="#main-content"
          className="bg-blue-600 text-white p-2 rounded"
          onClick={(e) => {
            e.preventDefault();
            const main = document.querySelector("main");
            if (main) {
              main.focus();
              announce("Skipped to main content");
            }
          }}
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="bg-blue-600 text-white p-2 rounded ml-2"
          onClick={(e) => {
            e.preventDefault();
            const nav = document.querySelector("nav");
            if (nav) {
              nav.focus();
              announce("Skipped to navigation");
            }
          }}
        >
          Skip to navigation
        </a>
      </div>
    </div>
  );
};

// Hook for accessibility features
export const useAccessibility = () => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
  });

  const announce = (message) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return { settings, announce, updateSettings };
};

export default AccessibilityEnhancer;
