/**
 * H×C Drawer
 * Copyright (c) pinkhominid <pinkhominid@birdbomb.com>
 * MIT license
 */

const tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1001;
      width: 100%;
      height: var(--drawer-size, 25vh);
      transform: translate3d(0, var(--drawer-size, 25vh), 0);
      transition: transform 0.3s;
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    }
    :host([hidden]) {
      display: none;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host([open]) {
      transform: translate3d(0, 0, 0);
      transition: transform 0.4s;
    }
    *, *::after, *::before {
      box-sizing: border-box;
    }
  </style>
  <div>
    <slot></slot>
  </div>
`;

export class HxcDrawer extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'open'];
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    // Reflect the value of the disabled property as an HTML attribute.
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this._onDocClick = this._onDocClick.bind(this);
  }

  connectedCallback() {
    this._upgradeProperty('open');
    this._upgradeProperty('disabled');

    this.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('click', this._onDocClick);

    // initialize attributes
    this.attributeChangedCallback();
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('click', this._onDocClick);
  }

  _onDocClick(event) {
    // if user clicks outside drawer element, close it
    if (this.open && !this.contains(event.target)) {
      this.open = false;
    }
  }
  _onKeyDown(event) {
    if (event.code === 'Space') {
      this.toggleDrawer()
    }
  }

  toggleDrawer() {
    // prevent toggle if disabled
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  // Only called for the disabled and open attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    // When the drawer is disabled, update keyboard/screen reader behavior.
    if (this.disabled) {
      this.setAttribute('tabindex', '-1');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-disabled', 'false');
    }

    if (this.open) {
      this._origOverflow = document.scrollingElement.style.overflow;
      document.scrollingElement.style.overflow = 'hidden';
    } else if (this._origOverflow != null) {
      document.scrollingElement.style.overflow = this._origOverflow;
    }
  }
}

customElements.define('hxc-drawer', HxcDrawer);
