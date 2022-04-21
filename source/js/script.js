// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import pageLoaded from './modules/page-loaded.js';
import {main} from './modules/pages/main.js';
import {story} from './modules/pages/story.js';
import {prizes} from './modules/pages/prizes.js';
import {rules} from './modules/pages/rules.js';
import {game} from './modules/pages/game.js';

// init modules
pageLoaded();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
main();
story();
prizes();
rules();
game();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
