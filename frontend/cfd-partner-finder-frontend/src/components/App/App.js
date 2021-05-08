import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { FormClose, Notification } from 'grommet-icons';
import React, { useState } from 'react';

// TODO: install prettier

const theme = {
  global: {
    colors: {
      brand: '#e14e54',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props) => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: '1' }}
      {...props}
    />
  );
};

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill>
            <AppBar>
              <Heading level="3" margin="none">
                Code For Denver Partner Finder
              </Heading>
              <Button
                icon={<Notification />}
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}
              />
            </AppBar>

            <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
              app body
            </Box>
            {(size !== 'small' || !showSidebar) ? (
              <Collapsible direction="horizontal" open={showSidebar}>
                <Box
                  flex
                  width="medium"
                  background="light-2"
                  elevation="small"
                  align="center"
                  justify="center"
                >
                  sidebar
                </Box>
              </Collapsible>
            ) : (
                <Layer>
                    <Box
                        background='light-2'
                        tag='header'
                        justify='end'
                        align='center'
                        direction='row'
                    >
                        <Button
                            icon={<FormClose />}
                            onClick={() => setShowSidebar(false)}
                        />

                    </Box>
                    <Box
                      fill
                        width="medium"
                        background="light-2"
                        align="center"
                        justify="center"
                    >
                        sidebar
                    </Box>
                </Layer>
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
