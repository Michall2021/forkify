import View from './view';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    // event delegation
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      if (!button) return;
      console.log(button);

      const goToPage = +button.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numberOfPages);
    // page 1 and there are other pages
    if (currentPage === 1 && numberOfPages > 1) {
      //   return 'page 1, others ';
      return `<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // last page
    if (currentPage === numberOfPages && numberOfPages > 1) {
      //   return 'last page';

      return `
      <button data-goto="${
        currentPage - 1
      } "class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    `;
    }
    // other page
    if (currentPage < numberOfPages) {
      return `
      <button data-goto="${
        currentPage - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>

      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
`;
      //   return 'other page';
    }
    // page 1 and there are no other pages
    return '';
    // return 'only 1 page';
  }
}

export default new PaginationView();
