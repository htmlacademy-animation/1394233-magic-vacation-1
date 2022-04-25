import Swiper from "swiper";

const MenuButtonClass = {
  0: `first-slide`,
  2: `second-slide`,
  4: `third-slide`,
  6: `fourth-slide`,
};

const SLIDER_INIT_CLASS = `slider-init`;

export default () => {
  let storySlider;
  let currentMenuButtonClass;
  let isSliderInit = true;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

  const chageColorMenuButton = (slideIndex) => {
    if (currentMenuButtonClass) {
      document.body.classList.remove(currentMenuButtonClass);
    }

    currentMenuButtonClass = MenuButtonClass[slideIndex];
    document.body.classList.add(currentMenuButtonClass);

    if (isSliderInit) {
      setTimeout(() => {
        document.body.classList.remove(SLIDER_INIT_CLASS);
        isSliderInit = false;
      }, 1000);
    }
  };

  const setSlider = function () {
    if (window.innerWidth / window.innerHeight < 1 || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            if (
              storySlider.activeIndex === 0 ||
              storySlider.activeIndex === 1
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (
              storySlider.activeIndex === 2 ||
              storySlider.activeIndex === 3
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (
              storySlider.activeIndex === 4 ||
              storySlider.activeIndex === 5
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (
              storySlider.activeIndex === 6 ||
              storySlider.activeIndex === 7
            ) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true,
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`,
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
            }
            chageColorMenuButton(storySlider.activeIndex);
          },
          resize: () => {
            storySlider.update();
          },
        },
        observer: true,
        observeParents: true,
      });
    }
  };

  const onBodyScreenChanged = (evt) => {
    if (evt.detail.screenName === `story`) {
      if (isSliderInit) {
        document.body.classList.add(SLIDER_INIT_CLASS);
      }

      if (storySlider) {
        chageColorMenuButton(storySlider.activeIndex);
      }
    } else {
      document.body.classList.remove(currentMenuButtonClass);

      if (!isSliderInit) {
        document.body.classList.remove(SLIDER_INIT_CLASS);
        isSliderInit = true;
      }
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();

  document.body.addEventListener(`screenChanged`, onBodyScreenChanged);
};
