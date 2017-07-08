const pageRange = (selected, numPages, num) => {
  const selectedPos = Math.ceil(num / 2)
  const start = (selected < selectedPos) ? 1
    : selected - selectedPos + 1
  const len = (numPages < start + num - 1) ? numPages - start + 1
    : num
  return Array
    .apply(null, Array(len))
    .map((u, i) => start + i)
}

const PaginationItem = React.createClass({
  render() {
    const {className, display, page, onPageChange} = this.props
    let paginationClass = '_pagination__page'
    if (className) {
      paginationClass = `${paginationClass} _pagination__page--${className}`
    }
    return (
      <li className={paginationClass}
       onClick={() => onPageChange(page)}
       dangerouslySetInnerHTML={{__html: display}}>
      </li>
    )
  }
})

const Pagination = React.createClass({
  propTypes: {
    onPageChange:   React.PropTypes.func.isRequired,
    total:          React.PropTypes.number.isRequired,
    initialPage:    React.PropTypes.number,
    pagesToDisplay: React.PropTypes.number,
    firstPageText:  React.PropTypes.string,
    prevPageText:   React.PropTypes.string,
    nextPageText:   React.PropTypes.string,
    lastPageText:   React.PropTypes.string,
    showFirstLast:  React.PropTypes.bool,
    showPrevNext:   React.PropTypes.bool
  },
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
    }
  },
  getInitialState() {
    return {
      page: this.props.initialPage,
    }
  },
  onPageChange(page) {
    this.props.handlePagination(page)
  },
  render() {
    const {currentPage, firstPageText, lastPageText} = this.props
    const {nextPageText, pagesToDisplay, prevPageText} = this.props
    const {showFirstLast, showPrevNext, total, onPageChange} = this.props
    if (total <= 1) {
      return (
        <div></div>
      )
    }
    const paginationItem = ((className, page, text) => {
      return (
        <PaginationItem className={className}
         display={text} key={text} page={page}
         onPageChange={onPageChange} />
      )
    })
    const pages = pageRange(currentPage, total, pagesToDisplay)
      .map((p) => {
        const isCurrentPage = currentPage === p
        return paginationItem(isCurrentPage ? 'selected' : '', p, p)
      }
    )
    const firstPage = showFirstLast && currentPage !== 1 ?
      paginationItem('first', 1, firstPageText) : null
    const prevPage = showPrevNext && currentPage > 1 ?
      paginationItem('prev', currentPage - 1, prevPageText) : null
    const nextPage = showPrevNext && currentPage !== total ?
      paginationItem('next', currentPage + 1, nextPageText) : null
    const lastPage = showFirstLast && currentPage !== total ?
      paginationItem('last', total, lastPageText) : null
    return (
      <ul className='_pagination'>
        {firstPage}
        {prevPage}
        {pages}
        {nextPage}
        {lastPage}
      </ul>
    )
  }
})

module.exports = Pagination
