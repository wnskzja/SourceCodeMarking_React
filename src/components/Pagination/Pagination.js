import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import './Pagination.scss';

const PaginationBook = ({
  activePage,
  itemPerPage,
  totalItems,
  handlePageChange,
}) => (
  <Pagination
    count={Math.ceil(totalItems / itemPerPage)}
    page={activePage}
    color="primary"
    onChange={handlePageChange}
    showFirstButton
    showLastButton
  />
);

PaginationBook.propTypes = {
  handlePageChange: PropTypes.func,
  activePage: PropTypes.number,
  itemPerPage: PropTypes.number,
  totalItems: PropTypes.number,
};
PaginationBook.defaultProps = {
  handlePageChange: () => {},
  activePage: 0,
  itemPerPage: 0,
  totalItems: 0,
};

export default PaginationBook;
