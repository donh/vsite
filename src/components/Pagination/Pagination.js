// import React, {Component} from 'react';
import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {connectMultireducer} from 'multireducer';
// import {increment} from 'redux/modules/counter';
// import * as paginationActions from 'redux/modules/pagination';
// import * as attestationActions from 'redux/modules/attestation';

// @connect(
//   state => ({
//     total: state.pagination.total
//   }),
//   // dispatch => bindActionCreators(paginationActions, dispatch)
//   dispatch => bindActionCreators(attestationActions, dispatch)
// )

// const pageRange = (selected, numPages, num) => {
// function pageRange = (selected, numPages, num) => {
// class pageRange = (selected, numPages, num) => {
//   const selectedPos = Math.ceil(num / 2)
//   const start = (selected < selectedPos) ? 1
//     : selected - selectedPos + 1
//   const len = (numPages < start + num - 1) ? numPages - start + 1
//     : num
//   return Array
//     .apply(null, Array(len))
//     .map((u, i) => start + i)
// }

class PaginationItem extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    onPageChange: PropTypes.func.isRequired,
    page: React.PropTypes.number,
    display: React.PropTypes.bool
  }
  render() {
    const {className, display, page, onPageChange} = this.props;
    const styles = require('components/Pagination/Pagination.scss');
    // let paginationClass = '_pagination__page';
    // const paginationClass = styles._pagination__page;
    let paginationClass = styles._pagination__page;
    if (className) {
      // paginationClass = `${paginationClass} _pagination__page--${className}`;
      // paginationClass = styles.`_pagination__page--${className}`;
      const str = `_pagination__page--${className}`;
      console.log('str =', str);
      // paginationClass = styles[str];
      paginationClass = `${paginationClass} ${styles[str]}`;
      console.log('paginationClass =', paginationClass);
    }
    return (
      <li className={paginationClass}
       onClick={() => onPageChange(page)}
       dangerouslySetInnerHTML={{__html: display}}>
      </li>
    );
  }
}
// @connectMultireducer(
//   (key, state) => ({count: state.multireducer[key].count}),
//   {increment}
// )
// export default class CounterButton extends Component {
export default class Pagination extends Component {
  static propTypes = {
    // onPageChange:   React.PropTypes.func.isRequired,
    firstPageText: React.PropTypes.string,
    handlePagination: PropTypes.func.isRequired,
    initialPage: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    lastPageText: React.PropTypes.string,
    nextPageText: React.PropTypes.string,
    pagesToDisplay: React.PropTypes.number,
    prevPageText: React.PropTypes.string,
    showFirstLast: React.PropTypes.bool,
    showPrevNext: React.PropTypes.bool,
    total: React.PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,

    // nextPageText: React.PropTypes.string,
    // onPageChange: PropTypes.func.isRequired,
    // pagesToDisplay: React.PropTypes.number,
    // prevPageText: React.PropTypes.string
    // count: PropTypes.number,
    // increment: PropTypes.func.isRequired,
    // className: PropTypes.string
  }
  getDefaultProps() {
    return {
      initialPage: 1,
      pagesToDisplay: 5,
      firstPageText: 'First',
      prevPageText: 'Previous',
      nextPageText: 'Next',
      lastPageText: 'Last',
      showFirstLast: true,
      showPrevNext: true
    };
  }
  getInitialState() {
    return {
      page: this.props.initialPage
    };
  }
  onPageChange(page) {
    this.props.handlePagination(page);
  }
  props = {
    firstPageText: 'First'
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

  // const PaginationItem = React.createClass({
  //   render() {
  //     const {className, display, page, onPageChange} = this.props
  //     let paginationClass = '_pagination__page'
  //     if (className) {
  //       paginationClass = `${paginationClass} _pagination__page--${className}`
  //     }
  //     return (
  //       <li className={paginationClass}
  //        onClick={() => onPageChange(page)}
  //        dangerouslySetInnerHTML={{__html: display}}>
  //       </li>
  //     )
  //   }
  // })

  // props = {
  //   className: ''
  // }
      // <button className={className} onClick={increment}>
      //   You have clicked me {count} time{count === 1 ? '' : 's'}.
      // </button>
      // <ul className='_pagination'>
      //   {firstPage}
      //   {prevPage}
      //   {pages}
      //   {nextPage}
      //   {lastPage}
      // </ul>
  render() {
    // const {currentPage, firstPageText, lastPageText} = this.props;
    // const {nextPageText, onPageChange, pagesToDisplay, prevPageText} = this.props;
    // const {showFirstLast, showPrevNext, total, onPageChange} = this.props;
    // const {showFirstLast, showPrevNext, total} = this.props;
    const {currentPage, onPageChange, total} = this.props;
    const styles = require('components/Pagination/Pagination.scss');

    const pagesToDisplay = 5;
    const firstPageText = 'First';
    const prevPageText = 'Previous';
    const nextPageText = 'Next';
    const lastPageText = 'Last';
    const showFirstLast = true;
    const showPrevNext = true;
    console.log('currentPage =', currentPage);
    console.log('firstPageText =', firstPageText);
    console.log('lastPageText =', lastPageText);
    console.log('nextPageText =', nextPageText);
    console.log('pagesToDisplay =', pagesToDisplay);
    console.log('prevPageText =', prevPageText);
    console.log('showFirstLast =', showFirstLast);
    console.log('showPrevNext =', showPrevNext);
    console.log('total =', total);
    if (total <= 1) {
      return (
        <div></div>
      );
    }
    const paginationItem = (className, page, text) => {
      return (
        <PaginationItem className={className}
         display={text} key={text} page={page}
         onPageChange={onPageChange} />
      );
    };
    console.log('paginationItem =', paginationItem);
    // const pages = pageRange(currentPage, total, pagesToDisplay)
    const pages = this.pageRange(currentPage, total, pagesToDisplay)
      .map((p) => {
        const isCurrentPage = currentPage === p;
        return paginationItem(isCurrentPage ? 'selected' : '', p, p);
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
    // const {count, increment} = this.props; // eslint-disable-line no-shadow
    //     const {currentPage, firstPageText, lastPageText} = this.props
//     const {nextPageText, pagesToDisplay, prevPageText} = this.props
//     const {showFirstLast, showPrevNext, total, onPageChange} = this.props

    // let {className} = this.props;
    // className += ' btn btn-default';

    // <ul className="_pagination">
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

// const pageRange = (selected, numPages, num) => {
//   const selectedPos = Math.ceil(num / 2)
//   const start = (selected < selectedPos) ? 1
//     : selected - selectedPos + 1
//   const len = (numPages < start + num - 1) ? numPages - start + 1
//     : num
//   return Array
//     .apply(null, Array(len))
//     .map((u, i) => start + i)
// }

// const PaginationItem = React.createClass({
//   render() {
//     const {className, display, page, onPageChange} = this.props
//     let paginationClass = '_pagination__page'
//     if (className) {
//       paginationClass = `${paginationClass} _pagination__page--${className}`
//     }
//     return (
//       <li className={paginationClass}
//        onClick={() => onPageChange(page)}
//        dangerouslySetInnerHTML={{__html: display}}>
//       </li>
//     )
//   }
// })

// const Pagination = React.createClass({
//   propTypes: {
//     onPageChange:   React.PropTypes.func.isRequired,
//     total:          React.PropTypes.number.isRequired,
//     initialPage:    React.PropTypes.number,
//     pagesToDisplay: React.PropTypes.number,
//     firstPageText:  React.PropTypes.string,
//     prevPageText:   React.PropTypes.string,
//     nextPageText:   React.PropTypes.string,
//     lastPageText:   React.PropTypes.string,
//     showFirstLast:  React.PropTypes.bool,
//     showPrevNext:   React.PropTypes.bool
//   },
//   getDefaultProps() {
//     return {
//       initialPage: 1,
//       pagesToDisplay: 5,
//       firstPageText: 'First',
//       prevPageText: 'Previous',
//       nextPageText: 'Next',
//       lastPageText: 'Last',
//       showFirstLast: true,
//       showPrevNext: true
//     }
//   },
//   getInitialState() {
//     return {
//       page: this.props.initialPage,
//     }
//   },
//   onPageChange(page) {
//     this.props.handlePagination(page)
//   },
//   render() {
//     const {currentPage, firstPageText, lastPageText} = this.props
//     const {nextPageText, pagesToDisplay, prevPageText} = this.props
//     const {showFirstLast, showPrevNext, total, onPageChange} = this.props
//     if (total <= 1) {
//       return (
//         <div></div>
//       )
//     }
//     const paginationItem = ((className, page, text) => {
//       return (
//         <PaginationItem className={className}
//          display={text} key={text} page={page}
//          onPageChange={onPageChange} />
//       )
//     })
//     const pages = pageRange(currentPage, total, pagesToDisplay)
//       .map((p) => {
//         const isCurrentPage = currentPage === p
//         return paginationItem(isCurrentPage ? 'selected' : '', p, p)
//       }
//     )
//     const firstPage = showFirstLast && currentPage !== 1 ?
//       paginationItem('first', 1, firstPageText) : null
//     const prevPage = showPrevNext && currentPage > 1 ?
//       paginationItem('prev', currentPage - 1, prevPageText) : null
//     const nextPage = showPrevNext && currentPage !== total ?
//       paginationItem('next', currentPage + 1, nextPageText) : null
//     const lastPage = showFirstLast && currentPage !== total ?
//       paginationItem('last', total, lastPageText) : null
//     return (
//       <ul className='_pagination'>
//         {firstPage}
//         {prevPage}
//         {pages}
//         {nextPage}
//         {lastPage}
//       </ul>
//     )
//   }
// })

// module.exports = Pagination
