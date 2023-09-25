import {
  PageBody,
  PageTitle,
} from '@components/HeadSliceForm/HeadSliceForm.style';
import MarkdownWrapper from '@components/MarkdownWrapper';
import Slice from '@components/Slice';
import { Container, HeaderContainer } from './Header.styles';

const Header = ({
  city,
  bannerSrc,
  bannerPos,
}: {
  city: string;
  bannerSrc: string;
  bannerPos?: string;
}) => {
  return (
    <HeaderContainer>
      <Slice
        padding={4}
        bg={bannerSrc}
        bgPos={bannerPos || 'right center'}
        bgSize="auto"
        bgColor="#CDE3F0"
        className="city-header-slice"
      >
        <Container>
          <div>
            <PageBody>
              <MarkdownWrapper
                value={`Vous êtes copropriétaire sur ${city} ?`}
              />
            </PageBody>
            <PageTitle className="fr-mb-4w">
              Le chauffage urbain, une solution <strong>écologique</strong> et{' '}
              <strong>économique</strong> à {city}
            </PageTitle>
          </div>
        </Container>
      </Slice>
    </HeaderContainer>
  );
};

export default Header;