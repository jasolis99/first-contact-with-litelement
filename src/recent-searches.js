/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, css } from 'lit';

export class RecentSearches extends LitElement {

    static get styles() {
        return css`
            .recentSearches{
                display: flex;
            }
            p{
                margin-right: 10px;
                background-color: #22c4ffe3;
                border-radius: 99999px;
                padding: 5px;
                cursor: pointer;
                position: relative;
            }
            span{
                position: absolute;
                top:-10px;
                background-color: #9f9f9fe2;
                border-radius: 99999px;
                padding: 1px 5px;
                cursor:pointer;
            }
        `;
      }

    static get properties() {
        return {
          searchs: Array,
        };
    }
    

    constructor(){
        super()
        this.searches = []
    }
    
    render() {
        return html`
            <h3>Búsquedas recientes</h3>
            <div class="recentSearches">
                ${
                    this.searches.length > 0 
                    ?
                    this.searches.map(
                        (item,index) => 
                        html`
                            <p id=${index} @click=${() => this.sendTitle(item)}>
                               ${item}
                               <span @click=${() => this.removeTitle(index)}>x</span>
                            </p>
                        `)
                    : html`<h4> No tienes búsquedas recientes</h4>`
                }
            </div>
        
        
        `;
    }

    sendTitle(title){
        this.dispatchEvent(new CustomEvent('sendRecentMovie',{
            detail:{
                movieTitle: title,
                recent: true
            }
        }))
    }

    removeTitle(index){
        delete this.searches[index]
        this.requestUpdate()
    }
    
}
customElements.define('recent-searches', RecentSearches);