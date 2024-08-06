export default function Upload() {

  return (
    <>
      <div className="upload-container">
        <div className="upload-header">
          <div className="upload-avatar">
            Profile Avatar
          </div>
          <button className="upload-close-button">
            X button
          </button>
        </div>
        <div className="upload-body">
          Write Something Here!
        </div>
        <div className="upload-utilities">
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
}