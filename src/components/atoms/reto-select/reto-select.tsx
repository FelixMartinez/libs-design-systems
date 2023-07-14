import { Component, Element, Event, EventEmitter, Listen, Prop, State, h } from '@stencil/core';


@Component({
  tag: 'reto-select',
  styleUrl: 'reto-select.sass',
  shadow: true,
})
export class RetoSelect  {
  @Element() el: HTMLElement;
  @Prop({ mutable: true }) placeholder = 'Seleccione';
  @Prop({ mutable: true }) items: any[] = [{ id: '1', name: 'uno' }, { id: '2', name: 'dos' }];
  @Prop({ mutable: true }) value: string;
  @Prop() disable = false;
  @Prop({ mutable: true }) error = false;

  @Event() elementBlur: EventEmitter;
  @Event() valueChange: EventEmitter;

  @State() activeMenu = false;
  @State() focus = false;
  @State() index = 0;
  @State() valueExist = false;

  componentWillUpdate() {
    if (!this.value) {
      this.el.shadowRoot.querySelector('div.text-selected').textContent = this.placeholder;
    } else {
      if (this.value !== 'SIN_DATA') {
        this.valueExist = this.items.some(this.checkValueExist.bind(this));
        if (this.valueExist) {
          const find = this.items.find(value => value.id == this.value);
          this.el.shadowRoot.querySelector('div.text-selected').textContent = find.name;
        }
      }
    }
  }
  componentWillLoad() {
    if (this.value && this.value !== 'SIN_DATA' && this.items.length > 0) {
      this.valueExist = this.items.some(this.checkValueExist.bind(this));
    }
  }

