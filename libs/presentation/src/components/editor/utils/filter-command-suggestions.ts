import { isEmpty } from '@/utils';
import { TEditorCommand } from '../editor.types';

export const filterCommandSuggestions = (
  commands: TEditorCommand[],
  query?: string
): TEditorCommand[] => {
  if (isEmpty(commands)) return [];

  if (typeof query !== 'string' || !query.length) return commands;

  return commands.filter(({ label, description, searchTerms }) => {
    const matchesLabel = label.toLowerCase().includes(query);
    const matchesDescription = description?.toLowerCase().includes(query);
    const matchesSearchTerms = searchTerms?.some((term) => {
      return term.toLowerCase().includes(query);
    });

    return matchesLabel || matchesDescription || matchesSearchTerms;
  });
};
