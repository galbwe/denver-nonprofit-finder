import { Card, CardBody, CardFooter, CardHeader } from 'grommet';

import React from 'react';

const LeadCard = (props) => {
    return (
        <Card>
            <CardHeader pad="medium">
                {props.companyName}
            </CardHeader>
            <CardBody pad="medium">
                <ul>
                    <li>{props.companyAddress}</li>
                    <li>{props.formationDate}</li>
                </ul>
            </CardBody>
        </Card>
    )
}

export default LeadCard;