import React, {Component, PropTypes} from 'react';

class PaginationItem extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    display: React.PropTypes.string,
    onPageChange: PropTypes.func.isRequired,
    page: React.PropTypes.number
  }
  render() {
    const {className, display, page, onPageChange} = this.props;
    const styles = require('components/Pagination/Pagination.scss');
    let paginationClass = styles._pagination__page;
    if (className && className !== 'undefined') {
      const str = `_pagination__page--${className}`;
      paginationClass = `${paginationClass} ${styles[str]}`;
    }
    return (
      <li className={paginationClass}
       onClick={() => onPageChange(page)}
       dangerouslySetInnerHTML={{__html: display}}>
      </li>
    );
  }
}

export default class Pagination extends Component {
  static propTypes = {
    currentPage: React.PropTypes.number,
    firstPageText: React.PropTypes.string,
    initialPage: React.PropTypes.number,
    lastPageText: React.PropTypes.string,
    nextPageText: React.PropTypes.string,
    onPageChange: PropTypes.func.isRequired,
    pagesToDisplay: React.PropTypes.number,
    prevPageText: React.PropTypes.string,
    showFirstLast: React.PropTypes.bool,
    showPrevNext: React.PropTypes.bool,
    total: React.PropTypes.number.isRequired
  }
  pageRange = (selected, numPages, num) => {
    const selectedPos = Math.ceil(num / 2);
    const start = (selected < selectedPos) ? 1
      : selected - selectedPos + 1;
    const len = (numPages < start + num - 1) ? numPages - start + 1
      : num;
    return Array
      .apply(null, Array(len))
      .map((uu, index) => start + index);
  }
  render() {
    const {currentPage, onPageChange, total} = this.props;
    if (total <= 1) {
      return (
        <div></div>
      );
    }
    const styles = require('components/Pagination/Pagination.scss');
    const pagesToDisplay = 5;
    const firstPageText = 'First';
    const prevPageText = 'Previous';
    const nextPageText = 'Next';
    const lastPageText = 'Last';
    const showFirstLast = true;
    const showPrevNext = true;
    const paginationItem = (className, page, text) => {
      return (
        <PaginationItem className={className}
         display={text.toString()} key={text} page={page}
         onPageChange={onPageChange} />
      );
    };
    const pages = this.pageRange(currentPage, total, pagesToDisplay)
      .map((page) => {
        const isCurrentPage = currentPage === page;
        return paginationItem(isCurrentPage ? 'selected' : '', page, page);
      }
    );
    const firstPage = showFirstLast && currentPage !== 1 ?
      paginationItem('first', 1, firstPageText) : null;
    const prevPage = showPrevNext && currentPage > 1 ?
      paginationItem('prev', currentPage - 1, prevPageText) : null;
    const nextPage = showPrevNext && currentPage !== total ?
      paginationItem('next', currentPage + 1, nextPageText) : null;
    const lastPage = showFirstLast && currentPage !== total ?
      paginationItem('last', total, lastPageText) : null;
    return (
      <ul className={styles._pagination}>
        {firstPage}
        {prevPage}
        {pages}
        {nextPage}
        {lastPage}
      </ul>
    );
  }
}
