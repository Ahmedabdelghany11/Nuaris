import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import closeIcon from "../../../assets/images/close.svg";
import StarsRate from "../../ui/StarsRate";

export default function RateModal({ isOpen, setIsOpen }) {
  return (
    <Modal className="rate_modal_dialog" show={isOpen}>
      <ModalHeader className="header">
        <h2>Ratings</h2>
        <button onClick={() => setIsOpen(false)}>
          <img src={closeIcon} alt="close" />
        </button>
      </ModalHeader>

      <ModalBody>
        <div className="stars_rate_modal">
          <StarsRate rate={4.2} reviewsCount="25" />
        </div>
        <div className="rate_cards">
          {/* TODO: Loop over ratings */}
          {Array(4)
            .fill(0)
            .map(() => {
              return (
                <div className="rate_card">
                  <div className="header">
                    <div>
                      <h3>Imad Magdy</h3>
                      <p>16 days and 9 hours ago</p>
                    </div>
                    <div>
                      <StarsRate rate={4.2} />
                    </div>
                  </div>
                  <p>
                    Absolutely breathtaking! The Ocean Queen was the epitome of
                    luxury. Every meal felt like dining at a 5-star restaurant
                    🍽️, and the cabins were the height of comfort. The crew was
                    attentive and made us feel like royalty 👑. Can't wait to
                    sail again!
                  </p>
                </div>
              );
            })}
        </div>
      </ModalBody>
    </Modal>
  );
}
