import { AttestationDefinition } from '@core/models/attestation/AttestationDefinition';
import { AttestationType } from '@core/models/attestation/AttestationType';

export const PID_ATTESTATION: AttestationDefinition = {
  name: 'Personalausweis',
  type: AttestationType.PID,
  dataSet: [
    { identifier: 'family_name', attribute: 'Family name' },
    { identifier: 'given_name', attribute: 'Given name' },
    { identifier: 'birth_date', attribute: 'Birthdate' },
    { identifier: 'family_name_birth', attribute: 'Family name birth' },
    { identifier: 'given_name_birth', attribute: 'Given name birth' },
    { identifier: 'birth_place', attribute: 'Birth place' },
    { identifier: 'resident_address', attribute: 'Resident address' },
    { identifier: 'resident_country', attribute: 'Resident country' },
    { identifier: 'resident_state', attribute: 'Resident state' },
    { identifier: 'resident_city', attribute: 'Resident city' },
    { identifier: 'resident_postal_code', attribute: 'Resident postal code' },
    { identifier: 'resident_street', attribute: 'Resident street' },
    { identifier: 'resident_house_number', attribute: 'Resident house number' },
    { identifier: 'sex', attribute: 'Sex' },
    { identifier: 'nationality', attribute: 'Nationality' },
    { identifier: 'issuance_date', attribute: 'Issuance date' },
    { identifier: 'expiry_date', attribute: 'Expiry date' },
    { identifier: 'issuing_authority', attribute: 'Issuing authority' },
    { identifier: 'document_number', attribute: 'Document number' },
    {
      identifier: 'personal_administrative_number',
      attribute: 'Personal administrative number',
    },
    { identifier: 'issuing_country', attribute: 'Issuing country' },
    { identifier: 'issuing_jurisdiction', attribute: 'Issuing jurisdiction' },
    { identifier: 'portrait', attribute: 'Portrait' },
    { identifier: 'email_address', attribute: 'Email address' },
    { identifier: 'mobile_phone_number', attribute: 'Mobile phone number' },
    { identifier: 'trust_anchor', attribute: 'Trust anchor' },
  ],
};

export const PHD_ATTESTATION: AttestationDefinition = {
  name: 'Promotionsurkunde',
  type: AttestationType.PHD,
  dataSet: [
    { identifier: 'family_name', attribute: 'Nachname' },
    { identifier: 'given_name', attribute: 'Vorname' },
    { identifier: 'birth_date', attribute: 'Geburtstag' },
    { identifier: 'degree_title', attribute: 'Verliehener Titel' },
    { identifier: 'awarding_institution', attribute: 'Verliehene Universität' },
    { identifier: 'disputation_date', attribute: 'Datum der Disputation' },
    { identifier: 'final_grade', attribute: 'Abschlussnote' },
    { identifier: 'expiry_date', attribute: 'Expiry date' },
    { identifier: 'issuing_authority', attribute: 'Issuing authority' },
    { identifier: 'issuing_country', attribute: 'Issuing country' },
  ],
};

export const SUPPORTED_ATTESTATIONS: { [id: string]: AttestationDefinition } = {
  pid: PID_ATTESTATION,
  phd: PHD_ATTESTATION,
};
