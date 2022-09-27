import { Button, Icon } from '@dataesr/react-dsfr';
import { useCallback, useMemo, useState } from 'react';
import { Point } from 'src/types/Point';
import { StoredAddress } from 'src/types/StoredAddress';
import {
  ContactFormButtonWrapper,
  ContactFormWrapper,
  EligibilityResult,
  MapCard,
  MessageConfirmBox,
} from './CardSearchDetails.style';
import CardSearchDetailsForm from './CardSearchDetailsForm';

export type TypeAddressDetail = any;

type CardSearchDetailsProps = {
  address: StoredAddress;
  onClick?: (result: StoredAddress) => void;
  onClickClose?: (result: { coordinates?: Point }) => void;
  onContacted?: (result: { coordinates?: Point }) => void;
};

const CardSearchDetails = ({
  address: storedAddress,
  onClick,
  onClickClose,
  onContacted,
}: CardSearchDetailsProps) => {
  const { distance } =
    storedAddress.addressDetails?.networkDetails?.network || {};
  const { isEligible } = storedAddress.addressDetails?.networkDetails || {};

  const [contactFormVisible, setContactFormVisible] = useState(false);

  const readableDistance = useMemo(() => {
    if (distance < 1) {
      return '< 1m';
    }
    if (distance >= 1000) {
      return `${distance / 1000}km`;
    }
    return `${distance}m`;
  }, [distance]);

  const eligibilityWording = useMemo(() => {
    if (isEligible && distance < 100) {
      return `Bonne nouvelle ! Un réseau de chaleur passe à proximité de cette adresse.`;
    }
    if (isEligible && distance < 200) {
      return `Votre immeuble n’est pas à proximité immédiate d’un réseau de chaleur, toutefois le réseau n’est pas très loin.`;
    }
    return `D'après nos données, il n'y a pour le moment pas de réseau de chaleur à proximité de cette adresse.`;
  }, [distance, isEligible]);

  const onClickHandler = useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      evt.stopPropagation();
      const returnVal =
        (typeof onClick === 'function' && onClick(storedAddress)) || undefined;
      return returnVal;
    },
    [onClick, storedAddress]
  );

  const onCloseHandler = useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      evt.stopPropagation();
      if (onClickClose) {
        onClickClose(storedAddress);
      }
    },
    [onClickClose, storedAddress]
  );

  const markAddressAsContacted = useCallback(
    () => onContacted?.(storedAddress),
    [onContacted, storedAddress]
  );

  const displayContactForm = useCallback(() => setContactFormVisible(true), []);

  return (
    <MapCard
      isEligible={isEligible}
      typeCard={'search'}
      className={isEligible ? 'eligible' : 'ineligible'}
      isClickable
    >
      <header onClick={onClickHandler}>{storedAddress.address}</header>
      {onClickClose && (
        <button
          type="button"
          title="Fermer"
          className="closeButton"
          onClick={onCloseHandler}
        />
      )}
      <section>
        <EligibilityResult isEligible={isEligible}>
          {eligibilityWording}
          <div>
            <strong>
              {isEligible &&
                !isNaN(parseFloat(distance)) &&
                `Le réseau passe à ${readableDistance}`}
            </strong>
          </div>
        </EligibilityResult>
        {!contactFormVisible && storedAddress.contacted ? (
          <MessageConfirmBox>
            <Icon
              name="fr-icon-success-fill"
              size="lg"
              color="#78EB7B"
              iconPosition="right"
            />
            Demande envoyée
          </MessageConfirmBox>
        ) : (
          <ContactFormWrapper>
            {!storedAddress.contacted && (
              <header>
                Vous souhaitez en savoir plus et être recontacté par le
                gestionnaire du réseau ?
              </header>
            )}
            {!contactFormVisible && !storedAddress.contacted && (
              <ContactFormButtonWrapper>
                <Button onClick={displayContactForm}>
                  Laissez vos coordonnées
                </Button>
              </ContactFormButtonWrapper>
            )}
            {contactFormVisible && (
              <CardSearchDetailsForm
                fullAddress={storedAddress}
                onSubmit={markAddressAsContacted}
              />
            )}
          </ContactFormWrapper>
        )}
      </section>
    </MapCard>
  );
};

export default CardSearchDetails;