  /* istanbul ignore next */
  render() {
    return (
      <div id="dropdown-select" onBlur={ev => this.onblurSection(ev)} tabindex="0">
        <div class={this.getSelectedClassList()} onClick={ev => this.listClick(ev)}>
          {this.value && this.value !== 'SIN_DATA' ? (
            <div class="text-selected">{this.getPropertyName()}</div>
          ) : (
            <div class="text-selected">{this.placeholder}</div>
          )}
          <div class={this.getArrowClassList()}></div>
        </div>
        <ul class={this.getULClassList()} id="list">
          {this.items.map(value => (
            <li
              onClick={ev => this.elementClick(ev)}
              id={value.id}
              class={this.getListClassList(value.id)}
            >
              {value.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  getPropertyName() {
    let textSelected = this.placeholder;
    const find = this.items.find(value => value.id == this.value);
    if (find && Object.keys(find).length > 0) {
      textSelected = find.name;
    }
    return textSelected;
  }

  @Listen('mousemove')
  mouseenter() {
    const li = this.el.shadowRoot.querySelector('li.focused');

    if (li) {
      li.classList.remove('focused');
    }
  }

  onblurSection(event) {
    if (this.activeMenu) {
      event.preventDefault();
      event.stopPropagation();
      this.activeMenu = false;
      this.elementBlur.emit(event);

      const li = this.el.shadowRoot.querySelector('li.focused');
      if (li) {
        li.classList.remove('focused');
        this.el.shadowRoot.querySelector('ul').scrollTop = 0;
      }
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key == 'Tab') {
      this.keyTab(ev);
    } else if (ev.key == 'Enter') {
      this.keyEnter(ev);
    } else if (ev.key == 'ArrowDown' || ev.key == 'Down') {
      this.keyDown(ev);
    } else if (ev.key == 'ArrowUp' || ev.key == 'Up') {
      this.keyUp(ev);
    }
  }

  keyTab(ev: KeyboardEvent) {
    this.activeMenu = false;
    this.elementBlur.emit(ev);

    this.el.shadowRoot.querySelector('ul').scrollTop = 0;
    const li = this.el.shadowRoot.querySelector('li.focused');

    if (li) {
      li.classList.remove('focused');
    }
  }

  keyEnter(ev: KeyboardEvent) {
    if (this.activeMenu) {
      const li = this.el.shadowRoot.querySelector('li.focused');

      if (this.value != li.textContent) {
        this.el.shadowRoot.querySelector('div.text-selected').textContent = li.textContent;
        this.value = li.getAttribute('id');
        this.valueChange.emit(this.value);
      }

      this.activeMenu = false;
      this.el.blur();

      ev.preventDefault();
      ev.stopPropagation();
    }
  }

  keyDown(ev) {
    const li = this.el.shadowRoot.querySelector('li.focused');
    if (li) {
      if (this.index !== undefined && this.index < this.items.length - 1) {
        li.classList.remove('focused');

        this.index++;
        this.el.shadowRoot
          .querySelectorAll('li')
          .item(this.index)
          .classList.add('focused');
      }
    } else {
      this.el.shadowRoot.querySelector('li').classList.add('focused');
      this.index = 0;
    }

    if (this.index > 2) {
      this.el.shadowRoot.querySelector('ul').scrollTop += 54.1;
    }
    //this.el.shadowRoot.querySelector('ul').scrollTo(scroll, scroll + 15);
    ev.preventDefault();
  }

  keyUp(ev) {
    const li = this.el.shadowRoot.querySelector('li.focused');
    if (li) {
      if (this.index !== undefined && this.index > 0) {
        li.classList.remove('focused');

        this.index--;
        this.el.shadowRoot
          .querySelectorAll('li')
          .item(this.index)
          .classList.add('focused');
      }
    } else {
      (this.el.shadowRoot.querySelector('ul').lastChild as Element).classList.add('focused');
      this.index = this.items.length - 1;
    }

    if (this.items.length > 3 && this.index < this.items.length - 3) {
      this.el.shadowRoot.querySelector('ul').scrollTop -= 54.1;
    }
    ev.preventDefault();
  }

  @Listen('body:click')
  click(event) {
    if (this.activeMenu) {
      event.preventDefault();
      event.stopPropagation();
      this.activeMenu = false;
      this.elementBlur.emit(event);

      const li = this.el.shadowRoot.querySelector('li.focused');
      if (li) {
        li.classList.remove('focused');
        this.el.shadowRoot.querySelector('ul').scrollTop = 0;
      }
    }
    //event.preventDefault();
  }
  listMyClick(ev: MouseEvent) {
    ev.stopPropagation();
  }
  private listClick(ev: MouseEvent) {
    if (this.items.length < 1 || this.focus) {
      this.focus = false;
      ev.stopPropagation();
      return;
    }
    if (!this.disable && !this.activeMenu) {
      this.activeMenu = true;
      this.el.shadowRoot.querySelector('ul').classList.add('show');
      ev.stopPropagation();
      return;
    }

    if (this.activeMenu) {
      this.activeMenu = false;
      this.el.shadowRoot.querySelector('ul').classList.remove('show');
      ev.stopPropagation();
      return;
    }
  }

  @Listen('focus')
  onFocus(ev) {
    this.focus = true;
    if (this.items.length < 1) {
      ev.stopPropagation();
      return;
    }

    if (!this.disable && !this.activeMenu) {
      this.activeMenu = true;
      this.validatePositionSelector();
      if (this.value) {
        this.index = this.items
          .map((item, index) => {
            if (item.id == this.value) {
              return index;
            }
          })
          .filter(value => value !== undefined)
          .pop();

        if (this.index) {
          this.el.shadowRoot
            .querySelectorAll('li')
            .item(this.index)
            .classList.add('focused');
          this.el.shadowRoot.querySelector('ul').scrollTop = 54.1 * (this.index - 2);
        } else {
          this.el.shadowRoot.querySelector('li').classList.add('focused');
        }
      } else {
        this.el.shadowRoot.querySelector('li').classList.add('focused');
        this.index = 0;
      }
    }
  }

  elementClick(ev: MouseEvent) {
    ev.stopPropagation();
    if (this.value !== (ev.srcElement as any).attributes.getNamedItem('id').value) {
      this.el.shadowRoot.querySelector(
        'div.text-selected',
      ).textContent = (ev.srcElement as any).textContent;
      this.value = (ev.srcElement as any).attributes.getNamedItem('id').value;
      this.valueChange.emit(this.value);
    }

    this.activeMenu = false;
    this.el.blur();
  }

  getSelectedClassList() {
    return {
      [`select-styled`]: true,
      ['actived']: this.activeMenu,
      [`disabled`]: this.disable,
      ['error-text']: this.error,
    };
  }

  getULClassList() {
    return {
      [`select-options`]: true,
      [`show`]: this.activeMenu,
    };
  }

  getArrowClassList() {
    return {
      [`arrow-down`]: !this.activeMenu && !this.disable,
      [`arrow-up`]: this.activeMenu && !this.disable,
      [`arrow-disable`]: this.disable,
    };
  }

  getListClassList(id: any) {
    return {
      [`selected`]: id == this.value,
    };
  }
  /**
   * Verifica si exite el valor en el array de posible valores
   * @param element item del array de data
   */
  checkValueExist(element) {
    return element.id == this.value;
  }

  validatePositionSelector() {
    const heigthSelect = 45;
    const heigthOption = 54;
    let options;
    this.items.length >= 4 ? (options = 4) : (options = this.items.length);
    const windowHeight = window.innerHeight;
    const totalHeigthSelect = options * heigthSelect + heigthOption;
    const bottonPositionAndHeightSelect =
      this.el.shadowRoot.querySelector('#dropdown-select').getBoundingClientRect().bottom +
      totalHeigthSelect;
    const elem: HTMLElement = this.el.shadowRoot.querySelector('.select-options');
    bottonPositionAndHeightSelect >= windowHeight
      ? (elem.style.top = `-${heigthOption * options}px`)
      : (elem.style.top = `${heigthSelect}px`);
  }
}
