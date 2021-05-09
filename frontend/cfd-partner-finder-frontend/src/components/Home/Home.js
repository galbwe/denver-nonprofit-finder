import {
  Box,
  Button,
  Collapsible,
  Heading,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { FormClose, Notification } from 'grommet-icons';
import React, { useEffect, useState } from 'react';

import LeadCard from '../LeadCard/LeadCard'
import QueryEditor from '../QueryEditor/QueryEditor'
import { config } from '../../config'
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}


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

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    perpage: 4,
  })
  const [leads, setLeads] = useState([]);

  // fetch leads data from api
  useEffect(() => {
    return fetch(`${config.backendHost}/leads?page=${query.page}&perpage=${query.perpage}&drop_null=false`)
    .then(res => res.json())
    .then(data => setLeads(data.leads))
  }, [query])

  return (
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
            <QueryEditor
                query={query}
                onSubmit={setQuery}
            />
            <Box flex direction="column" overflow={{ horizontal: 'hidden' }}>
              {/* app body */}
              { leads && (
                leads.map(lead =>
                  <LeadCard
                    id={lead.id}
                    companyName={lead.company_name}
                    formationDate={lead.formation_date}
                    companyAddress={lead.company_address}
                  />
                ))
              }

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
  );
};

export default Home;
