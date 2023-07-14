import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'reto-label',
  styleUrl: 'reto-label.sass',
  shadow: true,
})
export class RetoLabel {
  @Prop() label = 'Input';
  @Prop() forname = 'Input';
  /* istanbul ignore next */
  render() {
    if (this.label) {
      return <label htmlFor={this.forname}>{this.label}</label>;
    }
  }
}
