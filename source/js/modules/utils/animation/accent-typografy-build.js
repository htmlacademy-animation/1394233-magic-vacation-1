export class AccentTypographyBuild {
  constructor(
      elementSelector,
      timer,
      classForActivate,
      property,
      isOneLine
  ) {
    this._TIME_SPACE = 100;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._isOneLine = isOneLine;
    this._timeOffset = 40;
    this._oneLineLetters = [];

    this.prePareText();
  }

  createElement(letter, index) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    this.addTransitionProperties(span, index);
    return span;
  }

  addTransitionProperties(span, index) {
    span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;

    if (index % 7 >= 0 && index % 7 < 2 || index % 7 >= 4 && index % 7 < 6) {
      this._timeOffset -= 20;
    } else if (index % 7 === 2) {
      this._timeOffset += 20;
    } else if (index % 7 === 6) {
      this._timeOffset = 60;
    } else {
      this._timeOffset += 20;
    }
  }

  prePareText() {
    if (!this._element) {
      return;
    }

    if (this._isOneLine) {
      this._oneLineLetters.push(this._element.textContent);
    }

    const text = this._isOneLine ? this._oneLineLetters
      : this._element.textContent.trim().split(` `).filter((letter)=>letter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce(
          (fragment, letter, index) => {
            fragment.appendChild(this.createElement(letter, index));
            return fragment;
          },
          document.createDocumentFragment()
      );
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
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
