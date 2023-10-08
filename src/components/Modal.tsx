function Modal() {
  return (
    <>
      <div className="modal">
        <div className="modalContent">
          <div className="modalHeader">
            <h4 className="modalTitle">Title</h4>
          </div>
          <div className="modalBody">
            <p>This is the modal content</p>
          </div>
          <button>Close</button>
        </div>
      </div>
    </>
  );
}

export default Modal;
