import { useState, useEffect } from 'react';

function useTouchRefresh(onRefresh) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  function handleTouchStart(event) {
    if (event.touches.length !== 1) return;
    setIsRefreshing(false);
  }

  function handleTouchMove(event) {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    const isTop = window.scrollY === 0;
    const isMovingDown = touch.clientY > startY;
    if (isTop && isMovingDown) {
      event.preventDefault();
      setIsRefreshing(true)
    }
  }

  async function handleTouchEnd(event) {
    if (isRefreshing && window.scrollY === 0) {
      try {
        await onRefresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsRefreshing(false);
      }
    }
  }

  let startY = 0;
  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove, { passive: false });
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onRefresh]);

  return [isRefreshing, setIsRefreshing];
}

export default useTouchRefresh;
