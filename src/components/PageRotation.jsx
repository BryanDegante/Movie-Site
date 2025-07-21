
import { useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

const PageRotation = ({ totalPages, pageNum, pageChange }) => {
    function prevMoviePage() {
		if (pageNum > 1) {
			pageChange(pageNum - 1);
		}
	}

	function nextMoviePage() {
		if (pageNum < totalPages) {
      pageChange(pageNum + 1);
		}
	}
    
  return (
    <div className="page__list">
                            <GrFormPrevious
                                className="page__button"
                                onClick={prevMoviePage}
                            />
                            <p className="total-pages">
                                {pageNum} of {totalPages}
                            </p>
                            <MdNavigateNext
                                className="page__button"
                                onClick={nextMoviePage}
                            />
                        </div>
  )
}

export default PageRotation