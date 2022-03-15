import { html, css, LitElement } from 'lit';

export class LitelementTest extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--litelement-test-text-color, #000);
      }
      .tag {
        font-weight: bold;
      }
      input{
        margin-bottom: 20px
      }
    `;
  }

  static get properties() {
    return {
      title: String,
      movie: Object,
    };
  }

  constructor() {
    super();
    this.title = 'Buscar película';
    this.movie = {};
  }

  get input() {
    return this.renderRoot?.querySelector('#movie') ?? null;
  }

  async searchMovie() {
    this.movie = await fetch(
      `https://www.omdbapi.com/?t=${this.input.value}&apikey=yourapi`
    ).then(m => m.json());
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <input id="movie" type="text" />
      <button @click=${this.searchMovie}>Buscar</button>
      <div>
        <div>
          ${this.movie.Poster 
            ? html `<img .src=${this.movie.Poster} alt="contains the poster of the movie"/>`
            : html ``
          }
        </div>
        <div>
          <p> <span class="tag">Sinopsis</span> ${this.movie.Plot ? this.movie.Plot : '-'}</p>
        </div>
        <div>
          <p><span class="tag">Dirección</span> ${this.movie.Director ? this.movie.Director : '-'}</p>
        </div>
        <div>
          <p><span class="tag">Guión</span> ${this.movie.Writer ? this.movie.Writer : '-' }</p>
        </div>
        <div>
          <p>
            <span class="tag">Reparto principal </span> ${this.movie.Actors ? this.movie.Actors : '-'}
          </p>
        </div>
      </div>
    `;
  }
}
