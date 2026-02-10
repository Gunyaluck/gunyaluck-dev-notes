import { useEffect, useRef } from "react";

/**
 * Detect clicks outside of specified refs
 * @param {Array<React.RefObject>} refs - Array of refs to check
 * @param {Function} callback - Callback function to execute when click outside
 */
export function useClickOutside(refs, callback) {
  const callbackRef = useRef(callback);
  const refsRef = useRef(refs);

  // Update refs when they change
  useEffect(() => {
    callbackRef.current = callback;
    refsRef.current = refs;
  }, [callback, refs]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = refsRef.current.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );

      if (isOutside) {
        callbackRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 
}