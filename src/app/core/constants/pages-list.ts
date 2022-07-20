export const PREV_BUTTON_PAGES_LIST = new Map();
export const REDIRECT_IF_LOGGED_PAGES_LIST = new Map();

const set = (list: Map<string, string>) => (key: string) => list.set(key, null);

const setPrevButtonUrl = set(PREV_BUTTON_PAGES_LIST);
setPrevButtonUrl('/locations/add');
setPrevButtonUrl('/account_settings/edit_subscription');

const setRedirectIfLoggedUrl = set(REDIRECT_IF_LOGGED_PAGES_LIST);
setRedirectIfLoggedUrl('auth');
