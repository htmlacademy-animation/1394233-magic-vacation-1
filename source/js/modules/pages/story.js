import {AccentTypographyBuild} from "../utils/animation/accent-typografy-build";

export const story = () => {

  const animationStoryTitleTextLine = new AccentTypographyBuild(`.js-story-title`, 500, `active`, `transform`);


  setTimeout(()=>{
    animationStoryTitleTextLine.runAnimation();
  }, 100);
};
