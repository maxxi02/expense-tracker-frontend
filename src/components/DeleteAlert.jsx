const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="">
      <p className="dark:text-white text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
