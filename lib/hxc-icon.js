/**
 * H×C Icon
 * Copyright (c) Pink Hominid <ph@birdbomb.com>
 * MIT license
 */

/* BUG: Safari issue with svg use tag in shadow tree will land soon
   (https://bugs.webkit.org/show_bug.cgi?id=174977) */

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      vertical-align: bottom;
      display: inline-flex;
      align-items: center;
      contain: content;
    }
    :host([hidden]) {
      display: none;
    }
    svg {
      height: var(--icon-size, 1em);
      padding: var(--icon-padding, 1px);
      fill: var(--icon-color, inherit);
    }
    use {
      display: none;
    }
    :host([type=back-arrow]) #back-arrow,
    :host([type=forward-arrow]) #forward-arrow,
    :host([type=up-arrow]) #up-arrow,
    :host([type=down-arrow]) #down-arrow {
      display: inline;
    }
  </style>
  <slot name="before-icon"></slot>
  <svg viewBox="0 0 16 16">
    <defs>
      <path id="arrow" d="M13.749 6.408H5.873l2.675-2.613a1.248 1.558 0 0 0 .217-2.192 1.249 1.56 0 0 0-1.754-.273L1.48 6.737a1.254 1.565 0 0 0-.005 2.458l5.53 5.468c.23.224.503.337.777.337.362 0 .732-.206.98-.593a1.241 1.55 0 0 0-.206-2.19L5.843 9.532h7.905A1.252 1.563 0 0 0 15 7.974c0-.86-.563-1.565-1.252-1.565"/>
    </defs>
    <use id="back-arrow" xlink:href="#arrow"/>
    <use id="forward-arrow" xlink:href="#arrow" transform="rotate(180 8 8)"/>
    <use id="up-arrow" xlink:href="#arrow" transform="rotate(90 8 8)"/>
    <use id="down-arrow" xlink:href="#arrow" transform="rotate(270 8 8)"/>
  </svg>
  <slot></slot>
`;

export class HxcIcon extends HTMLElement {
  static get observedAttributes() {
    return ['type'];
  }

  constructor() {
    super();

    this._root = template.content.cloneNode(true);

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._initialized) this._init();
    else this._update();
  }

  attributeChangedCallback() {
    this._update();
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
      this.setAttribute('aria-label', this.textContent || this.getAttribute('type'));
    }

    // const observer = new MutationObserver(this.update.bind(this));
    // observer.observe(this, { childList: true, subtree: true });
  }

  _update() {
    return this._root;
  }
};

customElements.define('hxc-icon', HxcIcon);
