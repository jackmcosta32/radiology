Entities:

User (hasMany) Document
Document (hasMany) User
Document (createdBy) User
Document (hasMany) Page (hasMany) Node
Node (
id: uuid;
content: text;
attributes:
createdAt:
updatedAt:
type: 'h1' | 'h2' | 'h3' | ''
)

To-do:

[x] Add support to dash menu
[x] Add support to drag handles  
[] Add support to node button  
[] Add support to links
[] Add support to images
[] Add support to colors
[] Persist document changes locally
[] Add support to multiplayer (yjs)
[] Enhance bubble menu
[] Add support for custom locales (i18n)
[] Create a cornerstone component
[] Create a cornerstone extension
[] Start the backend development
[] Add support to auth
[] Persist documents at the backend
[] Add support to file upload
[] Add support to public and private documents
[] Add support to document tags
[] Add support to AI autocompletion
