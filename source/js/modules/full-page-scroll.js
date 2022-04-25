import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.backgroudElement = document.querySelector(`.screen__bg-layout`);

    this.prevScreen = 0;
    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    this.prevScreen = this.activeScreen;
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    if (this.screenElements[1].classList.contains(`active`) && this.activeScreen === 2) {
      this.backgroudElement.classList.add(`screen__bg-layout--active`);

      setTimeout(() => {
        this.changeVisibilityDisplay();
        this.changeActiveMenuItem();
        this.emitChangeDisplayEvent();
      }, 600);
    } else {
      this.changeVisibilityDisplay();
      this.changeActiveMenuItem();
      this.emitChangeDisplayEvent();
    }
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      if (this.prevScreen !== 2 && this.activeScreen !== 3) {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
        screen.classList.remove(`screen--hide-footer`);
        screen.classList.remove(`screen--show-disclamer`);
      }
    });

    if (this.prevScreen === 1 && this.activeScreen === 2) {
      this.backgroudElement.classList.remove(`screen__bg-layout--active`);
    }


    if (this.prevScreen === 2 && this.activeScreen === 3) {
      this.screenElements[this.prevScreen].classList.add(`screen--hide-footer`);
      setTimeout(() => {
        this.screenElements[this.prevScreen].classList.add(`screen--hidden`);
        this.screenElements[this.prevScreen].classList.remove(`active`);

        this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
        this.screenElements[this.activeScreen].classList.add(`active`);
        this.screenElements[this.activeScreen].classList.add(`screen--show-disclamer`);
      }, 300);
    } else {
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.add(`active`);
      }, 100);
    }

  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
