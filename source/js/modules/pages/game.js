import {AccentTypographyBuild} from "../utils/animation/accent-typografy-build";

export const game = () => {

  const animationGameTitleTextLine = new AccentTypographyBuild(`.js-game-title`, 500, `active`, `transform`);


  setTimeout(()=>{
    animationGameTitleTextLine.runAnimation();
  }, 100);
};
