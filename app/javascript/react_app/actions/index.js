const BASE_URL = '/api/v1';

export const LOCAL_SETTINGS = 'swedishBirdsSettings';

// actions
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUP = 'FETCH_GROUP';
export const MARK_SEEN = 'MARK_SEEN';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SORT_GROUPS = 'SORT_GROUPS';
export const SORT_BIRDS = 'SORT_BIRDS';
export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE';
export const CLEAR_FLASH_MESSAGE = 'CLEAR_FLASH_MESSAGE';
export const FETCH_LIFELIST = 'FETCH_LIFELIST';
export const SORT_LIFELIST = 'SORT_LIFELIST';

export function fetchGroups(groupBy, populationThreshold = 9) {
  // group_by param must be singular
  const url = `${BASE_URL}/groups?group_by=${groupBy}&population_category_at_least=${populationThreshold}`;

  const promise = fetch(url, { credentials: 'same-origin' })
    .then((r) => r.json());

  return {
    type: FETCH_GROUPS,
    payload: promise,
  };
}

export function fetchGroup(groupedBy, groupName, populationThreshold = 9) {
  const url = `${BASE_URL}/${groupedBy}/${groupName}?population_category_at_least=${populationThreshold}`;
  const promise = fetch(url, { credentials: 'same-origin' }).then((r) => r.json());

  return {
    type: FETCH_GROUP,
    payload: promise,
  };
}

export function markSeen(birdScientificName) {
  const url = `${BASE_URL}/birds/${birdScientificName}/observations`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const promise = fetch(url,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'same-origin',
    }).then((r) => r.json());

  return {
    type: MARK_SEEN,
    payload: promise,
  };
}

const parseLocalStorageSettings = () => {
  const settings = localStorage.getItem(LOCAL_SETTINGS);

  if (settings) {
    try {
      return JSON.parse(settings);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
      return {};
    }
  } else {
    return {};
  }
};

export function loadSettings() {
  const userSettings = parseLocalStorageSettings();

  return {
    type: LOAD_SETTINGS,
    payload: userSettings,
  };
}

export function saveSettings(settings) {
  return {
    type: SAVE_SETTINGS,
    payload: settings,
  };
}

export function sortGroups(clickedHeader, userLangPref) {
  return {
    type: SORT_GROUPS,
    payload: { clickedHeader, userLangPref },
  };
}

export function sortBirds(clickedHeader, userLangPref) {
  return {
    type: SORT_BIRDS,
    payload: { clickedHeader, userLangPref },
  };
}

export function sortLifelist(clickedHeader, userLangPref) {
  return {
    type: SORT_LIFELIST,
    payload: { clickedHeader, userLangPref },
  };
}

export function setFlashMessage(message) {
  return {
    type: SET_FLASH_MESSAGE,
    payload: message,
  };
}

export function clearFlashMessage() {
  return {
    type: CLEAR_FLASH_MESSAGE,
    payload: null,
  };
}

export function fetchLifelist() {
  const url = `${BASE_URL}/observations`;
  const promise = fetch(url, { credentials: 'same-origin' })
    .then((r) => r.json());

  return {
    type: FETCH_LIFELIST,
    payload: promise,
  };
}
