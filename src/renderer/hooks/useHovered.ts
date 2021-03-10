import { useRef, useState, useEffect, Ref } from 'react';

export const useHovered = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const elem = ref.current;

    const handleMouseOver = (e: MouseEvent) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      if (elem && !elem.contains(e.relatedTarget as any)) {
        setHovered(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      if (elem && !elem.contains(e.relatedTarget as any)) {
        setHovered(false);
      }
    };

    elem?.addEventListener('mouseover', handleMouseOver);
    elem?.addEventListener('mouseout', handleMouseOut);

    return () => {
      elem?.removeEventListener('mouseover', handleMouseOver);
      elem?.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return [ref, hovered];
};
