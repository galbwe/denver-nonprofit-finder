import { Box, Button, TextInput } from 'grommet';
import React, { useState } from 'react';

const QueryEditor = ({query, onSubmit}) => {
  const [tempQuery, setTempQuery] = useState(query);

  return (
    <Box
      flex
      wrap
      height={{ min: '20%', max: '30%' }}
      elevation="medium"
      direction="row"
      alignContent="start"
      pad="large"
      gap="large"
    >
      <Box
        margin={{
            vertical: "medium"
        }}
      >
        Page:
        <TextInput
          value={tempQuery.page}
          onChange={(event) => {
              let newQuery = { ...tempQuery };
              newQuery.page = event.target.value;
              setTempQuery(newQuery);
          }}
        />
      </Box>
      <Box
        margin={{
            vertical: "medium"
        }}
      >
        Perpage:
        <TextInput
          value={tempQuery.perpage}
          onChange={(event) => {
              let newQuery = { ...tempQuery };
              newQuery.perpage = event.target.value;
              setTempQuery(newQuery);
          }}
        />
      </Box>
      <Button
        primary
        size="large"
        label="Go"
        onClick={() => onSubmit(tempQuery)}
        alignSelf="end"
        margin={{
            vertical: "medium"
        }}
      />
    </Box>
  );
};

export default QueryEditor;
