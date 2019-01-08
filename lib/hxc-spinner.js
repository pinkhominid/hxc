/**
 * H×C Spinner
 * Copyright (c) Pink Hominid <ph@birdbomb.com>
 * MIT license
 */

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      width: 48px;
      height: 48px;
    }
    :host([hidden]) {
      display: none;
    }
    :host > div {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-top: 4px solid #555;
      /* easeInOutCirc */
      animation: rotating .75s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    }
    @keyframes rotating {
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  <div></div>
  <slot></slot>
`;

export class HxcSpinner extends HTMLElement {
  constructor() {
    super();

    this._root = template.content.cloneNode(true);

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._initialized) this._init();
    else this._update();
  }

  _init() {
    this._initialized = true;

    this.shadowRoot.appendChild(this._update());
    // once appended document fragment children are moved to shadowRoot
    this._root = this.shadowRoot;

    // set default attributes on host if not already set
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'img');
    }
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', this.textContent || 'Loading');
    }
  }

  _update() {
    return this._root;
  }
};

customElements.define('hxc-spinner', HxcSpinner);
