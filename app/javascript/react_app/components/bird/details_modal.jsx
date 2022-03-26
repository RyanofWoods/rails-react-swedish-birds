import React from 'react';
import Modal from './modal';

const DetailsModal = ({ close }) => {
  const t = (strings, isKeyBold) => (
    <div className="detailsModalItem">
      <p className={isKeyBold && 'font-weight-bold'}>{strings[0]}</p>
      <p>{strings[1]}</p>
    </div>
  );

  return (
    <Modal title="Detail shorthand" close={close}>
      <div className="detailsModalContent modal-body">
        <p><em>Information is regarding to Sweden</em></p>

        <div className="contentGroup">
          {t(['Hs', 'Breeding non-migratory bird'], true)}
          {t(['Hf', 'Breeding migratory bird'], true)}
          {t(['Hs+f', 'Breeding bird, part stays and part migrates'], true)}
          {t(['Hs (f)', 'Breeding bird, most stay and minority migrates'], true)}
        </div>

        <div className="contentGroup">
          {t(['1', 'Est. Observations > 1,000,000'], true)}
          {t(['2', 'Est. Observations > 100,000'], true)}
          {t(['3', 'Est. Observations > 10,000'], true)}
          {t(['4', 'Est. Observations > 100'], true)}
          {t(['5', 'Est. Observations <= 100'], true)}
        </div>

        <div className="contentGroup">
          {t(['V', 'Can see in winter'], true)}
          {t(['(V)', 'Can rarely been seen during winter'], true)}
          {t(['F', 'Migratory guest. Large amounts in spring and autumn'], true)}
        </div>

        <div className="contentGroup">
          <p><strong>T</strong></p>

          {t(['*', 'Non-breeding yearly guest'])}
          {t(['**', 'Seen once every year or few years'])}
          {t(['***', 'Seen once/few times every 10 years'])}
          {t(['****', 'Seen once/few times ever'])}
          {t(['[]', 'No wild finds. Escaped from captivity'])}
        </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;