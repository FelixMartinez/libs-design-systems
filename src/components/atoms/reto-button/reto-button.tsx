import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { ThemeColor, Size, ButtonType } from '../../../shared/types/types';

@Component({
  tag: 'reto-button',
  styleUrl: 'reto-button.sass',
  shadow: true,
})
export class RetoButton {
  @Event() buttonClicked: EventEmitter;

  @Prop() text = 'Default';
  @Prop() color: ThemeColor = 'primary';
  @Prop() size: Size = 'md';
  @Prop() type: ButtonType = 'default';
  @Prop() disable = false;
  @Prop() spinner = false;

  render() {
    return (
      <button class={this.getClassList()} onClick={ev => this.click(ev)} disabled={this.disable}>
        <div class="flexs">
          <span class={this.getTextClassList()}>{this.text}</span>
          <div class="spin-container">
            <span class="spin"></span>
          </div>
        </div>
      </button>
    );
  }

  getClassList() {
    return {
      [`${this.color}`]: true,
      [`${this.size}`]: true,
      [`${this.type}`]: true,
      [`spinner`]: this.spinner,
    };
  }

  getTextClassList() {
    return {
      [`text-btn`]: this.spinner,
    };
  }

  click(event: MouseEvent) {
    if (!this.disable && !this.spinner) {
      this.buttonClicked.emit();
    } else {
      event.stopPropagation();
    }
  }
}

