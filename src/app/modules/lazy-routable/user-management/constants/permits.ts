
import { PERMIT_FEATURE_NAMES } from '@app/core/constants';

export const USER_MANAGEMENT_PERMITS = {
  feature_name: PERMIT_FEATURE_NAMES.user_management,
  actions: {
    invite_user: 'invite_user',
    edit_user: 'edit_user',
    archive_user: 'archive_user',
    activity_feed: 'activity_feed'
  }
};
