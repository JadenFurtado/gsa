/* Copyright (C) 2017-2021 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useReducer} from 'react';

import _ from 'gmp/locale';

import {ALL_FILTER} from 'gmp/models/filter';

import {NO_VALUE, YES_VALUE} from 'gmp/parser';

import {
  ACTIVE_NO_VALUE,
  ACTIVE_YES_ALWAYS_VALUE,
  ACTIVE_YES_UNTIL_VALUE,
  ANY,
  DEFAULT_OID_VALUE,
  MANUAL,
  RESULT_ANY,
  RESULT_UUID,
  TASK_ANY,
  TASK_SELECTED,
} from 'gmp/models/override';

import {isDefined} from 'gmp/utils/identity';
import {shorten} from 'gmp/utils/string';
import {hasId} from 'gmp/utils/id';

import EntityComponent from 'web/entity/component';

import {useCreateOverride, useModifyOverride} from 'web/graphql/overrides';
import {useLazyGetTasks} from 'web/graphql/tasks';

import PropTypes from 'web/utils/proptypes';

import {
  FALSE_POSITIVE_VALUE,
  LOG_VALUE,
  HIGH_VALUE,
  MEDIUM_VALUE,
  LOW_VALUE,
} from 'web/utils/severity';

import reducer, {updateState} from 'web/utils/stateReducer';

import OverrideDialog from './dialog';

const SEVERITIES_LIST = [
  HIGH_VALUE,
  MEDIUM_VALUE,
  LOW_VALUE,
  LOG_VALUE,
  FALSE_POSITIVE_VALUE,
];

const OverrideComponent = ({
  children,
  onCloned,
  onCloneError,
  onCreated,
  onCreateError,
  onDeleted,
  onDeleteError,
  onDownloaded,
  onDownloadError,
  onInteraction,
  onSaved,
  onSaveError,
}) => {
  const [state, dispatch] = useReducer(reducer, {dialogVisible: false});
  const [createOverride] = useCreateOverride();
  const [modifyOverride] = useModifyOverride();

  const [loadTasks, {tasks}] = useLazyGetTasks({
    filterString: ALL_FILTER.toFilterString(),
  });

  const openOverrideDialog = (override, initial) => {
    if (isDefined(override)) {
      let active = ACTIVE_NO_VALUE;
      if (override.isActive()) {
        if (isDefined(override.endTime)) {
          active = ACTIVE_YES_UNTIL_VALUE;
        } else {
          active = ACTIVE_YES_ALWAYS_VALUE;
        }
      }

      let custom_severity = NO_VALUE;
      let new_severity_from_list;
      let newSeverity;

      if (SEVERITIES_LIST.includes(override.newSeverity)) {
        new_severity_from_list = override.newSeverity;
      } else {
        custom_severity = YES_VALUE;
        newSeverity = override.newSeverity;
      }

      const {result, task, nvt, hosts} = override;

      dispatch(
        updateState({
          dialogVisible: true,
          id: override.id,
          active,
          custom_severity,
          hosts: hosts.length > 0 ? MANUAL : ANY,
          hosts_manual: hosts.join(', '),
          newSeverity,
          new_severity_from_list,
          nvt_name: isDefined(nvt) ? nvt.name : undefined,
          oid: isDefined(nvt) ? nvt.oid : undefined,
          override,
          port: isDefined(override.port) ? MANUAL : ANY,
          port_manual: override.port,
          result_id: hasId(result) ? RESULT_UUID : RESULT_ANY,
          result_name: hasId(result) ? result.name : undefined,
          result_uuid: hasId(result) ? result.id : undefined,
          severity: override.severity,
          task_id: hasId(task) ? TASK_SELECTED : TASK_ANY,
          task_uuid: hasId(task) ? task.id : undefined,
          text: override.text,
          title: _('Edit Override {{- name}}', {
            name: shorten(override.text, 20),
          }),
        }),
      );
    } else {
      dispatch(
        updateState({
          dialogVisible: true,
          active: undefined,
          custom_severity: undefined,
          hosts: undefined,
          hosts_manual: undefined,
          id: undefined,
          newSeverity: undefined,
          nvt_name: undefined,
          oid: undefined,
          override: undefined,
          port: undefined,
          port_manual: undefined,
          result_id: undefined,
          result_name: undefined,
          result_uuid: undefined,
          severity: undefined,
          task_id: undefined,
          task_uuid: undefined,
          text: undefined,
          title: undefined,
          ...initial,
        }),
      );
    }

    handleInteraction();
    loadTasks();
  };

  const closeOverrideDialog = () => {
    dispatch(updateState({dialogVisible: false}));
  };

  const handleCloseOverrideDialog = () => {
    closeOverrideDialog();
    handleInteraction();
  };

  const openCreateOverrideDialog = (initial = {}) => {
    openOverrideDialog(undefined, initial);
  };

  const handleSaveOverride = data => {
    handleInteraction();

    const {
      severity,
      active,
      days,
      hosts_manual,
      id,
      port_manual,
      result_uuid,
      task_uuid,
      text,
    } = data;

    let daysActive;
    if (active === ACTIVE_YES_UNTIL_VALUE) {
      daysActive = days;
    } else {
      daysActive = parseInt(active);
    }

    const modifyData = {
      id,
      severity,
      daysActive,
      hosts: hosts_manual.split(','),
      port: port_manual,
      taskId: task_uuid,
      resultId: result_uuid,
      text,
    };

    if (isDefined(id)) {
      return modifyOverride(modifyData)
        .then(onSaved, onSaveError)
        .then(() => closeOverrideDialog());
    }

    const createData = {
      ...modifyData,
      nvtOid: isDefined(data?.oid) ? data.oid : DEFAULT_OID_VALUE,
      id: undefined,
    };

    return createOverride(createData)
      .then(onCreated, onCreateError)
      .then(() => closeOverrideDialog());
  };

  const handleInteraction = () => {
    if (isDefined(onInteraction)) {
      onInteraction();
    }
  };

  const {
    dialogVisible,
    active,
    custom_severity,
    hosts,
    hosts_manual,
    id,
    newSeverity,
    new_severity_from_list,
    nvt_name,
    oid,
    override,
    port,
    port_manual,
    result_id,
    result_name,
    result_uuid,
    severity,
    task_id,
    task_uuid,
    text,
    title,
    ...initial
  } = state;

  return (
    <EntityComponent
      name="override"
      onCreated={onCreated}
      onCreateError={onCreateError}
      onCloned={onCloned}
      onCloneError={onCloneError}
      onDeleted={onDeleted}
      onDeleteError={onDeleteError}
      onDownloaded={onDownloaded}
      onDownloadError={onDownloadError}
      onInteraction={onInteraction}
      onSaved={onSaved}
      onSaveError={onSaveError}
    >
      {({save, ...other}) => (
        <React.Fragment>
          {children({
            ...other,
            create: openCreateOverrideDialog,
            edit: openOverrideDialog,
          })}
          {dialogVisible && (
            <OverrideDialog
              active={active}
              custom_severity={custom_severity}
              hosts={hosts}
              hosts_manual={hosts_manual}
              id={id}
              newSeverity={newSeverity}
              new_severity_from_list={new_severity_from_list}
              nvt_name={nvt_name}
              oid={oid}
              override={override}
              port={port}
              port_manual={port_manual}
              result_id={result_id}
              result_name={result_name}
              result_uuid={result_uuid}
              severity={severity}
              task_id={task_id}
              task_uuid={task_uuid}
              tasks={tasks}
              text={text}
              title={title}
              onClose={handleCloseOverrideDialog}
              onSave={handleSaveOverride}
              {...initial}
            />
          )}
        </React.Fragment>
      )}
    </EntityComponent>
  );
};

OverrideComponent.propTypes = {
  children: PropTypes.func.isRequired,
  onCloneError: PropTypes.func,
  onCloned: PropTypes.func,
  onCreateError: PropTypes.func,
  onCreated: PropTypes.func,
  onDeleteError: PropTypes.func,
  onDeleted: PropTypes.func,
  onDownloadError: PropTypes.func,
  onDownloaded: PropTypes.func,
  onInteraction: PropTypes.func.isRequired,
  onSaveError: PropTypes.func,
  onSaved: PropTypes.func,
};

export default OverrideComponent;

// vim: set ts=2 sw=2 tw=80:
