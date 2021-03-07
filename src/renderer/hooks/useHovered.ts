import { useRef, useState, useEffect, Ref } from 'react';

export const useHovered = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);

    const elem = ref.current;
    if (elem) {
      elem.addEventListener('mouseover', handleMouseOver);
      elem.addEventListener('mouseout', handleMouseOut);
      return () => {
        elem.removeEventListener('mouseover', handleMouseOver);
        elem.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, []);

  return [ref, hovered];
};
