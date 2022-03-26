const BASE_URL = '/api/v1';

export const LOCAL_SETTINGS = 'swedishBirdsSettings';

// actions
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const SORT_GROUPS = 'SORT_GROUPS';
export const FETCH_GROUP = 'FETCH_GROUP';
export const SORT_BIRDS = 'SORT_BIRDS';
export const MARK_SEEN = 'MARK_SEEN';
export const FETCH_LIFELIST = 'FETCH_LIFELIST';
export const SORT_LIFELIST = 'SORT_LIFELIST';
export const FETCH_SEARCH_BIRDS = 'FETCH_SEARCH_BIRDS';
export const CLEAR_SEARCH_BIRDS = 'CLEAR_SEARCH_BIRDS';
export const SET_FLASH_MESSAGE = 'SET_FLASH_MESSAGE';
export const CLEAR_FLASH_MESSAGE = 'CLEAR_FLASH_MESSAGE';
export const SET_PREV_LOCATION = 'SET_PREV_LOCATION';
export const SET_GROUP_LIST_SCROLL_POSITION = 'SET_GROUP_LIST_SCROLL_POSITION';

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

export function markSeen({ birdScientificName, note, observedAt }) {
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
      body: JSON.stringify({ birdScientificName, note, observed_at: observedAt }),
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

export function setPrevLocation(location) {
  return {
    type: SET_PREV_LOCATION,
    payload: location,
  };
}

export function setGroupListScrollPos(x, y) {
  return {
    type: SET_GROUP_LIST_SCROLL_POSITION,
    payload: { x, y },
  };
}

export function fetchSearchBirds(queryString, langPref = 'both', popThreshold = 6) {
  const params = `?query_string=${queryString}&language_preference=${langPref}&population_category_at_least=${popThreshold}`;
  const url = `${BASE_URL}/birds/search${params}`;

  const promise = fetch(url, { credentials: 'same-origin' })
    .then((r) => r.json());

  return {
    type: FETCH_SEARCH_BIRDS,
    payload: promise,
  };
}

export function clearSearchBirds() {
  return {
    type: CLEAR_SEARCH_BIRDS,
    payload: [],
  };
}
