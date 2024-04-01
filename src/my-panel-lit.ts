import { createComponent } from "@lit-labs/react";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";
import React from "react";

@customElement("my-panel-lit")
export class MyPanelLit extends LitElement {
  static styles = css`
    .title {
      background: black;
      color: white;
      padding: 20px;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .body {
      padding: 20px;
      border: 1px solid black;
    }

    .btn {
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .title-closed {
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  `;
  @property({ type: String })
  title = "Hello, World!";

  @property({ type: Boolean })
  opened = false;

  @property({ type: String })
  icon = "";

  private onIconClickHandler(e: MouseEvent) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("icon-click", { bubbles: true }));
  }

  render() {
    return html` <div>
      <div
        class=${classMap({ title: true, "title-closed": !this.opened })}
        @click=${() => (this.opened = !this.opened)}
      >
        ${this.title}
        <div class="btn" @click=${this.onIconClickHandler}>${this.icon}</div>
      </div>

      ${when(
        this.opened,
        () => html`<div class="body">
          <slot></slot>
        </div>`
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-panel-lit": MyPanelLit;
  }
}

export const MyPanelReact = createComponent(React, "my-panel-lit", MyPanelLit, {
  onIconClick: "icon-click",
});
