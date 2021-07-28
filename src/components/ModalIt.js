import { Button, Modal } from "react-bootstrap";
import Create from "./Create";
import Update from "./Update";

// Options [Title, Actions, ParentID]
const ModalIt = ({ show, handleClose, options=[], obj={} }) => {
  const forms = {
    createReview: <Create type="Review" obj={ ["restaurant", options[2]] }/>,
    updateReview: <Update type="Review" obj={ ["review", options[2]] }/>
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={ false }>
          {
              options.length &&
                <Modal.Header>
                    <Modal.Title>{ options[0] }</Modal.Title>
                </Modal.Header>
          }
        <Modal.Body>{ forms[options[1]] }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalIt;