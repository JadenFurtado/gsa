/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
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

import {
  makeCompareDate,
  makeCompareIp,
  makeCompareNumber,
  makeCompareSeverity,
  makeCompareString,
} from 'web/utils/sort';

export const apps_sort_functions = {
  name: makeCompareString('name'),
  hosts: makeCompareNumber(entity => entity.hosts.count),
  occurrences: makeCompareNumber(entity => entity.occurrences.total),
  severity: makeCompareSeverity(),
};

export const closed_cves_sort_functions = {
  cve: makeCompareString('id'),
  host: makeCompareIp(entity => entity.host.ip),
  nvt: makeCompareString(entity => entity.source.description),
  severity: makeCompareSeverity(),
};

export const cves_sort_functions = {
  cve: makeCompareString(entity => entity.cves.join(' ')),
  hosts: makeCompareNumber(entity => entity.hosts.count),
  occurrences: makeCompareNumber(entity => entity.occurrences),
  severity: makeCompareSeverity(),
};

export const errors_sort_functions = {
  error: makeCompareString('description'),
  host: makeCompareIp(entity => entity.host.ip),
  hostname: makeCompareString(entity => entity.host.name),
  nvt: makeCompareString(entity => entity.nvt.name),
  port: makeCompareString('port'),
};

export const hosts_sort_functions = {
  ip: makeCompareIp('ip'),
  hostname: makeCompareString('hostname'),
  os: makeCompareString(entity => entity.details.best_os_cpe),
  high: makeCompareNumber(entity => entity.result_counts.hole),
  medium: makeCompareNumber(entity => entity.result_counts.warning),
  low: makeCompareNumber(entity => entity.result_counts.info),
  log: makeCompareNumber(entity => entity.result_counts.log),
  false_positive: makeCompareNumber(
    entity => entity.result_counts.false_positive),
  total: makeCompareNumber(entity => entity.result_counts.total),
  severity: makeCompareSeverity(),
};

export const operatingssystems_sort_functions = {
  name: makeCompareString('name'),
  cpe: makeCompareString('id'),
  hosts: makeCompareNumber(entity => entity.hosts.count),
  severity: makeCompareNumber('severity', 0),
};

export const ports_sort_functions = {
  name: makeCompareString('id'),
  hosts: makeCompareNumber(entity => entity.hosts.count),
  severity: makeCompareSeverity(),
};

export const results_sort_functions = {
  delta: makeCompareString(entity => entity.delta.delta_type),
  created: makeCompareDate('creationTime'),
  host: makeCompareIp(entity => entity.host.name),
  hostname: makeCompareString(entity => entity.host.hostname),
  location: makeCompareString('port'),
  qod: makeCompareNumber(entity => entity.qod.value),
  severity: makeCompareSeverity(),
  solution_type: makeCompareString(entity => entity.nvt.tags.solution_type),
  vulnerability: makeCompareString('vulnerability'),
};

export const tls_certificates_sort_functions = {
  dn: makeCompareString('issuer'),
  serial: makeCompareString('serial'),
  notvalidbefore: makeCompareDate('notbefore'),
  notvalidafter: makeCompareDate('notafter'),
  ip: makeCompareIp('ip'),
  hostname: makeCompareString('hostname'),
  port: makeCompareString('port'),
};

export const vulnerabilities_sort_functions = {
  name: makeCompareString('name'),
  oldest: makeCompareDate(entity => entity.results.oldest),
  newest: makeCompareDate(entity => entity.results.newest),
  qod: makeCompareNumber(entity => entity.qod.value),
  results: makeCompareNumber(entity => entity.results.count),
  hosts: makeCompareNumber(entity => entity.hosts.count),
  severity: makeCompareSeverity(),
};

// vim: set ts=2 sw=2 tw=80:
