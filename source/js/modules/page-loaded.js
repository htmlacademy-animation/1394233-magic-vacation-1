export default () => {
  const activeNavLink = document.querySelector(`.page-header__menu a.active`);

  const END_LOAD_CLASS = `page-loaded`;
  const ANIMATED_CLASS = `animated`;
  const TIME_BEFORE_DELETION = 400;

  const animateActiveNavLink = () => {
    activeNavLink.classList.add(ANIMATED_CLASS);
    setTimeout(() => {
      activeNavLink.classList.remove(ANIMATED_CLASS);
    }, TIME_BEFORE_DELETION);
  };

  const onLoadPage = () => {
    document.body.classList.add(END_LOAD_CLASS);

    animateActiveNavLink();
  };

  window.addEventListener(`load`, onLoadPage, {once: true});
};
