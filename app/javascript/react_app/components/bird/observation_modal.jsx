import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { markSeen, setFlashMessage } from '../../actions';
import Modal from './modal';

const ObservationModal = ({ close, scientificName }) => {
  const today = new Date().toLocaleDateString('en-CA');

  const dispatch = useDispatch();

  const [observedAt, setObservedAt] = useState(today);
  const [note, setNote] = useState('');
  const [dateUnknown, setDateUnknown] = useState(false);

  const handleMarkSeen = () => {
    const observationDate = (observedAt === '') ? 0 : observedAt;
    dispatch(markSeen({
      birdScientificName: scientificName,
      note,
      observedAt: observationDate,
    }));
    dispatch(setFlashMessage('Bird marked as observed!'));
  };

  const handleDateUnknown = () => {
    const inputDate = (dateUnknown) ? today : '';
    setObservedAt(inputDate);
    setDateUnknown((prevState) => !prevState);
  };

  const handleDatePicked = (event) => {
    setObservedAt(event.target.value);
  };

  const handleNoteChanged = (event) => {
    setNote(event.target.value);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    handleMarkSeen();
    close();
  };

  return (
    <Modal title="Confirm observation" close={close}>
      <form onSubmit={handleConfirm}>
        <div className="modal-body">
          <p>
            Are you sure you want to mark this bird as observed? This cannot be reversed.
          </p>
          <div className="d-flex align-items-end">
            <div className="form-group">
              <label>Date of observation</label>
              <input type="date" className="form-control" value={observedAt} max={today} disabled={dateUnknown} onChange={handleDatePicked} />
            </div>
            <div className="form-check" id="date-unknown">
              <input type="checkbox" className="form-check-input checkbox-input" onClick={handleDateUnknown} style={{ backgroundColor: 'white' }} />
              <label className="form-check-label" style={{ lineHeight: '1.2rem' }}>I don&#39;t know</label>
            </div>
          </div>
          <div className="form-group">
            <label>Note</label>
            <textarea onChange={handleNoteChanged} className="form-control" placeholder="Add a note about your observation..." />
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary hover-pointer">
            Confirm
          </button>
          <button type="button" className="btn btn-dark hover-pointer" onClick={close}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ObservationModal;
