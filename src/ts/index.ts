import smoothscroll from 'smoothscroll-polyfill';
import '../../icon.font';
import 'src/scss/styles.scss';
import {App} from 'src/ts/app';

/**
 * Smooth scroll to polyfill to Safari
 */
smoothscroll.polyfill();
new App();
