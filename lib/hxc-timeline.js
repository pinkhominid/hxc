/**
 * H×C Timeline
 * Copyright (c) pinkhominid <pinkhominid@birdbomb.com>
 * MIT license
 */

/**
 * Derived from CodyHouse Vertical Timeline Experiment
 * (https://github.com/CodyHouse/vertical-timeline)
 *
 * All the content made available through CodyHouse.co is copyrighted material
 * owned by Amber Creative Lab, Ltd.
 * MIT license (https://codyhouse.co/license)
 */

/**
 * NOTE: Nested virtual-scroller needs ResizeObserver and EventTarget polyfills for FF + Safari
 * (https://github.com/valdrinkoshi/virtual-scroller)
 */
import 'https://cdn.jsdelivr.net/gh/valdrinkoshi/virtual-scroller@ce533a6c/src/virtual-scroller.js';

const tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>
    :host {
      display: block;
      height: 150px;
    }
    :host([hidden]) {
      display: none;
    }
    *, *::after, *::before {
      box-sizing: border-box;
    }
    .cd-timeline__container {
      position: relative;
      width: 90%;
      max-width: 1170px;
      margin: 0 auto;
      padding: 2em 0;
    }

    .cd-timeline__container::before {
      /* this is the vertical line */
      content: '';
      position: absolute;
      top: 0;
      left: 18px;
      height: 100%;
      width: 4px;
      background: #ddd;
    }

    @media only screen and (min-width: 1170px) {
      .cd-timeline__container::before {
        left: 50%;
        margin-left: -2px;
      }
    }

    .cd-timeline__block {
      position: relative;
      margin: 2em 0;
    }

    .cd-timeline__block:after {
      /* clearfix */
      content: "";
      display: table;
      clear: both;
    }

    .cd-timeline__block:first-child {
      margin-top: 0;
    }

    .cd-timeline__block:last-child {
      margin-bottom: 0;
    }

    @media only screen and (min-width: 1170px) {
      .cd-timeline__block {
        margin: 4em 0;
      }
    }

    .cd-timeline__img {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      -webkit-box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
              box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
    }

    .cd-timeline__img img {
      display: block;
      width: 24px;
      height: 24px;
      position: relative;
      left: 50%;
      top: 50%;
      margin-left: -12px;
      margin-top: -12px;
    }

    .cd-timeline__img {
      background: #777;
    }

    @media only screen and (min-width: 1170px) {
      .cd-timeline__img {
        width: 60px;
        height: 60px;
        left: 50%;
        margin-left: -30px;
        /* Force Hardware Acceleration */
        -webkit-transform: translateZ(0);
                transform: translateZ(0);
      }
      .cd-timeline__img.cd-timeline__img--bounce-in {
        visibility: visible;
        -webkit-animation: cd-bounce-1 0.6s;
                animation: cd-bounce-1 0.6s;
      }
    }

    @-webkit-keyframes cd-bounce-1 {
      0% {
        opacity: 0;
        -webkit-transform: scale(0.5);
                transform: scale(0.5);
      }
      60% {
        opacity: 1;
        -webkit-transform: scale(1.2);
                transform: scale(1.2);
      }
      100% {
        -webkit-transform: scale(1);
                transform: scale(1);
      }
    }

    @keyframes cd-bounce-1 {
      0% {
        opacity: 0;
        -webkit-transform: scale(0.5);
                transform: scale(0.5);
      }
      60% {
        opacity: 1;
        -webkit-transform: scale(1.2);
                transform: scale(1.2);
      }
      100% {
        -webkit-transform: scale(1);
                transform: scale(1);
      }
    }

    .cd-timeline__content {
      position: relative;
      margin-left: 60px;
      background: white;
      border-radius: 0.25em;
      padding: 1em;
      -webkit-box-shadow: 0 3px 0 #d7e4ed;
              box-shadow: 0 3px 0 #d7e4ed;
    }

    .cd-timeline__content:after {
      /* clearfix */
      content: "";
      display: table;
      clear: both;
    }

    .cd-timeline__content::before {
      /* triangle next to content block */
      content: '';
      position: absolute;
      top: 16px;
      right: 100%;
      height: 0;
      width: 0;
      border: 7px solid transparent;
      border-right: 7px solid white;
    }

    .cd-timeline__date {
      display: inline-block;
    }

    .cd-timeline__date {
      float: left;
      padding: .8em 0;
      opacity: .7;
    }

    @media only screen and (min-width: 1170px) {
      .cd-timeline__content {
        margin-left: 0;
        padding: 1.6em;
        width: 45%;
        /* Force Hardware Acceleration */
        -webkit-transform: translateZ(0);
                transform: translateZ(0);
      }
      .cd-timeline__content::before {
        top: 24px;
        left: 100%;
        border-color: transparent;
        border-left-color: white;
      }
      .cd-timeline__date {
        position: absolute;
        width: 100%;
        left: 122%;
        top: 6px;
      }
      .cd-timeline__block:nth-child(even) .cd-timeline__content {
        float: right;
      }
      .cd-timeline__block:nth-child(even) .cd-timeline__content::before {
        top: 24px;
        left: auto;
        right: 100%;
        border-color: transparent;
        border-right-color: white;
      }
      .cd-timeline__block:nth-child(even) .cd-timeline__date {
        left: auto;
        right: 122%;
        text-align: right;
      }
      .cd-timeline__content.cd-timeline__content--bounce-in {
        visibility: visible;
        -webkit-animation: cd-bounce-2 0.6s;
                animation: cd-bounce-2 0.6s;
      }
    }

    @media only screen and (min-width: 1170px) {
      /* inverse bounce effect on even content blocks */
      .cd-timeline__block:nth-child(even) .cd-timeline__content.cd-timeline__content--bounce-in {
        -webkit-animation: cd-bounce-2-inverse 0.6s;
                animation: cd-bounce-2-inverse 0.6s;
      }
    }

    @-webkit-keyframes cd-bounce-2 {
      0% {
        opacity: 0;
        -webkit-transform: translateX(-100px);
                transform: translateX(-100px);
      }
      60% {
        opacity: 1;
        -webkit-transform: translateX(20px);
                transform: translateX(20px);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }

    @keyframes cd-bounce-2 {
      0% {
        opacity: 0;
        -webkit-transform: translateX(-100px);
                transform: translateX(-100px);
      }
      60% {
        opacity: 1;
        -webkit-transform: translateX(20px);
                transform: translateX(20px);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }

    @-webkit-keyframes cd-bounce-2-inverse {
      0% {
        opacity: 0;
        -webkit-transform: translateX(100px);
                transform: translateX(100px);
      }
      60% {
        opacity: 1;
        -webkit-transform: translateX(-20px);
                transform: translateX(-20px);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }

    @keyframes cd-bounce-2-inverse {
      0% {
        opacity: 0;
        -webkit-transform: translateX(100px);
                transform: translateX(100px);
      }
      60% {
        opacity: 1;
        -webkit-transform: translateX(-20px);
                transform: translateX(-20px);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }

    .cd-timeline__container {
      margin: 0 auto;
    }
    .cd-timeline__img {
      top: 32px;
    }
    @media only screen and (min-width: 1170px) {
      .cd-timeline__block.even .cd-timeline__content {
        float: right;
      }
      .cd-timeline__block.even .cd-timeline__content::before {
        top: 24px;
        left: auto;
        right: 100%;
        border-color: transparent;
        border-right-color: white;
      }
      .cd-timeline__block.even .cd-timeline__date {
        left: auto;
        right: 122%;
        text-align: right;
      }
      /* inverse bounce effect on even content blocks */
      .cd-timeline__block.even .cd-timeline__content.cd-timeline__content--bounce-in {
        -webkit-animation: cd-bounce-2-inverse 0.6s;
                animation: cd-bounce-2-inverse 0.6s;
      }
    }
    virtual-scroller {
      height: 100%;
    }
  </style>
  <virtual-scroller></virtual-scroller>
`;

const timelineItemTmpl = (idx, item) => `
  <div class="cd-timeline__container cd-timeline__block ${idx % 2 == 0 ? 'even' : ''}">
    <div class="cd-timeline__img cd-timeline__img--picture"></div>
    <div class="cd-timeline__content">
      <h2>Title of ${item}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p>
      <span class="cd-timeline__date">January ${idx}, 2019</span>
    </div>
  </div>
`;

export class HxcTimeline extends HTMLElement {
  get items() {
    return this._scroller.itemSource;
  }

  set items(items) {
    // This will automatically cause a render of the visible children
    // (i.e., those that fit on the screen).
    this._scroller.itemSource = items;
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this._scroller = shadowRoot.querySelector('virtual-scroller');

    this._scroller.updateElement = (child, item, index) => {
      child.innerHTML = timelineItemTmpl(index, item);
      child.onclick = () => console.log(`clicked item #${index}`);
    };
  }

  connectedCallback() {
    this._upgradeProperty('items');
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}

customElements.define('hxc-timeline', HxcTimeline);
