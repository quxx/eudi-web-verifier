import {
  Attestation,
  MsoMdocAttestation,
  SdJwtVcAttestation,
} from '@core/models/attestation/Attestations';
import {
  PHD_ATTESTATION,
  PID_ATTESTATION,
} from '@core/constants/attestation-definitions';
import { AttestationFormat } from '@core/models/attestation/AttestationFormat';
import { AttestationType } from '@core/models/attestation/AttestationType';
import { DataElement } from '@core/models/attestation/AttestationDefinition';
import { ClaimsQuery } from '../models/dcql/DCQL';

export const SUPPORTED_FORMATS: AttestationFormat[] = [
  AttestationFormat.MSO_MDOC,
  AttestationFormat.SD_JWT_VC,
];

/*---- PID ATTESTATION INSTANCES PER FORMAT ----*/
export const PID_MSO_MDOC: MsoMdocAttestation = {
  format: AttestationFormat.MSO_MDOC,
  attestationDef: PID_ATTESTATION,
  doctype: 'eu.europa.ec.eudi.pid.1',
  namespace: 'eu.europa.ec.eudi.pid.1',
  claimQuery: (attribute: DataElement) => {
    return msoMdocClaimQuery('eu.europa.ec.eudi.pid.1', attribute.identifier);
  },
};
export const PID_SD_JWT_VC: SdJwtVcAttestation = {
  format: AttestationFormat.SD_JWT_VC,
  vct: 'urn:eudi:pid:1',
  attestationDef: PID_ATTESTATION,
  claimQuery: (attribute: DataElement) => {
    return { path: sdJwtVcAttributeClaimQuery(attribute, AttestationType.PID) };
  },
};

export const PHD_MSO_MDOC: MsoMdocAttestation = {
  format: AttestationFormat.MSO_MDOC,
  attestationDef: PHD_ATTESTATION,
  doctype: 'de.demo.promotionsurkunde.1',
  namespace: 'de.demo.promotionsurkunde.1',
  claimQuery: (attribute: DataElement) => {
    return msoMdocClaimQuery(
      'de.demo.promotionsurkunde.1',
      attribute.identifier
    );
  },
};

function resolveAttribute(
  attribute: DataElement,
  attestationType: AttestationType
): string {
  let resolvedAttribute = attribute.identifier;
  if (attestationType === AttestationType.PID) {
    let mappedAttribute = PID_SD_JWT_VC_ATTRIBUTE_MAP[attribute.identifier];
    resolvedAttribute = mappedAttribute || attribute.identifier;
  }

  return resolvedAttribute;
}

function sdJwtVcAttributeClaimQuery(
  attribute: DataElement,
  attestationType: AttestationType
): (string | null)[] {
  let resolvedAttribute = resolveAttribute(attribute, attestationType);

  if (
    attestationType === AttestationType.PID &&
    resolvedAttribute === 'nationalities'
  ) {
    return ['nationalities', null];
  } else {
    return resolvedAttribute.split('.');
  }
}

function msoMdocClaimQuery(namespace: string, claimName: string): ClaimsQuery {
  return { path: [namespace, claimName], intent_to_retain: false };
}

export const PID_SD_JWT_VC_ATTRIBUTE_MAP: { [id: string]: string } = {
  birth_date: 'birthdate',
  family_name_birth: 'birth_family_name',
  given_name_birth: 'birth_given_name',
  birth_place: 'place_of_birth.locality',
  resident_address: 'address.formatted',
  resident_country: 'address.country',
  resident_state: 'address.region',
  resident_city: 'address.locality',
  resident_postal_code: 'address.postal_code',
  resident_street: 'address.street_address',
  resident_house_number: 'address.house_number',
  nationality: 'nationalities',
  issuance_date: 'date_of_issuance',
  expiry_date: 'date_of_expiry',
  email_address: 'email',
  mobile_phone_number: 'phone_number',
  portrait: 'picture',
};

export const ATTESTATIONS_BY_FORMAT: { [id: string]: Attestation[] } = {
  mso_mdoc: [PID_MSO_MDOC, PHD_MSO_MDOC],
  'dc+sd-jwt': [PID_SD_JWT_VC],
};

export const getAttestationByFormatAndType = (
  type: AttestationType,
  format: AttestationFormat
): Attestation | null => {
  let filtered = ATTESTATIONS_BY_FORMAT[format as string].filter(
    (attestation: Attestation) => attestation.attestationDef.type === type
  );
  return filtered ? filtered[0] : null;
};
