import { registerAs } from '@nestjs/config';

export default registerAs('documents', () => ({
  legalDocumentsFolder: process.env.LEGAL_DOCUMENTS_FOLDER,
  contractDocumentName: process.env.CONTRACT_DOCUMENT_NAME,
  termsAndConditionsDocumentName:
    process.env.TERMS_AND_CONDITIONS_DOCUMENT_NAME,
}));
