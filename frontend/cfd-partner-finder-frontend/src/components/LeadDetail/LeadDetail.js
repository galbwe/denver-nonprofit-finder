import {
  Box,
  Button,
  Header,
  Heading,
  Text,
  TextInput,
} from 'grommet';
import { Close, Edit, Notification, Save } from 'grommet-icons';
import React, { useEffect, useRef, useState } from 'react';

import { config } from '../../config';

const UPDATE_STATUS = {
  NO_UPDATE: 'NO_UPDATE',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const LeadDetail = ({ id }) => {
  const [lead, setLead] = useState({});
  const [updatedLead, setUpdatedLead] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(UPDATE_STATUS.NO_UPDATE);

  useEffect(() => {
    const url = `${config.backendHost}/leads/${id}`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLead(data);
        setUpdatedLead(data);
      });
  }, [id]);

  const EditableField = ({ fieldName, fieldAlias }) => {
    return editMode ? (
      <Text>
        <b>{fieldAlias}</b>:{' '}
        <TextInput
          value={updatedLead[fieldName]}
          onChange={(event) => {
            let leadCopy = { ...lead };
            leadCopy[fieldName] = event.target.value;
            setUpdatedLead(leadCopy);
          }}
        />
      </Text>
    ) : (
      <Text>
        <b>{fieldAlias}</b>: {lead[fieldName]}
      </Text>
    );
  };

  const updateLead = () => {
    const url = `${config.backendHost}/leads/${id}`;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLead),
    }).then((res) => {
      if (res.ok) {
        setUpdateStatus(UPDATE_STATUS.SUCCESS);
        setLead(updatedLead);
        setEditMode(false);
      } else {
        setUpdateStatus(UPDATE_STATUS.FAILURE);
      }
    });
  };

  return (
    <Box>
      {updateStatus !== UPDATE_STATUS.NO_UPDATE &&
        (updateStatus === UPDATE_STATUS.SUCCESS ? (
          <Header background="green">
            <Notification />
            <Heading>Update Successful!</Heading>
            <Button
              label="Close"
              icon={<Close />}
              onClick={() => setUpdateStatus(UPDATE_STATUS.NO_UPDATE)}
            />
          </Header>
        ) : (
          <Header background="red">
            <Notification />
            <Heading>Uh oh, something went wrong!</Heading>
          </Header>
        ))}

      <Heading background="">{lead.company_name}</Heading>
      <EditableField fieldName="company_address" fieldAlias="Address" />
      <EditableField fieldName="contact_name" fieldAlias="Contact" />
      <EditableField fieldName="email" fieldAlias="Email" />
      <EditableField fieldName="facebook" fieldAlias="Facebook" />
      <EditableField fieldName="formation_date" fieldAlias="Date Registered" />
      <EditableField fieldName="phone" fieldAlias="Phone" />
      <EditableField fieldName="twitter" fieldAlias="Twitter" />
      <EditableField fieldName="website" fieldAlias="Website" />
      <EditableField fieldName="last_email" fieldAlias="Last Email" />
      <EditableField
        fieldName="last_facebook_search"
        fieldAlias="Last Facebook Search"
      />
      <EditableField
        fieldName="last_linkedin_search"
        fieldAlias="Last LinkedIn Search"
      />
      <EditableField
        fieldName="last_google_search"
        fieldAlias="Last Google Search"
      />
      <EditableField
        fieldName="last_twitter_search"
        fieldAlias="Last Twitter Search"
      />

      {editMode ? (
        <React.Fragment>
          <Button
            secondary
            label="Save"
            icon={<Save />}
            onClick={() => {
              updateLead();
              setEditMode(false);
            }}
          />
          <Button
            secondary
            label="Cancel"
            icon={<Close />}
            onClick={() => {
              setEditMode(false);
            }}
          />
        </React.Fragment>
      ) : (
        <Button
          primary
          label="Edit"
          icon={<Edit />}
          onClick={() => {
            setEditMode(true);
          }}
        />
      )}
    </Box>
  );
};

export default LeadDetail;
