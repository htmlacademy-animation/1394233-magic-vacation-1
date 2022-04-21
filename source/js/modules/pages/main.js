import {AccentTypographyBuild} from "../utils/animation/accent-typografy-build";

export const main = () => {

  const animationMainTitleTextLine = new AccentTypographyBuild(`.js-main-title`, 500, `active`, `transform`);
  const animationDateTextLine = new AccentTypographyBuild(`.js-main-date`, 500, `active`, `transform`, true);

  animationMainTitleTextLine.runAnimation();

  setTimeout(()=>{
    animationDateTextLine.runAnimation();
  }, 500);
};
