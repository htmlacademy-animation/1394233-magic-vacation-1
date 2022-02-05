export class AccentTypographyBuild {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property
  ) {
    this._TIME_SPACE = 100;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 40;

    this.prePareText();
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;

    return span;
  }

  addTransitionProperties(span, index, wordIndex) {
    span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
    console.log(index % 7, span.textContent, this._timeOffset);
    // 40 20 0 20 40 20 0
    //  0  1 2  3  4  5 6

    if (index % 7 >= 0 && index % 7 < 2 || index % 7 >= 4 && index % 7 < 6) {
      this._timeOffset -= 20;
    } else if (index % 7 === 2) {
      this._timeOffset += 20;
    } else if (index % 7 === 6) {
      if (wordIndex === 1) {
        this._timeOffset = 160;
      } else {
        this._timeOffset = 60;
      }
    } else {
      this._timeOffset += 20;
    }
  }

  prePareText() {
    if (!this._element) {
      return;
    }

    const text = this._element.textContent.trim().split(` `).filter((letter)=>letter !== ``);

    const content = text.reduce((fragmentParent, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((fragment, letter, index) => {
        fragment.appendChild(this.createElement(letter, index, wordIndex));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);

      if (wordIndex === 1) {
        this._timeOffset = 160;
      }

      Array.from(wordContainer.childNodes).forEach((element, index) => {
        this.addTransitionProperties(element, index);
      });

      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);

    console.log(this._element);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
