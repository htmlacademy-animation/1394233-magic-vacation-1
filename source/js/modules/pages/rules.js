import {AccentTypographyBuild} from "../utils/animation/accent-typografy-build";

export const rules = () => {

  const animationRulesTitleTextLine = new AccentTypographyBuild(`.js-rules-title`, 500, `active`, `transform`);


  setTimeout(()=>{
    animationRulesTitleTextLine.runAnimation();
  }, 100);
};
