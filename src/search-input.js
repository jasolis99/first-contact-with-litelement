import { LitElement, html } from 'lit';

export class SearchInput extends LitElement {

    get input() {
        return this.renderRoot?.querySelector('#movie') ?? null;
    }

    render() {
        return html`
            <h2>Buscar película</h2>
            <input id="movie" type="text" />
            <button @click=${this.sendTitle}>Buscar</button>  
        `;
    }

    firstUpdated(){
        this.renderRoot.getElementById('movie').focus()
    }

    sendTitle(){
        this.dispatchEvent(new CustomEvent('sendMovieTitle',{
            detail: {
                movieTitle: this.input.value,
                recent: false
            }

        }))
    }
}
customElements.define('search-input', SearchInput);