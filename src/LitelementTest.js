import { html, css, LitElement } from 'lit';
import { TextTransform } from './mixins/transform-text.js';
import './search-input.js';
import './recent-searches.js';

export class LitelementTest extends TextTransform(LitElement) {
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
      movie: Object,
      success: Boolean,
      ended: Boolean,
      titles: Array,
    };
  }

  constructor() {
    super();
    this.movie = {};
    this.success = false;
    this.ended = false
    this.titles = []
  }

  async searchMovie(e) {
    this.movie = await fetch(
      `https://www.omdbapi.com/?t=${e.detail.movieTitle}&apikey=2f054e69`
    ).then(m => {
      this.success = true
      this.ended = true
      if(!e.detail.recent){
        this.titles.push(this.transformToUpperCase(e.detail.movieTitle))
      }
      this.renderRoot.getElementById('searches').requestUpdate()
      return m.json()
    })
  }

  render() {
    return html`
      <div>
        <search-input @sendMovieTitle=${this.searchMovie}></search-input>
        <recent-searches @sendRecentMovie=${this.searchMovie} id="searches" .searches=${this.titles}></recent-searches>
        <div>
          ${this.movie.Poster 
            ? html `<img .src=${this.movie.Poster} alt="contains the poster of the movie"/>`
            : html ``
          }
        </div>
        <div>
          <p> <span class="tag">Sinopsis:</span> ${this.movie.Plot ? this.movie.Plot : '-'}</p>
        </div>
        <div>
          <p><span class="tag">Dirección:</span> ${this.movie.Director ? this.movie.Director : '-'}</p>
        </div>
        <div>
          <p><span class="tag">Guión:</span> ${this.movie.Writer ? this.movie.Writer : '-' }</p>
        </div>
        <div>
          <p>
            <span class="tag">Reparto principal: </span> ${this.movie.Actors ? this.movie.Actors : '-'}
          </p>
        </div>
      </div>
    `;
  }
}
