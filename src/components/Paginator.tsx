type Props = {
  page: number;
  lastPage: number;
  pageChanged: (page: number) => void;
};

const Paginator: React.FC<Props> = ({ page, lastPage, pageChanged }) => {
  const next = () => {
    if (page < lastPage) {
      pageChanged(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      pageChanged(page - 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={prev}>
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={next}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
