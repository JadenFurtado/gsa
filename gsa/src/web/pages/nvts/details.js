/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 Greenbone Networks GmbH
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

import {isDefined} from 'gmp/utils/identity';

import {TAG_NA} from 'gmp/models/nvt';

import PropTypes from '../../utils/proptypes.js';

import DetailsBlock from '../../entity/block.js';

import Severitybar from '../../components/bar/severitybar.js';

import Layout from '../../components/layout/layout.js';

import Link from '../../components/link/link.js';

import InfoTable from '../../components/table/infotable.js';
import TableBody from '../../components/table/body.js';
import TableData from '../../components/table/data.js';
import TableRow from '../../components/table/row.js';

import References from './references.js';
import Solution from './solution.js';
import Pre from './preformatted';

const NvtDetails = ({
  entity,
  links = true,
}) => {
  const {tags = {}, severity, qod, family} = entity;
  return (
    <Layout
      flex="column"
      grow="1"
    >

      {isDefined(tags.summary) &&
        <DetailsBlock
          title={_('Summary')}
        >
          <Pre>
            {tags.summary}
          </Pre>
        </DetailsBlock>
      }

      {isDefined(tags.affected) && tags.affected !== TAG_NA &&
        <DetailsBlock
          title={_('Affected Software/OS')}
        >
          <Pre>
            {tags.affected}
          </Pre>
        </DetailsBlock>
      }

      <DetailsBlock
        title={_('Vulnerability Scoring')}
      >
        <InfoTable>
          <TableBody>
            <TableRow>
              <TableData>
                {_('CVSS Base')}
              </TableData>
              <TableData>
                <Severitybar severity={severity}/>
              </TableData>
            </TableRow>

            {isDefined(tags.cvss_base_vector) &&
              tags.cvss_base_vector !== TAG_NA &&
              <TableRow>
                <TableData>
                  {_('CVSS Base Vector')}
                </TableData>
                <TableData>
                  <Link
                    to="cvsscalculator"
                    query={{cvssVector: tags.cvss_base_vector}}
                  >
                    {tags.cvss_base_vector}
                  </Link>
                </TableData>
              </TableRow>
            }
          </TableBody>
        </InfoTable>
      </DetailsBlock>

      {isDefined(tags.insight) && tags.insight !== TAG_NA &&
        <DetailsBlock
          title={_('Vulnerability Insight')}
        >
          <Pre>
            {tags.insight}
          </Pre>
        </DetailsBlock>
      }

      {(isDefined(qod) ||
      (isDefined(tags.vuldetect) && tags.vuldetect !== TAG_NA)) &&
        <DetailsBlock
          title={_('Vulnerability Detection Method')}
        >
          {isDefined(tags.vuldetect) && tags.vuldetect !== TAG_NA &&
            <Pre>
              {tags.vuldetect}
            </Pre>
          }
          {isDefined(qod) &&
            <Pre>
              <b>{_('Quality of Detection')}: </b>

              {isDefined(qod.type) ?
                qod.type :
                _('N/A')
              }
              {isDefined(qod.value) &&
                ' (' + qod.value + '%)'
              }
            </Pre>
          }
        </DetailsBlock>
      }

      {isDefined(tags.impact) && tags.impact !== TAG_NA &&
        <DetailsBlock
          title={_('Impact')}
        >
          <Pre>
            {tags.impact}
          </Pre>
        </DetailsBlock>
      }

      <Solution
        solution={tags.solution}
        solutionType={tags.solution_type}
      />

      {isDefined(family) &&
        <DetailsBlock
          title={_('Family')}
        >
          <Link
            to="nvts"
            filter={'family="' + family + '"'}
            textOnly={!links}
          >
            {family}
          </Link>
        </DetailsBlock>
      }

      <References
        links={links}
        nvt={entity}
      />

    </Layout>
  );
};

NvtDetails.propTypes = {
  entity: PropTypes.model.isRequired,
  links: PropTypes.bool,
};

export default NvtDetails;

// vim: set ts=2 sw=2 tw=80:
