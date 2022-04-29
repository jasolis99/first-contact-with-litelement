import { LitElement, html,css } from 'lit';

export class NotificationComponent extends LitElement {

    static get styles() {
        return css`
            :host {
                padding: 25px;
                color: var(--litelement-test-text-color, #000);
                display: block;
            }
            .open{
                display: block
            }
            .close{
                display: none
            }
            
            `
    }

    static get properties() {
        return {
            open: Boolean,
            result: Boolean,
        };
    }

    render() {
        return html`
        <div class=${this.open === true ? 'open' :'close'}>
            ${
                this.result === true 
                ? html`<p>Estupendo ${this.result}</p>`
                : html`<p>Fatal ${this.result}</p>`
            }
        </div>
        `;
    }
}
customElements.define('notification-component', NotificationComponent);