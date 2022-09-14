import { useEffect, useMemo } from 'react';
import { Demand } from 'src/types/Summary/Demand';
import { TextAreaInput } from './Comment.styles';

import debounce from '@utils/debounce';

const Comment = ({
  demand,
  updateDemand,
}: {
  demand: Demand;
  updateDemand: (demandId: string, demand: Partial<Demand>) => void;
}) => {
  const onChangeHandler = useMemo(
    () =>
      debounce(
        (e) =>
          updateDemand(demand.id, {
            Commentaire: e.target.value,
          }),
        500
      ),
    [demand, updateDemand]
  );

  useEffect(() => () => onChangeHandler.cancel(), [onChangeHandler]);

  return (
    <TextAreaInput
      type="text"
      textarea
      defaultValue={demand.Commentaire}
      onChange={onChangeHandler}
    />
  );
};

export default Comment;