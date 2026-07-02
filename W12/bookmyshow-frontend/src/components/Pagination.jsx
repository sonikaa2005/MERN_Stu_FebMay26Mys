// src/components/Pagination.jsx


export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }


  return (
    <div style={styles.container}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>


      <span>
        Page {currentPage} of {totalPages}
      </span>


      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    alignItems: "center",
  },
};
