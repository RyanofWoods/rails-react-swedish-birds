/* eslint-disable react/prop-types */
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
    <Modal title="Shorthand detail symbols" close={close}>
      <div className="detailsModalContent">
        <p><em>Information is regarding to Sweden</em></p>

        <br />

        {t(['Hs', 'Breeding non-migratory bird'], true)}
        {t(['Hf', 'Breeding migratory bird'], true)}
        {t(['Hs+f', 'Breeding bird, part stays and part migrates'], true)}
        {t(['Hs (f)', 'Breeding bird, most stay and minority migrates'], true)}

        <br />

        {t(['1', 'Est. Observations > 1,000,000'], true)}
        {t(['2', 'Est. Observations > 100,000'], true)}
        {t(['3', 'Est. Observations > 10,000'], true)}
        {t(['4', 'Est. Observations > 100'], true)}
        {t(['5', 'Est. Observations <= 100'], true)}

        <br />

        {t(['V', 'Can see in winter'], true)}
        {t(['(V)', 'Can rarely been seen during winter'], true)}
        {t(['F', 'Migratory guest in large amounts during spring and autumn'], true)}

        <br />

        <p><strong>T</strong></p>
        {t(['*', 'Yearly guest which does not breed here'])}
        {t(['**', 'Seen once every year or few years'])}
        {t(['***', 'Seen once or a few times every 10 years'])}
        {t(['****', 'Seen once or a few times in Sweden ever'])}
      </div>
    </Modal>
  );
};

export default DetailsModal;
