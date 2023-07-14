import { Component, Event, EventEmitter, Listen, Prop, h } from '@stencil/core';
import { PositionIcon, Type } from '../../../shared/types/types';

@Component({
  tag: 'reto-inputgroup-text',
  styleUrl: 'reto-inputgroup-text.scss',
  shadow: true,
})
export class retoInputgroupText {
  @Prop() label = 'Entrada de Texto';
  @Prop() forname: string;
  @Prop() errortext = 'Error';
  @Prop() placeholder = '';
  @Prop() type: Type = 'text';
  @Prop() positionicon: PositionIcon = 'right';
  @Prop({ mutable: true }) value: string;
  @Prop({ mutable: true }) disable = false;
  @Prop({ mutable: true }) error = false;
  @Prop() maxlength: string;
  @Prop() minlength: string;
  @Prop({ mutable: true }) lowercase = false;
  @Prop({ mutable: true }) focusable = false;
  @Prop({ mutable: true }) iseventemmiter = true;
  @Prop() copypaste = true;
  @Prop({ mutable: true }) regularexpression = '';

  @Event() valueChanged: EventEmitter;
  @Event() elementBlured: EventEmitter;
  @Event() searchClicked: EventEmitter;
  @Event() searchClick: EventEmitter;
  render() {
    if (this.error) {
      return (
        <div>
          {this.label && this.label.length > 0 ? <reto-label label={this.label} forname={this.label}></reto-label> : ''}
          <reto-input
            type={this.type}
            name={this.label}
            maxlength={this.maxlength}
            minlength={this.minlength}
            placeholder={this.placeholder}
            value={this.value}
            disable={this.disable}
            error={this.error}
            lowercase={this.lowercase}
            focusable={this.focusable}
            copypaste={this.copypaste}
            regularexpression={this.regularexpression}
          ></reto-input>
        </div>
      );
    } else {
      return (
        <div>
          {this.label && this.label.length > 0 ? <reto-label label={this.label} forname={this.label}></reto-label> : ''}
          <reto-input
            type={this.type}
            name={this.label}
            maxlength={this.maxlength}
            minlength={this.minlength}
            placeholder={this.placeholder}
            value={this.value}
            disable={this.disable}
            error={this.error}
            lowercase={this.lowercase}
            iseventemmiter={this.iseventemmiter}
            focusable={this.focusable}
            copypaste={this.copypaste}
            regularexpression={this.regularexpression}
          ></reto-input>
        </div>
      );
    }
  }

  @Listen('valueChange')
  onValueChange(ev: CustomEvent) {
    this.valueChanged.emit(ev.detail);
  }

  @Listen('elementBlur')
  onElementBlur() {
    this.elementBlured.emit();
  }

  @Listen('iconClick')
  onIconClick(ev) {
    this.searchClicked.emit(ev);
  }
  //TODO: Queda corregir que la molecula emita el evento del atomo
  // @Listen('iconClick')
  // onIconClick() {
  //   this.searchClicked.emit();
  // }
}
