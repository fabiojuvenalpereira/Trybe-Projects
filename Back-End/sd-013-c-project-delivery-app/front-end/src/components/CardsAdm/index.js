import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';

import './CardsAdm.css';

// helpers
import { fetchUsers } from '../../api';

import TESTID from '../../utils/testIdDictionary';

function UserList({ refresh }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, [refresh]);

  return (
    <div className="main-content-card">
      <table className="main-table-content-adm">
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
        { users.length !== 0 && users.map((user, index) => (
          <tr key={ index }>
            <td data-testid={ `${index}` }>
              { index }
            </td>
            <td data-testid={ `${TESTID.admin.itemNumber}${index}` }>
              { user.name }
            </td>
            <td data-testid={ `${TESTID.admin.tableEmail}${index}` }>
              { user.email }
            </td>
            <td data-testid={ `${TESTID.admin.tableRoleEmail}${index}` }>
              { user.role }
            </td>
            <td className="table-button-delete">
              <button
                type="button"
                data-testid={ `${TESTID.admin.tableRemove}${index}` }
              >
                Excluir
              </button>
            </td>
          </tr>
        )) }
      </table>
    </div>
  );
}

UserList.propTypes = {
  refresh: Proptypes.bool.isRequired,
};

export default UserList;
