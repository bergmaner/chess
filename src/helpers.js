
const getXYPosition = (i) => {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return {x,y}
  };

  export const letters = ['a','b','c','d','e','f','g','h'];

export const isBlack = (i) => {
    const {x, y} = getXYPosition(i);
    return (x+ y) % 2 === 1
  }

  export const getPosition = (i) => {
    const {x,y} = getXYPosition(i);
    const letter = letters[x];
    return `${letter}${y+1}`;
  }