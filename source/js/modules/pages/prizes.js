import {AccentTypographyBuild} from "../utils/animation/accent-typografy-build";

export const prizes = () => {

  const animationPrizesTitleTextLine = new AccentTypographyBuild(`.js-prizes-title`, 500, `active`, `transform`);


  setTimeout(()=>{
    animationPrizesTitleTextLine.runAnimation();
  }, 100);
};
