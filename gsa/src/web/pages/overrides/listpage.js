/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 * Steffen Waterkamp <steffen.waterkamp@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 - 2018 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import React from 'react';

import _ from 'gmp/locale';

import {OVERRIDES_FILTER_FILTER} from 'gmp/models/filter';

import PropTypes from 'web/utils/proptypes';
import withCapabilities from 'web/utils/withCapabilities';

import EntitiesPage from 'web/entities/page';
import withEntitiesContainer from 'web/entities/withEntitiesContainer2';

import DashboardControls from 'web/components/dashboard/controls';

import ManualIcon from 'web/components/icon/manualicon';
import NewIcon from 'web/components/icon/newicon';

import IconDivider from 'web/components/layout/icondivider';

import {
  loadEntities,
  selector as entitiesSelector,
} from 'web/store/entities/overrides';

import FilterDialog from './filterdialog';
import OverridesTable from './table';
import OverrideComponent from './component';

import OverridesDashboard, {OVERRIDES_DASHBOARD_ID} from './dashboard';

const ToolBarIcons = withCapabilities(({
  capabilities,
  onOverrideCreateClick,
}) => (
  <IconDivider>
    <ManualIcon
      page="vulnerabilitymanagement"
      anchor="overrides-and-false-positives"
      title={_('Help: Overrides')}
    />

    {capabilities.mayCreate('override') &&
      <NewIcon
        title={_('New Override')}
        onClick={onOverrideCreateClick}
      />
    }
  </IconDivider>
));

ToolBarIcons.propTypes = {
  onOverrideCreateClick: PropTypes.func.isRequired,
};

const Page = ({
  onChanged,
  onError,
  onDownloaded,
  ...props
}) => (
  <OverrideComponent
    onCloned={onChanged}
    onCloneError={onError}
    onCreated={onChanged}
    onDeleted={onChanged}
    onDeleteError={onError}
    onDownloaded={onDownloaded}
    onDownloadError={onError}
    onSaved={onChanged}
  >
    {({
      clone,
      create,
      delete: delete_func,
      download,
      edit,
      save,
    }) => (
      <EntitiesPage
        {...props}
        dashboard2={OverridesDashboard}
        dashboardControls={() => (
          <DashboardControls dashboardId={OVERRIDES_DASHBOARD_ID}/>
        )}
        filterEditDialog={FilterDialog}
        filtersFilter={OVERRIDES_FILTER_FILTER}
        sectionIcon="override.svg"
        table={OverridesTable}
        title={_('Overrides')}
        toolBarIcons={ToolBarIcons}
        onChanged={onChanged}
        onDownloaded={onDownloaded}
        onError={onError}
        onOverrideCloneClick={clone}
        onOverrideCreateClick={create}
        onOverrideDeleteClick={delete_func}
        onOverrideDownloadClick={download}
        onOverrideEditClick={edit}
        onOverrideSaveClick={save}
      />
    )}
  </OverrideComponent>
);

Page.propTypes = {
  onChanged: PropTypes.func.isRequired,
  onDownloaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default withEntitiesContainer('override', {
  entitiesSelector,
  loadEntities,
})(Page);

// vim: set ts=2 sw=2 tw=80:
