
import { GrFormPrevious,GrFormNext } from 'react-icons/gr';

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
                            <GrFormNext
                                className="page__button"
                                onClick={nextMoviePage}
                            />
                        </div>
  )
}

export default PageRotation