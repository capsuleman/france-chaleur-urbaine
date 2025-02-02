import { ComboboxList, ComboboxOption } from '@reach/combobox';
import { SuggestionItem } from 'src/types/Suggestions';

type SuggestionListProps = {
  suggestions: SuggestionItem[];
};

const Suggestions: React.FC<SuggestionListProps> = ({ suggestions }) => (
  <ComboboxList>
    {suggestions.map(({ properties }: SuggestionItem, index) => {
      return (
        <ComboboxOption key={properties.id + index} value={properties.label} />
      );
    })}
  </ComboboxList>
);

export default Suggestions;
