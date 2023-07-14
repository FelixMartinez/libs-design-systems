import { Component, Event, EventEmitter, Listen, Prop, h } from '@stencil/core';

@Component({
  tag: 'reto-inputgroup-select',
  styleUrl: 'reto-inputgroup-select.sass',
  shadow: true,
})
export class RetoInputgroupSelect {
  @Prop() label: string;
  @Prop() errortext = 'Error';
  @Prop({ mutable: true }) value: string;
  @Prop({ mutable: true }) items: any[] = [];
  @Prop({ mutable: true }) disable = false;
  @Prop({ mutable: true }) error = false;

  @Event() valueChanged: EventEmitter;
  @Event() elementBlured: EventEmitter;

  render() {
    if (this.error) {
      return (
        <div>
          <reto-label label={this.label}></reto-label>
          <reto-select
            value={this.value}
            items={this.items}
            disable={this.disable}
            error={this.error}
          ></reto-select>
          <div class="errortext">
            <reto-breadcrum color="error" text={this.errortext}></reto-breadcrum>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <reto-label label={this.label}></reto-label>
          <reto-select value={this.value} items={this.items} disable={this.disable}></reto-select>
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
}
