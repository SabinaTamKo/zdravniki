import { v4 as uuidv4 } from 'uuid';
const trimString = str => str.replace(/\s+/g, ' ').trim();

const TYPE_TRANSLATE = {
  SL: 'description-sl',
  EN: 'description',
};

const ACCEPT_TRANSLATE = {
  SL: { n: 'ne sprejema', y: 'sprejema' },
  EN: { n: 'rejects', y: 'accepts' },
};

export function createDoctor(doctor, type, institution) {
  const getTypeText = (lang = 'SL') => {
    const field = TYPE_TRANSLATE[lang.toUpperCase()];
    return type[field];
  };

  const getAcceptText = (lang = 'SL') => ACCEPT_TRANSLATE[lang.toUpperCase()][doctor.accepts];

  const _name = trimString(doctor.doctor);
  const _munUnit = trimString(institution.unit);
  const _provider = trimString(institution.name);
  const [code, city] = institution.city.split(' ');
  const _address = { street: institution.address, code, city };

  const _geoLocation = { lat: parseFloat(institution.lat), lon: parseFloat(institution.lon) };
  const _key = uuidv4();
  const _availability = doctor.availability;
  const _load = doctor.load;

  return Object.freeze({
    get key() {
      return _key;
    },
    get id() {
      return doctor.id;
    },
    get type() {
      return doctor.type;
    },
    get name() {
      return _name;
    },
    get accepts() {
      return doctor.accepts;
    },
    get provider() {
      return _provider;
    },
    get munUnit() {
      return _munUnit;
    },
    get fullAddress() {
      return `${_address.street}, ${_address.code} ${_address.city}`;
    },
    get street() {
      return _address.street;
    },
    get city() {
      return _address.city;
    },
    get postalCode() {
      return _address.code;
    },
    get geoLocation() {
      return _geoLocation;
    },
    get availability() {
      return _availability;
    },
    get load() {
      return _load;
    },
    getTypeText,
    getAcceptText,
  });
}

export default function createDoctors(doctorsDict, institutionsDict, typesDict) {
  const doctors = Object.entries(doctorsDict).reduce((acc, [doctorId, doctorData]) => {
    const doctor = createDoctor(
      doctorData,
      typesDict[doctorData.type],
      institutionsDict[doctorData.id_inst],
    );
    acc[doctorId] = doctor;
    return acc;
  }, {});

  const getById = id => doctors[`${id}`];

  const doctorsValues = Object.values(doctors);

  const filterByType = type => doctorsValues.filter(doctor => doctor.type === type);
  const filterByAccept = accepts =>
    accepts === 'vsi ' ? doctorsValues : doctorsValues.filter(doctor => doctor.accepts === accepts);

  const filter = (type, accepts) => {
    if (accepts !== 'y' && accepts !== 'n') {
      return filterByType(type);
    }

    return doctorsValues.filter(doctor => doctor.type === type && doctor.accepts === accepts);
  };

  const types = Object.keys(typesDict);

  // const byType = types.reduce((acc, type) => {
  //   acc[type] = filterByType(type);
  //   return acc;
  // }, {});

  return Object.freeze({
    all: doctorsValues,
    getById,
    types,
    filterByType,
    filterByAccept,
    typesDict,
    filter,
  });
}
