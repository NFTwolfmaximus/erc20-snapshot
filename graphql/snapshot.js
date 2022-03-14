export const INSERT_UPDATE_MANY = /* GraphQL */ `
  mutation INSERT_UPDATE_MANY($items: [erc20_snapshot_insert_input!]!) {
    insert_erc20_snapshot(objects: $items, on_conflict: {constraint: erc20_snapshot_pkey, update_columns: gohm_balance}) {
      affected_rows
    }
  }

`;

export const GET_BATCH = /* GraphQL */ `
  query GET_BATCH($limit: Int) {
    erc20_snapshot(
      limit: $limit
    ) {
      address
    }
  }
`;